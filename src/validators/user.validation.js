import { check } from "express-validator";
import { validateSchema } from "../helpers/expressValidator.js";

const allowedFields = ['name', 'desc', 'price', 'category', 'stock']

//! CREACION DE CLIENTE

export const validateCliente = [
    check("name")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("password")
        .exists().withMessage("Debe escoger una contraseña")
        .isAlphanumeric().withMessage("La contraseña solo debe contener caracteres alfanumericos"),

    validateSchema(allowedFields)
]

//! CREACION DE VENDEDOR

export const validateSeller = [
    check("name")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    validateSchema(allowedFields)
]