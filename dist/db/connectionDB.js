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
exports.dbConnection = void 0;
const mongoose_1 = require("mongoose");
const config_js_1 = require("../config/config.js");
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (config_js_1.URI != undefined) {
            yield (0, mongoose_1.connect)(config_js_1.URI);
            console.log("Base de datos conectada");
        }
        else {
            console.log("Debe proporcionar una URI de conexion a la DB");
        }
    }
    catch (error) {
        console.log("Error al conectar a la DB", error);
        process.exit();
    }
});
exports.dbConnection = dbConnection;
//# sourceMappingURL=connectionDB.js.map