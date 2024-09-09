"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNameOrEmail = exports.validateLogin = exports.validateSeller = exports.validateCliente = void 0;
const express_validator_1 = require("express-validator");
const expressValidator_js_1 = require("../helpers/expressValidator.js");
const allowedFields = ['name', 'role', 'password', 'email', "user"];
//! CREACION DE CLIENTE
exports.validateCliente = [
    (0, express_validator_1.check)("name")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),
    (0, express_validator_1.check)("email")
        .exists().withMessage("Debe escoger un email")
        .isEmail(),
    (0, express_validator_1.check)("password")
        .exists().withMessage("Debe escoger una contraseña")
        .isStrongPassword().withMessage("La contraseña debe contener al menos una mayuscula, minuscula, numero, caracter especial y al menos 8 caracteres"),
    (0, expressValidator_js_1.validateSchema)(allowedFields)
];
//! CREACION DE VENDEDOR
exports.validateSeller = [
    (0, express_validator_1.check)("name")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),
    (0, express_validator_1.check)("role")
        .exists().withMessage("Debe escoger un rol")
        .custom((value) => {
        if (value != 'SELLER' && value != 'CLIENT') {
            throw new Error('El campo role debe ser "SELLER" o "CLIENT');
        }
        return true;
    }).withMessage('El campo role debe ser "SELLER" o "CLIENT'),
    (0, express_validator_1.check)("email")
        .exists().withMessage("Debe escoger un email")
        .isEmail().withMessage("Debe escoger un email valido"),
    (0, express_validator_1.check)("password")
        .exists().withMessage("Debe escoger una contraseña")
        .isStrongPassword().withMessage("La contraseña debe contener al menos una mayuscula, minuscula, numero, caracter especial y al menos 8 caracteres"),
    (0, expressValidator_js_1.validateSchema)(allowedFields)
];
//! LOGIN
exports.validateLogin = [
    (0, express_validator_1.check)("user")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),
    (0, express_validator_1.check)("password")
        .exists().withMessage("Debe escoger una contraseña"),
    (0, expressValidator_js_1.validateSchema)(["user", "password"])
];
exports.validateNameOrEmail = [
    (0, express_validator_1.check)("user")
        .exists().withMessage("Debe escoger un nombre de usuario o email"),
    (0, expressValidator_js_1.validateSchema)(allowedFields)
];
//# sourceMappingURL=user.validation.js.map