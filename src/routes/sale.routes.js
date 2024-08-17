import { Router } from "express";
import { createSale, getSaleById, getSales, getSalesByDate, getSalesByUser } from "../controllers/sale.controller.js"

import { validateCreateSale, validateSaleId, validateDate } from "../validators/sale.validation.js"

import { verifyToken, verifyAdminOrSeller } from "../helpers/jwt.js"

const router = Router();

router.get("/sales/:id", validateSaleId, verifyToken, verifyAdminOrSeller, getSales)
router.get("/sale/:id", validateSaleId, verifyToken, verifyAdminOrSeller, getSales)
router.get("/saleDate", validateDate, verifyToken, verifyAdminOrSeller, getSalesByDate)
router.get("/saleByUser:id", validateSaleId, verifyToken, verifyAdminOrSeller, getSalesByDate)

router.post("/sale", validateCreateSale, verifyToken, verifyAdminOrSeller)


export default router