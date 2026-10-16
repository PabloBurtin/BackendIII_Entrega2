import { ProductService } from "../services/product.service.js";
import { handleError } from "../utils/error.util.js";
import { RESPONSE_STATUS } from "../constants/index.js";


export class ProductController {
    static async getAll(req,res) {
        try {
            const products = await ProductService.getAll()
            return res.status(200).json({ 
                status: RESPONSE_STATUS.SUCCESS, 
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
                status: RESPONSE_STATUS.SUCCESS,
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
                status: RESPONSE_STATUS.SUCCESS,
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
                status: RESPONSE_STATUS.SUCCESS,
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
            status: RESPONSE_STATUS.SUCCESS,
            message: "Producto borrado correctamente",
            payload: product
        })
        } catch (error) {
            handleError(res, error)
        }
    }
}