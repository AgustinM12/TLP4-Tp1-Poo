import { Router } from "express";
import {
    getUserByNameOrEmail, login, createSeller,
    createClient, deleteUser, getUserById, getUsersByRole
} from "../controllers/user.controller"

import { validateCliente, validateSeller, validateLogin, validateNameOrEmail } from "../validators/user.validation"
import { validateParamsId, validateParamsRole } from "../validators/sale.validation"

import { verifyToken, verifyAdmin, verifyAdminOrSeller } from "../helpers/jwt"

const router = Router();

router.get("/userRole/:role", validateParamsRole, verifyToken, verifyAdmin, getUsersByRole)
router.get("/user/:id", validateParamsId, verifyToken, verifyAdmin, getUserById)
router.get("/userNameEmail", validateNameOrEmail, verifyToken, verifyAdminOrSeller, getUserByNameOrEmail)

router.post("/client", validateCliente, createClient)
router.post("/seller", validateSeller, verifyToken, verifyAdmin, createSeller)
router.post("/login", validateLogin, login)

router.delete("/user/:id", validateParamsId, verifyToken, verifyAdmin, deleteUser)

export default router