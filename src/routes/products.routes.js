import { Router } from "express";
import { createProduct, getProducts } from "../controllers/products.controller.js"
import { validateCreateProduct } from "../validators/product.validation.js"

const router = Router();

router.get("/products", getProducts)
router.post("/product", validateCreateProduct, createProduct)

export default router