import { check, header, param } from "express-validator";
import { validateSchema } from "../helpers/expressValidator.js";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(customParseFormat);

const allowedFields = ['products', 'amount', 'taxes', 'discount', 'idSeller', 'idClient']

export const validateCreateSale = [

    check("products")
        .exists().withMessage("debe elegir los productos")
        .isArray().withMessage("Debe colocar un array con los id de productos")
        .custom((value) => {
            // !Verifica que el array no esté vacío
            if (value.length === 0) {
                throw new Error('El array no puede estar vacío');
            }
            //! Verifica que cada elemento del array sea un string
            const allStrings = value.every(item => typeof item === 'string');
            if (!allStrings) {
                throw new Error('Todos los elementos del array deben ser ids validos');
            }
            return true;
        }).withMessage("Todos los elementos del array deben ser ids validos"),

    check("amount")
        .exists().withMessage("Debe colocar las cantidades de cada producto")
        .isArray().withMessage("El campo debe ser un array")
        .custom((value) => {
            // !Verifica que el array no esté vacío
            if (value.length === 0) {
                throw new Error('El array no puede estar vacío');
            }

            //! Verifica que cada elemento del array sea un número
            const allNumbers = value.every(item => typeof item === 'number' && !isNaN(item));
            if (!allNumbers) {
                throw new Error('Todos los elementos del array deben ser números');
            }

            return true;
        }).withMessage("Todos los elementos del array deben ser números"),

    check("taxes")
        .optional()
        .exists().withMessage("Debe colocar los impuestos")
        .isNumeric().withMessage("Los impuestos solo pueden ser numericos"),

    check("discount")
        .optional()
        .exists().withMessage("Debe colocar los descuentos")
        .isNumeric().withMessage("Los descuentos solo pueden ser numericos"),

    check("idSeller")
        .exists().withMessage("Debe colocar el id del vendedor"),

    check("idClient")
        .exists().withMessage("Debe colocar el id del cliente"),

    validateSchema(allowedFields)
]

export const validateSaleId = [
    check("idSeller")
        .optional()
        .exists().withMessage("el id de la venta es obligatorio")
        .isAlphanumeric().withMessage("El id es invalido"),

    check("idClient")
        .optional()
        .exists().withMessage("el id de la venta es obligatorio")
        .isAlphanumeric().withMessage("El id es invalido"),

    validateSchema(allowedFields)

]

export const validateDate = [
    check("date")
        .exists().withMessage("Debe colocar una fecha")
        .custom(value => {
            // Validar si la fecha sigue el formato "día/mes/año"
            const isValidFormat = dayjs(value, 'DD/MM/YYYY', true).isValid();
            if (!isValidFormat) {
                throw new Error('La fecha proporcionada no es válida o no sigue el formato "día/mes/año"');
            }
            return true;
        }),

    validateSchema(["date"])
];

export const validateParamsId = [

    param("id")
        .exists().withMessage("Debe proporcionar un ID")
        .isAlphanumeric().withMessage("El ID no es valido"),

    validateSchema(["id"])

]

export const validateParamsRole = [

    param("role")
        .exists().withMessage("Debe proporcionar un rol")
        .custom((value) => {
            if (value != 'SELLER' && value != 'CLIENT') {
                throw new Error('El campo role debe ser "SELLER" o "CLIENT');
            }
            return true;
        }).withMessage('El campo role debe ser "SELLER" o "CLIENT'),

    validateSchema(["role"])

]


export const validateHeader = [

    header('Authorization')
        .exists().withMessage('El encabezado Authorization es requerido'),

    validateSchema(allowedFields)

]

