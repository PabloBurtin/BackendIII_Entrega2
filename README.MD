# ShipNow API — Pre-entrega Módulo 2: Mocking y carga de datos

API de logística (Node.js, Express, MongoDB/Mongoose) con arquitectura por capas
**Controller → Service → Repository** y un módulo de mocking que genera datos de
prueba (usuarios, repartidores, pedidos y entregas) con `@faker-js/faker`.

## Requisitos

- Node.js 18 o superior
- MongoDB corriendo en local (o una URI de MongoDB Atlas)

## Instalación

```bash
npm install
cp .env.example .env
```

Completa el `.env` con tus valores (`PORT`, `MONGODB_URI`, `NODE_ENV`).
Si falta alguna variable, la app no arranca y avisa cuál.

## Ejecución

```bash
npm run dev     # desarrollo (nodemon)
npm start       # producción
```

## Estructura del módulo de mocking

```
src/
├── mocks/                 Generadores puros (solo faker, sin base de datos)
│   ├── user.mocks.js
│   ├── order.mocks.js
│   └── delivery.mocks.js
├── services/mock.service.js         Valida qty, arma el dataset y las relaciones
├── repositories/mock.repository.js  Único que inserta en MongoDB
├── controllers/mock.controller.js
├── routes/mock.routes.js            Montado en /api/mocks
└── constants/index.js               Roles, estados, prioridades y MOCKING_PARAMETERS
```

## Endpoints de mocking

Parámetro `qty` (opcional): entero entre 1 y 100. Por defecto, 10.
Si es inválido responde `400`.

### Datos simulados (NO se guardan en la base)

| Método | Ruta | Devuelve |
|---|---|---|
| GET | `/api/mocks/users?qty=2` | Usuarios con rol `USER` o `COURIER` |
| GET | `/api/mocks/couriers?qty=2` | Repartidores (rol `COURIER`) |
| GET | `/api/mocks/orders?qty=3` | Pedidos con estados y prioridades válidos |
| GET | `/api/mocks/deliveries?qty=5` | Entregas asociadas a pedidos y repartidores |

### Carga de datos de prueba (SÍ se guardan en MongoDB)

| Método | Ruta | Qué hace |
|---|---|---|
| POST | `/api/mocks/seed/users?qty=10` | Inserta `qty` usuarios |
| POST | `/api/mocks/seed?qty=10` | Inserta el conjunto completo: clientes, repartidores, pedidos y entregas |

Respuestas de ejemplo:

```json
{ "insertados": 10, "coleccion": "usuarios" }
```

```json
{ "insertados": { "usuarios": 10, "repartidores": 4, "pedidos": 10, "entregas": 7 } }
```

## Datos que se generan y sus relaciones

- **Usuarios:** `name`, `email` (único, dominio `test.com`), `password`, `role`.
  Roles tomados de `USER_ROLES`.
- **Repartidores:** usuarios con rol `COURIER`. Se generan aproximadamente
  `qty / 3` repartidores por cada `qty` pedidos.
- **Pedidos:** `customer` (referencia a un usuario con rol `USER`), `items`,
  `deliveryAddress`, `total` (suma de los items), `status` (`ORDER_STATUS`),
  `priority` (`ORDER_PRIORITY`).
- **Entregas:** `order` (referencia a un pedido), `courier`, `status`
  (`DELIVERY_STATUS`), `assignedAt`, `deliveredAt`.

Reglas de coherencia entre pedido y entrega:

| Estado del pedido | Entrega |
|---|---|
| `CREATED` | `PENDING`, sin repartidor |
| `ASSIGNED` / `PICKED_UP` | `ASSIGNED`, con repartidor (`COURIER`) |
| `IN_TRANSIT` | `IN_TRANSIT`, con repartidor |
| `DELIVERED` | `DELIVERED`, con repartidor y `deliveredAt` posterior a `assignedAt` |
| `CANCELLED` | No tiene entrega |

Cada pedido con entrega guarda en `delivery` el `_id` de esa entrega.

Todos los usuarios mock tienen la contraseña `Mock1234` (definida en
`MOCKING_PARAMETERS`). En la base se guarda **hasheada con bcrypt**.

## Cómo probar

```bash
curl "localhost:8080/api/mocks/users?qty=2"
curl "localhost:8080/api/mocks/orders?qty=3"
curl "localhost:8080/api/mocks/deliveries?qty=5"
curl -i "localhost:8080/api/mocks/users?qty=abc"     # 400
curl -X POST "localhost:8080/api/mocks/seed/users?qty=10"
curl -X POST "localhost:8080/api/mocks/seed?qty=10"
```

Cada ejecución de `seed` agrega datos nuevos (no borra los anteriores).

## Limpiar los datos de prueba (mongosh)

```javascript
db.users.deleteMany({ email: /@test\.com$/ })
db.orders.deleteMany({})
db.deliveries.deleteMany({})
```

> `orders` y `deliveries` se vacían completas: úsalo solo en una base de pruebas.