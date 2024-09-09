import ProductService from "../services/ProductService.js"
import { Request, Response } from "express";
import { CustomError } from "../models/CustomErrors.js";
import { productDB } from "../types/dataFromDb"

export const getProducts = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const products: productDB[] = await ProductService.findAll();

        if (products.length === 0 || !products) {
            throw new CustomError("No se encontraron productos", 404);
        } else {
            return res.json(products)
        }

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            })
        } else {
            return res.status(500).json({
                message: "Error interno del servidor",
                status: "Internal Server Error",
            });
        }
    }
}

export const getProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const product: productDB = await ProductService.findOne(req.params.id);

        if (!product) {
            throw new CustomError("No se encontro el producto",
                404);
        } else {
            return res.json(product)
        }

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            })
        } else {
            return res.status(500).json({
                message: "Error interno del servidor",
                status: "Internal Server Error",
            });
        }
    }
}

export const getProductByName = async (req: Request, res: Response): Promise<Response> => {
    try {
        const product: productDB = await ProductService.findByName(req.body);
        if (!product) {
            throw new CustomError("No se encontro el producto", 404);
        } else {
            return res.json(product)
        }

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            })
        } else {
            return res.status(500).json({
                message: "Error interno del servidor",
                status: "Internal Server Error",
            });
        }
    }
}

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        await ProductService.create(req.body)

        return res.status(201).json({
            message: 'Producto creado'
        })

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            })
        } else {
            return res.status(500).json({
                message: "Error interno del servidor",
                status: "Internal Server Error",
            });
        }
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        await ProductService.update(req.params.id, req.body)

        return res.status(201).json({
            message: 'Producto actualizado'
        })

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            })
        } else {
            return res.status(500).json({
                message: "Error interno del servidor",
                status: "Internal Server Error",
            });
        }
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        await ProductService.delete(req.params.id)
        
        return res.status(201).json({
            message: 'Producto Eliminado'
        })
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            })
        } else {
            return res.status(500).json({
                message: "Error interno del servidor",
                status: "Internal Server Error",
            });
        }
    }
}