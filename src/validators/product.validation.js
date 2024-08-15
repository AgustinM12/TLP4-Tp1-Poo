import { check } from "express-validator";
import { validateSchema } from "../helpers/expressValidator.js";

// !CREACION DEL PRODUCTO

const allowedFields = ['name', 'desc', 'price', 'category', 'stock']

export const validateCreateProduct = [
    check("name")
        .exists().withMessage("Debe colocar un nombre al producto")
        .isAlphanumeric().withMessage("El nombre del producto solo debe contener caracteres alfanumericos"),

    check("desc")
        .optional()
        .isAlphanumeric().withMessage("La descripción solo debe contener caracteres alfanumericos"),

    check("price")
        .exists().withMessage("Debe colocarle un precio al producto")
        .isNumeric().withMessage("El precio solo puede ser un valor númerico"),

    check("category")
        .exists().withMessage("Debe colocarle una categoria al producto")
        .isAlphanumeric().withMessage("La categoria solo debe contener caracteres alfanumericos"),

    check("stock")
        .exists().withMessage("Debe colocarle una cantidad de stock al producto")
        .isNumeric().withMessage("La cantidad en stock solo puede ser un valor númerico"),

    validateSchema(allowedFields)
]

// !ACTUALIZAR PRODUCTO

export const validateUpdateProduct = [
    check("name")
        .optional()
        .isAlphanumeric().withMessage("El nombre del producto solo debe contener caracteres alfanumericos"),

    check("desc")
        .optional()
        .isAlphanumeric().withMessage("La descripción solo debe contener caracteres alfanumericos"),

    check("price")
        .optional()
        .isNumeric().withMessage("El precio solo puede ser un valor númerico"),

    check("category")
        .optional()
        .isAlphanumeric().withMessage("La categoria solo debe contener caracteres alfanumericos"),

    check("stock")
        .optional()
        .isNumeric().withMessage("La cantidad en stock solo puede ser un valor númerico"),

    validateSchema(allowedFields)
]