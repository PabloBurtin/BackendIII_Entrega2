import { generateMockUsers } from "../mocks/user.mocks.js";
import { generateMockOrders } from "../mocks/order.mocks.js";
import { generateMockDelivery } from "../mocks/delivery.mocks.js";
import { MockRepository } from "../repositories/mock.repository.js";
import { USER_ROLES, MOCKING_PARAMETERS } from "../constants/index.js";
import { hashPassword } from "../utils/password.util.js";
import { HttpError } from "../utils/error.util.js";

const parseQty = (qty) => {
    if (qty === undefined) return MOCKING_PARAMETERS.DEFAULT_QTY;

    const parsed = Number(qty);
    if (!Number.isInteger(parsed) || parsed < 1) {
        throw new HttpError("qty debe ser un entero mayor a 0", 400);
    }
    if (parsed > MOCKING_PARAMETERS.MAX_QTY) {
        throw new HttpError(`qty no puede superar ${MOCKING_PARAMETERS.MAX_QTY}`, 400);
    }
    return parsed;
};

const buildDataset = (qty) => {
    const courierQty = Math.max(1, Math.ceil(qty / MOCKING_PARAMETERS.ORDERS_PER_COURIER));

    const customers = generateMockUsers(qty, USER_ROLES.USER);
    const couriers = generateMockUsers(courierQty, USER_ROLES.COURIER);
    const orders = generateMockOrders(qty, customers.map((c) => c._id));

    const courierIds = couriers.map((c) => c._id);
    const deliveries = [];
    for (const order of orders) {
        const delivery = generateMockDelivery(order, courierIds);
        if (!delivery) continue;
        order.delivery = delivery._id;
        deliveries.push(delivery);
    }

    return { customers, couriers, orders, deliveries };
};

const withHashedPassword = async (users) => {
    const password = await hashPassword(MOCKING_PARAMETERS.DEFAULT_PASSWORD);
    return users.map((user) => ({ ...user, password }));
};

export class MockService {
    static getUsers(qty) {
        return generateMockUsers(parseQty(qty));
    }

    static getCouriers(qty) {
        return generateMockUsers(parseQty(qty), USER_ROLES.COURIER);
    }

    static getOrders(qty) {
        return buildDataset(parseQty(qty)).orders;
    }

    static getDeliveries(qty) {
        return buildDataset(parseQty(qty)).deliveries;
    }

    static async seedUsers(qty) {
        const users = await withHashedPassword(generateMockUsers(parseQty(qty)));
        const insertados = await MockRepository.insertUsers(users);
        return { insertados, coleccion: "usuarios" };
    }

    static async seed(qty) {
        const { customers, couriers, orders, deliveries } = buildDataset(parseQty(qty));

        const users = await withHashedPassword([ ...customers, ...couriers]);
        const usuarios = await MockRepository.insertUsers(users);
        const pedidos = await MockRepository.insertOrders(orders);
        const entregas = await MockRepository.insertDeliveries(deliveries);

        return {
            insertados: {
                usuarios: usuarios - couriers.length,
                repartidores: couriers.length,
                pedidos,
                entregas
            }
        };
    }
}