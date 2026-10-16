export const PRODUCT_STATUS = Object.freeze({
    AVAILABLE: "AVAILABLE",
    OUT_OF_STOCK: "OUT_OF_STOCK"
});

export const USER_ROLES = Object.freeze({
    ADMIN: "ADMIN",
    USER: "USER",
    COURIER: "COURIER"
});

export const ORDER_STATUS = Object.freeze({
    CREATED: "CREATED",
    ASSIGNED: 'ASSIGNED',
    PICKED_UP: "PICKED_UP",
    IN_TRANSIT: "IN_TRANSIT",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED"
});

export const ORDER_PRIORITY = Object.freeze({
    LOW: "LOW",
    NORMAL: "NORMAL",
    HIGH: "HIGH"
});

export const DELIVERY_STATUS = Object.freeze({
    PENDING: "PENDING",
    ASSIGNED: "ASSIGNED",
    IN_TRANSIT: "IN_TRANSIT",
    DELIVERED: "DELIVERED"
});

export const DELIVERY_STATUS_BY_ORDER_STATUS = Object.freeze({
    [ORDER_STATUS.CREATED]: DELIVERY_STATUS.PENDING,
    [ORDER_STATUS.ASSIGNED]: DELIVERY_STATUS.ASSIGNED,
    [ORDER_STATUS.PICKED_UP]: DELIVERY_STATUS.ASSIGNED,
    [ORDER_STATUS.IN_TRANSIT]: DELIVERY_STATUS.IN_TRANSIT,
    [ORDER_STATUS.DELIVERED]: DELIVERY_STATUS.DELIVERED
});

export const MOCKING_PARAMETERS = Object.freeze({
    DEFAULT_QTY: 10,
    MAX_QTY: 100,
    ORDERS_PER_COURIER: 3,
    DEFAULT_PASSWORD: "Mock1234",
    EMAIL_DOMAIN: "test.com"
});

export const RESPONSE_STATUS = Object.freeze({
    SUCCESS: "success",
    ERROR: "error"
});

export const ENVIRONMENTS = Object.freeze({
    DEVELOPMENT: "development",
    PRODUCTION: "production",
    TEST: "test"
});