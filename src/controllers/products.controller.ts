import ProductService from "../services/ProductService.js"
import { Request, Response } from "express";


export const getProducts = async (_req: Request, res: Response) => {
    try {
        const products = await ProductService.findAll();
        if (products.length === 0 || !products) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron productos",
            });
        }
        return res.json(products)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductService.findOne(req.params.id);
        if (!product) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontro el producto",
            });
        }
        return res.json(product)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}

export const getProductByName = async (req: Request, res: Response) => {
    try {
        const product = await ProductService.findByName(req.body);
        if (!product) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontro el producto",
            });
        }
        return res.json(product)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        await ProductService.create(req.body)
        return res.status(201).json({
            message: 'Producto creado'
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status
        })
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        await ProductService.update(req.params.id, req.body)
        return res.status(201).json({
            message: 'Producto actualizado'
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status
        })
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        await ProductService.delete(req.params.id)
        return res.status(201).json({
            message: 'Producto Eliminado'
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status
        })
    }
}