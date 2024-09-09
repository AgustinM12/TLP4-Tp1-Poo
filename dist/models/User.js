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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Definir el esquema de usuario
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, {
    timestamps: true
});
// Middleware para encriptar la contraseña antes de guardar
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // Solo encriptar la contraseña si ha sido modificada o es nueva
        if (!user.isModified("password")) {
            return next();
        }
        try {
            // Encriptar la contraseña
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(user.password, salt);
            // Reemplazar la contraseña en texto plano con la encriptada
            user.password = hash;
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
// Verificar si ya existe un usuario ADMIN
UserSchema.statics.createDefaultAdmin = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const User = this;
        const adminExists = yield User.findOne({ name: "ADMIN" });
        if (!adminExists) {
            // Crear un nuevo usuario "ADMIN" con la contraseña "0000"
            const admin = new User({
                name: "ADMIN",
                password: "0000",
                email: "adminEmail@gmail.com",
                role: "ADMIN"
                // Esta será encriptada por el middlewarerole: "ADMIN"
            });
            yield admin.save();
            console.log("Usuario ADMIN creado por defecto");
        }
    });
};
// Crear el modelo
exports.User = (0, mongoose_1.model)("users", UserSchema);
// Crear el usuario ADMIN por defecto
exports.User.createDefaultAdmin();
//# sourceMappingURL=User.js.map