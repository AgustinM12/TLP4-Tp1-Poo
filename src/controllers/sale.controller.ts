import SaleService from "../services/SaleService.js";
import { CustomError } from "../models/CustomErrors.js";
import { Request, Response } from "express";
import { saleDB } from "../types/dataFromDb.js";

class SalesControllers {

    private handleError(error: any, res: Response): Response {
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

    public async getSales(_req: Request, res: Response): Promise<Response> {
        try {
            const sales: saleDB[] = await SaleService.findAll();

            if (!sales) {
                throw new CustomError("No se encontraron ventas", 404);
            }

            return res.json(sales);
        } catch (error) {
            return this.handleError(error, res);
        }
    }

    public async getSaleById(req: Request, res: Response): Promise<Response> {
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
            return this.handleError(error, res);
        }
    }


    public async getSalesByDate(req: Request, res: Response): Promise<Response> {
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
            return this.handleError(error, res);
        }
    }

    public async getSalesByUser(req: Request, res: Response): Promise<Response> {
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
            return this.handleError(error, res);
        }
    }

    public async createSale(req: Request, res: Response): Promise<Response> {
        try {

            await SaleService.create(req.body)

            return res.status(201).json({
                message: 'Venta registrado'
            })

        } catch (error) {
            return this.handleError(error, res);
        }
    }
}

export const { getSales, getSaleById, getSalesByDate, getSalesByUser, createSale } = new SalesControllers();
