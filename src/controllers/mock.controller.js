import { MockService } from "../services/mock.service.js";
import { handleError } from "../utils/error.util.js";

export class MockController {
    static getUsers(req, res) {
        try {
            res.status(200).json(MockService.getUsers(req.query.qty));
        } catch (error) {
            handleError(res, error);
        }
    }

    static getCouriers(req, res) {
        try {
            res.status(200).json(MockService.getCouriers(req.query.qty));
        } catch (error) {
            handleError(res, error);
        }
    }

    static getOrders(req, res) {
        try {
            res.status(200).json(MockService.getOrders(req.query.qty));
        } catch (error) {
            handleError(res, error);
        }
    }

    static getDeliveries(req, res) {
        try {
            res.status(200).json(MockService.getDeliveries(req.query.qty));
        } catch (error) {
            handleError(res, error);
        }
    }

    static async seedUsers(req, res) {
        try {
            res.status(201).json(await MockService.seedUsers(req.query.qty));
        } catch (error) {
            handleError(res, error);
        }
    }

    static async seed(req, res) {
        try {
            res.status(201).json(await MockService.seed(req.query.qty));
        } catch (error) {
            handleError(res, error);
        }
    }
}