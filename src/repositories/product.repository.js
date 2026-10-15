import { ProductModel } from "../models/product.model.js";

const PROJECTION = "-__v"

export class ProductRepository {
    static async getAll() {
        return ProductModel.find().select(PROJECTION).lean();
    }

    static async getById(id) {
        return ProductModel.findById(id).select(PROJECTION).lean();
    }

    static async create(data) {
        const product = await ProductModel.create(data);
        return product.toObject();
    }

    static async update(id, data) {
        return ProductModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .select(PROJECTION)
            .lean();
    }

    static async delete(id) {
        return ProductModel.findByIdAndDelete(id).select(PROJECTION).lean();
    }
}