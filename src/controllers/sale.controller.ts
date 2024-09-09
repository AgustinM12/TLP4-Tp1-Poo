import SaleService from "../services/SaleService.js";
import { CustomError } from "../models/CustomErrors.js";
import { Request, Response } from "express";
import { saleDB } from "../types/dataFromDb.js";

export const getSales = async (_req: Request, res: Response): Promise<Response> => {
    try {

        const sales: saleDB[] = await SaleService.findAll()

        if (!sales) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron ventas",
            });
        }
        return res.json(sales)

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
}

export const getSaleById = async (req: Request, res: Response): Promise<Response> => {
    try {

        const sale: saleDB = await SaleService.findOne(req.params.id)
        if (!sale) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron ventas para ese vendedor/admin",
            });
        }
        return res.json(sale)

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
}

export const getSalesByDate = async (req: Request, res: Response): Promise<Response> => {
    try {

        const sales: saleDB[] = await SaleService.findByDate(req.body)

        if (!sales || sales.length === 0) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron ventas en esa fecha",
            });
        }
        return res.json(sales)

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
}

export const getSalesByUser = async (req: Request, res: Response): Promise<Response> => {
    try {

        const sales: saleDB[] = await SaleService.findByUser(req.params.id)
        if (!sales || sales.length === 0) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron ventas de ese vendedor",
            });
        }
        return res.json(sales)

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
}

export const createSale = async (req: Request, res: Response): Promise<Response> => {
    try {

        await SaleService.create(req.body)

        return res.status(201).json({
            message: 'Venta registrado'
        })

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
}
