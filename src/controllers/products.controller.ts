import ProductService from "../services/ProductService.js"
import { Request, Response } from "express";
import { CustomError } from "../models/CustomErrors.js";
import { productDB } from "../types/dataFromDb"

class ProductControllers {

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

    public async getProducts(_req: Request, res: Response): Promise<Response> {
        try {
            const products: productDB[] = await ProductService.findAll();

            if (products.length === 0 || !products) {
                throw new CustomError("No se encontraron productos", 404);
            } else {
                return res.json(products)
            }

        } catch (error) {
            return this.handleError(error, res);
        }
    }

    public async getProduct(req: Request, res: Response): Promise<Response> {
        try {
            const product: productDB = await ProductService.findOne(req.params.id);

            if (!product) {
                throw new CustomError("No se encontro el producto",
                    404);
            } else {
                return res.json(product)
            }

        } catch (error) {
            return this.handleError(error, res);
        }
    }

    public async getProductByName(req: Request, res: Response): Promise<Response> {
        try {
            const product: productDB = await ProductService.findByName(req.body);
            if (!product) {
                throw new CustomError("No se encontro el producto", 404);
            } else {
                return res.json(product)
            }

        } catch (error) {
            return this.handleError(error, res);
        }
    }

    public async createProduct(req: Request, res: Response): Promise<Response> {
        try {
            await ProductService.create(req.body)

            return res.status(201).json({
                message: 'Producto creado'
            })

        } catch (error) {
            return this.handleError(error, res);
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<Response> {
        try {
            await ProductService.update(req.params.id, req.body)

            return res.status(201).json({
                message: 'Producto actualizado'
            })

        } catch (error) {
            return this.handleError(error, res);
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<Response> {
        try {
            await ProductService.delete(req.params.id)

            return res.status(201).json({
                message: 'Producto Eliminado'
            })
        } catch (error) {
            return this.handleError(error, res);
        }
    }
}

export const { createProduct, deleteProduct, getProduct, getProductByName, getProducts, updateProduct } = new ProductControllers()