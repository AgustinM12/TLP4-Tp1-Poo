"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const express_validator_1 = require("express-validator");
const validateSchema = (allowedFields) => (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    const receivedFields = Object.keys(req.body);
    const extraFields = receivedFields.filter((field) => !allowedFields.includes(field));
    if (extraFields.length > 0) {
        return res.status(400).json({
            errors: { message: `Los siguientes campos no están permitidos: ${extraFields.join(', ')}` }
        });
    }
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().reduce((acc, error) => {
            const { path, msg } = error;
            if (!acc[path]) {
                acc[path] = [];
            }
            acc[path].push(msg);
            return acc;
        }, {});
        return res.status(400).json({ errors: formattedErrors });
    }
    next();
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=expressValidator.js.map