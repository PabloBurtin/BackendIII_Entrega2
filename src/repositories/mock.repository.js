import { UserModel } from "../models/user.model.js";
import { OrderModel } from "../models/order.model.js";
import { DeliveryModel } from "../models/delivery.model.js";

export class MockRepository {
    static async insertUsers(users) {
        const inserted = await UserModel.insertMany(users);
        return inserted.length;
    }

    static async insertOrders(orders) {
        const inserted = await OrderModel.insertMany(orders);
        return inserted.length;
    }

    static async insertDeliveries(deliveries) {
        const inserted = await DeliveryModel.insertMany(deliveries);
        return inserted.length;
    }
}