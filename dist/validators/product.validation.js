"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductName = exports.validateUpdateProduct = exports.validateCreateProduct = void 0;
const express_validator_1 = require("express-validator");
const expressValidator_js_1 = require("../helpers/expressValidator.js");
// !CREACION DEL PRODUCTO
const allowedFields = ['name', 'desc', 'price', 'stock'];
exports.validateCreateProduct = [
    (0, express_validator_1.check)("name")
        .exists().withMessage("Debe colocar un nombre al producto")
        .isAlphanumeric().withMessage("El nombre del producto solo debe contener caracteres alfanumericos"),
    (0, express_validator_1.check)("desc")
        .optional()
        .isAlphanumeric().withMessage("La descripción solo debe contener caracteres alfanumericos"),
    (0, express_validator_1.check)("price")
        .exists().withMessage("Debe colocarle un precio al producto")
        .isNumeric().withMessage("El precio solo puede ser un valor númerico"),
    (0, express_validator_1.check)("stock")
        .exists().withMessage("Debe colocarle una cantidad de stock al producto")
        .isNumeric().withMessage("La cantidad en stock solo puede ser un valor númerico"),
    (0, expressValidator_js_1.validateSchema)(allowedFields)
];
// !ACTUALIZAR PRODUCTO
exports.validateUpdateProduct = [
    (0, express_validator_1.check)("name")
        .optional()
        .isAlphanumeric().withMessage("El nombre del producto solo debe contener caracteres alfanumericos"),
    (0, express_validator_1.check)("desc")
        .optional()
        .isAlphanumeric().withMessage("La descripción solo debe contener caracteres alfanumericos"),
    (0, express_validator_1.check)("price")
        .optional()
        .isNumeric().withMessage("El precio solo puede ser un valor númerico"),
    (0, express_validator_1.check)("category")
        .optional()
        .isAlphanumeric().withMessage("La categoria solo debe contener caracteres alfanumericos"),
    (0, express_validator_1.check)("stock")
        .optional()
        .isNumeric().withMessage("La cantidad en stock solo puede ser un valor númerico"),
    (0, expressValidator_js_1.validateSchema)(allowedFields)
];
// ! BUSCAR POR NOMBRE
exports.validateProductName = [
    (0, express_validator_1.check)("name")
        .exists().withMessage("Debe colocar un nombre al producto")
        .isAlphanumeric().withMessage("El nombre del producto solo debe contener caracteres alfanumericos"),
    (0, expressValidator_js_1.validateSchema)(["name"])
];
//# sourceMappingURL=product.validation.js.map