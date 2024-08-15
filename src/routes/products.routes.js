import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct, getProduct } from "../controllers/products.controller.js"
import { validateCreateProduct, validateUpdateProduct } from "../validators/product.validation.js"

const router = Router();

router.get("/products", getProducts)
router.get("/product/:id", getProduct)

router.post("/product", validateCreateProduct, createProduct)

router.put("/product/:id", validateUpdateProduct, updateProduct)

router.delete("/product/:id", deleteProduct)

export default router