import { ProductService } from "../services/product.service.js";
import { handleError } from "../utils/error.util.js";


export class ProductController {
    static async getAll(req,res) {
        try {
            const products = await ProductService.getAll()
            return res.status(200).json({ 
                status: "success", 
                message: "Productos obtenidos exitosamente",
                payload: products })
        } catch (error) {
            handleError(res, error)
        }
    }

    static async getById(req, res) {
        try {
            const product = await ProductService.getById(req.params.id)
            return res.status(200).json({
                status: "success",
                message: "Producto encontrado exitosamente",
                payload: product
            })
        } catch (error) {
            handleError(res, error)
        }
    }

    static async create(req, res) {
        try {
            const product = await ProductService.create(req.body)
            return res.status(201).json({
                status: "success",
                message: "Producto creado exitosamente",
                payload: product
            })
        } catch (error) {
            handleError(res, error)
        }
    }

    static async update(req, res) {
        try {
            const product = await ProductService.update(req.params.id, req.body)
            return res.status(200).json({
                status: "success",
                message: "Producto actualizado correctamente",
                payload: product
            })
        } catch (error) {
            handleError(res, error)
        }
    }

    static async delete(req, res) {
        try {
            const product = await ProductService.delete(req.params.id)
        return res.status(200).json({
            status: "success",
            message: "Producto borrado correctamente",
            payload: product
        })
        } catch (error) {
            handleError(res, error)
        }
    }
}