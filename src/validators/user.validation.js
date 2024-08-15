import { check } from "express-validator";
import { validateSchema } from "../helpers/expressValidator.js";

export const validateUser = [
    check("name")
        .exists()
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("password")
        .exists()
        .isAlphanumeric().withMessage("La contraseña solo debe contener caracteres alfanumericos"),

    (req, res, next) => {
        validateSchema(req, res, next)
    }
]