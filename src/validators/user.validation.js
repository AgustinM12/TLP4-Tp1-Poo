import { check } from "express-validator";
import { validateSchema } from "../helpers/expressValidator.js";

const allowedFields = ['name', 'role', 'password', 'email']

//! CREACION DE CLIENTE

export const validateCliente = [
    check("name")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("name")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("email")
        .exists().withMessage("Debe escoger un email")
        .isEmail(),

    check("password")
        .exists().withMessage("Debe escoger una contraseña")
        .isStrongPassword(),

    validateSchema(allowedFields)
]

//! CREACION DE VENDEDOR

export const validateSeller = [
    check("name")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("role")
        .optional()
        .exists().withMessage("Debe escoger un rol")
        .custom((value) => {
            if (value !== 'Seller') {
                throw new Error('El campo role debe ser "Seller"');
            }
            return true;
        }).withMessage("El rol no es valido"),

    check("email")
        .exists().withMessage("Debe escoger un email")
        .isEmail(),

    check("password")
        .exists().withMessage("Debe escoger una contraseña")
        .isStrongPassword(),

    validateSchema(allowedFields)
]