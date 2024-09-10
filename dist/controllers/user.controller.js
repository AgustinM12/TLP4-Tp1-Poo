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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.getUsersByRole = exports.getUserByNameOrEmail = exports.getUserById = exports.deleteUser = exports.createSeller = exports.createClient = void 0;
const UserService_1 = __importDefault(require("../services/UserService"));
const CustomErrors_1 = require("../models/CustomErrors");
class UserControllers {
    handleError(error, res) {
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
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserService_1.default.findOne(req.params.id);
                if (!user) {
                    throw new CustomErrors_1.CustomError("No se encontro al usuario", 404);
                }
                return res.json(user);
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    getUserByNameOrEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserService_1.default.findByNameOrEmail(req.body);
                if (!user) {
                    throw new CustomErrors_1.CustomError("No se encontro al usuario", 404);
                }
                return res.json(user);
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    getUsersByRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserService_1.default.findByRole(req.params.role);
                if (!users) {
                    throw new CustomErrors_1.CustomError("No se encontraron usuarios", 404);
                }
                return res.json(users);
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    createClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserService_1.default.createClient(req.body);
                return res.status(201).json({
                    message: 'Cliente registrado'
                });
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    createSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserService_1.default.createSeller(req.body);
                return res.status(201).json({
                    message: 'Usuario registrado'
                });
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserService_1.default.delete(req.params.id);
                return res.status(201).json({
                    message: 'Usuario Eliminado'
                });
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield UserService_1.default.login(req.body);
                return res.status(201).json({
                    message: 'Login correcto', token
                });
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
}
_a = new UserControllers(), exports.createClient = _a.createClient, exports.createSeller = _a.createSeller, exports.deleteUser = _a.deleteUser, exports.getUserById = _a.getUserById, exports.getUserByNameOrEmail = _a.getUserByNameOrEmail, exports.getUsersByRole = _a.getUsersByRole, exports.login = _a.login;
//# sourceMappingURL=user.controller.js.map