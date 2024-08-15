import { check } from "express-validator";
import { validateSchema } from "../helpers/expressValidator.js";

export const validateSale = [
    check("date")
        .exists()
        .isDate().withMessage("Debe incluir una fecha en la compra"),

    check("products")
        .exists()
        .isAlphanumeric().withMessage("La contraseña solo debe contener caracteres alfanumericos"),

    check("price")
        .exists()
        .isNumeric().withMessage("El precio solo puede ser numerico"),

    check("taxes")
        .exists()
        .isNumeric().withMessage("Los impuestos solo pueden ser numericos"),

    check("discount")
        .exists()
        .isNumeric().withMessage("Los descuentos solo pueden ser numericos"),

    check("user")
        .exists()
        .isAlphanumeric().withMessage("Debe incluir un usuario en la venta"),

    (req, res, next) => {
        validateSchema(req, res, next)
    }
]