import { Router } from "express";
import {
    getUserByNameOrEmail, login, createSeller,
    createClient, deleteUser, getUserById, getUsersByRole
} from "../controllers/user.controller.js"

import { validateCliente, validateSeller, validateLogin } from "../validators/user.validation.js"
import { verifyToken, verifyAdmin } from "../helpers/jwt.js"

const router = Router();

router.get("/user/:id", verifyToken, verifyAdmin, getUserById)
router.get("/user", verifyToken, verifyAdmin, getUsersByRole)
router.get("/userNameEmail", getUserByNameOrEmail)

router.post("/client", validateCliente, createClient)
router.post("/seller", validateSeller, verifyToken, verifyAdmin, createSeller)
router.post("/login", validateLogin, login)

router.delete("/user/:id", verifyToken, verifyAdmin, deleteUser)

export default router