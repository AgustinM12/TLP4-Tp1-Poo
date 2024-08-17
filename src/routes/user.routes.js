import { Router } from "express";
import {
    createClient, createSeller, deleteUser, getUser, getUsersByRole
} from "../controllers/user.controller.js"

import { validateCliente, validateSeller } from "../validators/user.validation.js"

const router = Router();

router.get("/user/:id", getUser)
router.get("/user", getUsersByRole)

router.post("/client", validateCliente, createClient)
router.post("/seller", validateSeller, createSeller)

router.delete("/user/:id", deleteUser)

export default router