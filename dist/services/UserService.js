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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const jwt_1 = require("../helpers/jwt");
const validatePassword_1 = require("../helpers/validatePassword");
const CustomErrors_1 = require("../models/CustomErrors");
class UserService {
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.User.findById(id);
            }
            catch (error) {
                throw new CustomErrors_1.CustomError("No se encontró al usuario", 500);
            }
        });
    }
    findByNameOrEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user }) {
            try {
                return yield User_1.User.findOne({
                    $or: [
                        { name: user },
                        { email: user }
                    ]
                });
            }
            catch (error) {
                throw new CustomErrors_1.CustomError("No se encontró al usuario", 500);
            }
        });
    }
    findByRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (role) {
                    return yield User_1.User.find({ role: role });
                }
                else {
                    throw new Error("Elija el rol que quiere buscar");
                }
            }
            catch (error) {
                throw new CustomErrors_1.CustomError("No se encontró al usuario", 500);
            }
        });
    }
    createClient(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!user) {
                    throw new CustomErrors_1.CustomError("El usuario proporcionado es inválido", 400);
                }
                const existClient = yield this.findByNameOrEmail({ user: user.name });
                if (!existClient) {
                    if (!user.role) {
                        yield User_1.User.create(Object.assign(Object.assign({}, user), { role: "CLIENT" }));
                        return "Cliente creado correctamente";
                    }
                    else {
                        throw new CustomErrors_1.CustomError("El rol no puedo ser asignado", 400);
                    }
                }
                else {
                    throw new CustomErrors_1.CustomError("El nombre de usuario ya está ocupado", 400);
                }
            }
            catch (error) {
                if (error instanceof CustomErrors_1.CustomError) {
                    throw error; // Lanza el error personalizado si es del tipo CustomError
                }
                // Lanza un error general si no es un CustomError
                throw new CustomErrors_1.CustomError("No se pudo crear el cliente", 500);
            }
        });
    }
    createSeller(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existSeller = yield this.findByNameOrEmail({ user: user.name });
                if (!existSeller) {
                    yield User_1.User.create(user);
                    return "Usuario creado correctamente";
                }
                else {
                    throw new CustomErrors_1.CustomError("No se encontró al usuario", 500);
                }
            }
            catch (error) {
                throw new CustomErrors_1.CustomError("No se encontró al usuario", 500);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield this.findOne(id);
                if (deletedUser) {
                    if (deletedUser.role !== "ADMIN") {
                        yield User_1.User.findByIdAndDelete(id);
                        return "Usuario eliminado correctamente";
                    }
                    else {
                        throw new Error("No se puede eliminar al ADMIN");
                    }
                }
                else {
                    return "El usuario no existe";
                }
            }
            catch (error) {
                throw new Error("No fue posible eliminar al usuario");
            }
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existUser = yield this.findByNameOrEmail({ user: data.user });
                if (existUser) {
                    const validPassword = yield (0, validatePassword_1.verifyPassword)(data.password, existUser.password);
                    if (validPassword) {
                        return (0, jwt_1.generateToken)(existUser);
                    }
                    else {
                        return "La contraseña no es valida";
                    }
                }
                else {
                    throw new CustomErrors_1.CustomError("No se encontró al usuario", 500);
                }
            }
            catch (error) {
                throw new CustomErrors_1.CustomError("No se encontró al usuario", 500);
            }
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map