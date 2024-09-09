"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyAdminOrSeller = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateToken = (user) => {
    try {
        const tokenPayload = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        if (config_1.secretKey !== undefined) {
            // ! Crear el token con duracion de una hora
            const token = jsonwebtoken_1.default.sign(tokenPayload, config_1.secretKey, { expiresIn: '1h' });
            return token;
        }
        else {
            throw new Error("Debe proporcionar una clave secreta");
        }
    }
    catch (error) {
        throw new Error("Debe proporcionar una clave secreta");
    }
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    // ! Obtener el token de los headers de la solicitud
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
    }
    try {
        if (config_1.secretKey !== undefined) {
            //! Verificar el token
            const decoded = jsonwebtoken_1.default.verify(token, config_1.secretKey);
            req.user = decoded;
            next();
        }
    }
    catch (error) {
        return res.status(401).json({ message: 'Token no válido.' });
    }
};
exports.verifyToken = verifyToken;
const verifyAdminOrSeller = (req, res, next) => {
    const { role } = req.user;
    // ! Verificar si el rol es "ADMIN" o "SELLER"
    if (role === "ADMIN" || role === "SELLER") {
        next(); // Permitir el acceso
    }
    else {
        return res.status(403).json({ message: 'Acceso denegado. Requiere rol de ADMIN o SELLER.' });
    }
};
exports.verifyAdminOrSeller = verifyAdminOrSeller;
const verifyAdmin = (req, res, next) => {
    const { role } = req.user;
    // ! Verificar si el rol es "ADMIN" o "SELLER"
    if (role === "ADMIN") {
        next(); // Permitir el acceso
    }
    else {
        return res.status(403).json({ message: 'Acceso denegado. Requiere rol de ADMIN.' });
    }
};
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=jwt.js.map