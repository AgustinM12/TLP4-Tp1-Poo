"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUser = exports.createSeller = exports.createClient = exports.getUsersByRole = exports.getUserByNameOrEmail = exports.getUserById = void 0;
const UserService_1 = __importDefault(require("../services/UserService"));
const CustomErrors_1 = require("../models/CustomErrors");
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserService_1.default.findOne(req.params.id);
        if (!user) {
            throw new CustomErrors_1.CustomError("No se encontro al usuario", 404);
        }
        return res.json(user);
    }
    catch (error) {
        if (error instanceof CustomErrors_1.CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        // Manejo de otros errores (por ejemplo, errores internos del servidor)
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
});
exports.getUserById = getUserById;
const getUserByNameOrEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserService_1.default.findByNameOrEmail(req.body);
        if (!user) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontro al usuario",
            });
        }
        return res.json(user);
    }
    catch (error) {
        if (error instanceof CustomErrors_1.CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
});
exports.getUserByNameOrEmail = getUserByNameOrEmail;
const getUsersByRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserService_1.default.findByRole(req.params.role);
        if (!users) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron usuarios",
            });
        }
        return res.json(users);
    }
    catch (error) {
        if (error instanceof CustomErrors_1.CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
});
exports.getUsersByRole = getUsersByRole;
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserService_1.default.createClient(req.body);
        return res.status(201).json({
            message: 'Cliente registrado'
        });
    }
    catch (error) {
        if (error instanceof CustomErrors_1.CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
});
exports.createClient = createClient;
const createSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserService_1.default.createSeller(req.body);
        return res.status(201).json({
            message: 'Usuario registrado'
        });
    }
    catch (error) {
        if (error instanceof CustomErrors_1.CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
});
exports.createSeller = createSeller;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserService_1.default.delete(req.params.id);
        return res.status(201).json({
            message: 'Usuario Eliminado'
        });
    }
    catch (error) {
        if (error instanceof CustomErrors_1.CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
});
exports.deleteUser = deleteUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield UserService_1.default.login(req.body);
        console.log(token);
        return res.status(201).json({
            message: 'Login correcto', token
        });
    }
    catch (error) {
        if (error instanceof CustomErrors_1.CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
});
exports.login = login;
//# sourceMappingURL=user.controller.js.map