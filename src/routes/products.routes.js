import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct, getProduct } from "../controllers/products.controller.js"
import { validateCreateProduct, validateUpdateProduct } from "../validators/product.validation.js"
import { validateParamsId } from "../validators/sale.validation.js"
import { verifyToken, verifyAdminOrSeller } from "../helpers/jwt.js"

const router = Router();

router.get("/products/:id", validateParamsId, verifyToken, verifyAdminOrSeller, getProducts)
router.get("/product/:id", validateParamsId, verifyToken, verifyAdminOrSeller, getProduct)

router.post("/product", validateCreateProduct, verifyToken, verifyAdminOrSeller, createProduct)

router.put("/product/:id", validateUpdateProduct, verifyToken, verifyAdminOrSeller, updateProduct)

router.delete("/product/:id", validateParamsId, verifyToken, verifyAdminOrSeller, deleteProduct)

export default router