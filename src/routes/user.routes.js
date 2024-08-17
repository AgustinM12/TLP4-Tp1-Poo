import { Router } from "express";
import {getUserByNameOrEmail, login, createSeller, 
    createClient, deleteUser, getUserById, getUsersByRole
} from "../controllers/user.controller.js"

import { validateCliente, validateSeller } from "../validators/user.validation.js"
import { verifyToken } from "../helpers/jwt.js"


const router = Router();

router.get("/user/:id", getUserById)
router.get("/user", getUsersByRole)
router.get("/userNameEmail", getUserByNameOrEmail)

router.post("/user", validateCliente, createClient)
router.post("/seller", validateSeller, verifyToken, createSeller)
router.post("/login", login)

router.delete("/user/:id", deleteUser)

export default router