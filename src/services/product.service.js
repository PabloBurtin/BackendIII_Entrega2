import { ProductRepository } from "../repositories/product.repository.js";
import { PRODUCT_STATUS } from "../constants/index.js";
import { HttpError } from "../utils/error.util.js";
import { pick } from "../utils/object.util.js";

const statusFromStock = (stock) => stock > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK;

const ALLOWED_FIELDS = [ "name", "description", "price", "stock"];

export class ProductService {
    
    static async getAll() {
        const products = await ProductRepository.getAll();
        return products.filter((p) => p.stock > 0);
    }

    static async getById(id) {
        const product = await ProductRepository.getById(id);
        if (!product) {
            throw new HttpError("Producto no encontrado", 404);
        }
        return product;
    }

    static async create(data) {
        const productData = pick(data, ALLOWED_FIELDS);
        return ProductRepository.create({ ...productData, status: statusFromStock(productData.stock ?? 0) });
    }

    static async update(id, data) {
        const changes = pick(data, ALLOWED_FIELDS);
        if (changes.stock !== undefined) changes.status = statusFromStock(changes.stock);

        const product = await ProductRepository.update(id, changes);
        if (!product) {
            throw new HttpError("Producto no encontrado", 404);
        }
        return product;
    }

    static async delete(id) {
        const product = await ProductRepository.delete(id);
        if (!product) {
            throw new HttpError("Producto no encontrado", 404);
        }
        return product
    }
}