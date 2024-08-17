import { check } from "express-validator";
import { validateSchema } from "../helpers/expressValidator.js";
import { param } from "express-validator";
import mongoose from 'mongoose';

const allowedFields = ['date', 'products', 'taxes', 'discount', 'idSeller', 'idClient']

export const validateCreateSale = [
    check("date")
        .exists().withMessage("Debe colocar una fecha")
        .matches(/^(\d{2})\/(\d{2})\/(\d{4})$/).withMessage('La fecha debe seguir el formato "día/mes/año" (ejemplo: "10/04/2012")')
        .custom(value => {
            // Validar si la fecha es válida
            const [day, month, year] = value.split('/').map(Number);
            const date = new Date(`${year}-${month}-${day}`);
            return (date.getDate() === day && date.getMonth() + 1 === month && date.getFullYear() === year);
        }).withMessage('La fecha proporcionada no es válida'),

    check("products")
        .exists().withMessage("debe elegir los productos")
        .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('los IDs de producto son invalidos'),

    check("taxes")
        .optional()
        .exists().withMessage("Debe colocar los impuestos")
        .isNumeric().withMessage("Los impuestos solo pueden ser numericos"),

    check("discount")
        .optional()
        .exists().withMessage("Debe colocar los descuentos")
        .isNumeric().withMessage("Los descuentos solo pueden ser numericos"),

    check("idSeller")
        .exists().withMessage("Debe colocar el id del vendedor")
        .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('El ID del vendedor invalido'),

    check("idClient")
        .exists().withMessage("Debe colocar el id del cliente")
        .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('El ID del cliente es invalido'),

    validateSchema(allowedFields)
]

export const validateSaleId = [
    param("id")
        .exists().withMessage("el id de la venta es obligatorio")
        .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('El ID es invalido'),

    validateSchema(allowedFields)

]

export const validateDate = [

    check("date")
        .exists().withMessage("Debe colocar una fecha")
        .matches(/^(\d{2})\/(\d{2})\/(\d{4})$/).withMessage('La fecha debe seguir el formato "día/mes/año" (ejemplo: "10/04/2012")')
        .custom(value => {
            // Validar si la fecha es válida
            const [day, month, year] = value.split('/').map(Number);
            const date = new Date(`${year}-${month}-${day}`);
            return (date.getDate() === day && date.getMonth() + 1 === month && date.getFullYear() === year);
        }).withMessage('La fecha proporcionada no es válida'),

    validateSchema(allowedFields)

]
