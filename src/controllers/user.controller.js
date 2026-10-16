import { UserService } from "../services/user.service.js";
import { handleError } from "../utils/error.util.js";
import { RESPONSE_STATUS } from "../constants/index.js";

export class UserController {
    static async getAll(req, res) {
        try {
            const users = await UserService.getAll()
            return res.status(200).json({
                status: RESPONSE_STATUS.SUCCESS,
                message: "Usuarios obtenidos correctamente",
                payload: users
            });
        } catch (error) {
            handleError(res, error);
        }
    }

    static async getById(req, res) {
        try {
            const user = await UserService.getById(req.params.id);
            return res.status(200).json({
                status: RESPONSE_STATUS.SUCCESS,
                message: "Usuario encontrado correctamente",
                payload: user
            });
        } catch (error) {
            handleError(res, error);
        }
    }

    static async create(req, res) {
       try {
            const user = await UserService.create(req.body);
                return res.status(201).json({
                    status: RESPONSE_STATUS.SUCCESS,
                    message: "Usuario creado correctamente",
                    payload: user
                })
       } catch (error) {
            handleError(res, error);
       }
    }

    static async update(req, res) {
        try {
            const user = await UserService.update(req.params.id, req.body);
            return res.status(200).json({
                status: RESPONSE_STATUS.SUCCESS,
                message: "Usuario actualizado correctamente",
                payload: user
            });
        } catch (error) {
            handleError(res, error);
        }
    }

    static async delete(req,res) {
        try {
            const user = await UserService.delete(req.params.id)
            return res.status(200).json({
                status: RESPONSE_STATUS.SUCCESS,
                message: "Usuario eliminado correctamente",
                payload: user
            });
        } catch (error) {
            handleError(res, error);
        }
    }
}