"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHeader = exports.validateParamsRole = exports.validateParamsId = exports.validateDate = exports.validateSaleId = exports.validateCreateSale = void 0;
const express_validator_1 = require("express-validator");
const expressValidator_js_1 = require("../helpers/expressValidator.js");
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_js_1 = __importDefault(require("dayjs/plugin/customParseFormat.js"));
dayjs_1.default.extend(customParseFormat_js_1.default);
const allowedFields = ['products', 'amount', 'taxes', 'discount', 'idSeller', 'idClient'];
exports.validateCreateSale = [
    (0, express_validator_1.check)("products")
        .exists().withMessage("debe elegir los productos")
        .isArray().withMessage("Debe colocar un array con los id de productos")
        .custom((value) => {
        // !Verifica que el array no esté vacío
        if (value.length === 0) {
            throw new Error('El array no puede estar vacío');
        }
        //! Verifica que cada elemento del array sea un string
        const allStrings = value.every((item) => typeof item === 'string');
        if (!allStrings) {
            throw new Error('Todos los elementos del array deben ser ids validos');
        }
        return true;
    }).withMessage("Todos los elementos del array deben ser ids validos"),
    (0, express_validator_1.check)("amount")
        .exists().withMessage("Debe colocar las cantidades de cada producto")
        .isArray().withMessage("El campo debe ser un array")
        .custom((value) => {
        // !Verifica que el array no esté vacío
        if (value.length === 0) {
            throw new Error('El array no puede estar vacío');
        }
        //! Verifica que cada elemento del array sea un número
        const allNumbers = value.every((item) => typeof item === 'number' && !isNaN(item));
        if (!allNumbers) {
            throw new Error('Todos los elementos del array deben ser números');
        }
        return true;
    }).withMessage("Todos los elementos del array deben ser números"),
    (0, express_validator_1.check)("taxes")
        .optional()
        .exists().withMessage("Debe colocar los impuestos")
        .isNumeric().withMessage("Los impuestos solo pueden ser numericos"),
    (0, express_validator_1.check)("discount")
        .optional()
        .exists().withMessage("Debe colocar los descuentos")
        .isNumeric().withMessage("Los descuentos solo pueden ser numericos"),
    (0, express_validator_1.check)("idSeller")
        .exists().withMessage("Debe colocar el id del vendedor"),
    (0, express_validator_1.check)("idClient")
        .exists().withMessage("Debe colocar el id del cliente"),
    (0, expressValidator_js_1.validateSchema)(allowedFields)
];
exports.validateSaleId = [
    (0, express_validator_1.check)("idSeller")
        .optional()
        .exists().withMessage("el id de la venta es obligatorio")
        .isAlphanumeric().withMessage("El id es invalido"),
    (0, express_validator_1.check)("idClient")
        .optional()
        .exists().withMessage("el id de la venta es obligatorio")
        .isAlphanumeric().withMessage("El id es invalido"),
    (0, expressValidator_js_1.validateSchema)(allowedFields)
];
exports.validateDate = [
    (0, express_validator_1.check)("date")
        .exists().withMessage("Debe colocar una fecha")
        .custom(value => {
        // Validar si la fecha sigue el formato "día/mes/año"
        const isValidFormat = (0, dayjs_1.default)(value, 'DD/MM/YYYY', true).isValid();
        if (!isValidFormat) {
            throw new Error('La fecha proporcionada no es válida o no sigue el formato "día/mes/año"');
        }
        return true;
    }),
    (0, expressValidator_js_1.validateSchema)(["date"])
];
exports.validateParamsId = [
    (0, express_validator_1.param)("id")
        .exists().withMessage("Debe proporcionar un ID")
        .isAlphanumeric().withMessage("El ID no es valido"),
    (0, expressValidator_js_1.validateSchema)(["id"])
];
exports.validateParamsRole = [
    (0, express_validator_1.param)("role")
        .exists().withMessage("Debe proporcionar un rol")
        .custom((value) => {
        if (value != 'SELLER' && value != 'CLIENT') {
            throw new Error('El campo role debe ser "SELLER" o "CLIENT');
        }
        return true;
    }).withMessage('El campo role debe ser "SELLER" o "CLIENT'),
    (0, expressValidator_js_1.validateSchema)(["role"])
];
exports.validateHeader = [
    (0, express_validator_1.header)('Authorization')
        .exists().withMessage('El encabezado Authorization es requerido'),
    (0, expressValidator_js_1.validateSchema)(allowedFields)
];
//# sourceMappingURL=sale.validation.js.map