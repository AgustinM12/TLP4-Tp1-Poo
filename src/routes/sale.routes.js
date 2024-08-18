import { Router } from "express";
import { createSale, getSaleById, getSales, getSalesByDate, getSalesByUser } from "../controllers/sale.controller.js"

import { validateCreateSale, validateSaleId, validateDate, validateParamsId, validateHeader } from "../validators/sale.validation.js"

import { verifyToken, verifyAdminOrSeller } from "../helpers/jwt.js"

const router = Router();

router.get("/sales", validateHeader, verifyToken, verifyAdminOrSeller, getSales)
router.get("/sale/:id", validateSaleId, verifyToken, verifyAdminOrSeller, getSaleById)
router.get("/saleDate", validateDate, verifyToken, verifyAdminOrSeller, getSalesByDate)
router.get("/saleByUser/:id", validateHeader, verifyToken, verifyAdminOrSeller, getSalesByUser)

router.post("/sale", validateCreateSale, verifyToken, verifyAdminOrSeller, createSale)


export default router