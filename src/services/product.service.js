import { ProductRepository } from "../repositories/product.repository.js";
import { PRODUCT_STATUS } from "../constants/index.js";
import { HttpError } from "../utils/error.util.js";

const statusFromStock = (stock) => stock > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK;

export class ProductService {
    
    static async getAll() {
        const products = await ProductRepository.getAll();
        return products.filter((p) => p.stock >0);
    }

    static async getById(id) {
        const product = await ProductRepository.getById(id)
        if (!product) {
            throw new HttpError("Producto no encontrado", 404);
        }
        return product;
    }

    static async create(data) {
        return ProductRepository.create({ ...data, status: statusFromStock(data.stock ?? 0) });
    }

    static async update(id, data) {
        const changes = { ...data };
        if (data.stock !== undefined) changes.status = statusFromStock(data.stock);

        const product = await ProductRepository.update(id, changes);
        if(!product) {
            throw new HttpError("Producto no encontrado", 404)
        }
        return product
    }

    static async delete(id) {
        const product = await ProductRepository.delete(id);
        if(!product) {
            throw new HttpError("Producto no encontrado", 404);
        }
        return product
    }
}