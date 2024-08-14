import { Router } from "express";
import {createProduct,getProducts} from "../controllers/products.controller.js"

export const productRouter = Router();

productRouter.get("/products", getProducts)
productRouter.post("/product", createProduct)