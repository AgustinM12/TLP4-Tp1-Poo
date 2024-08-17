import { Router } from "express";
import {
    createUser, deleteUser, getUser, getUsersByRole
} from "../controllers/user.controller.js"

import { validateCliente, validateSeller } from "../validators/user.validation.js"

const router = Router();

router.get("/user/:id", getUser)
router.get("/user", getUsersByRole)

router.post("/user", validateSeller, createUser)
router.post("/seller", validateSeller)

router.delete("/user/:id", deleteUser)

export default router