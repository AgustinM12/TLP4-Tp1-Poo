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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("../config/config");
const products_routes_1 = __importDefault(require("../routes/products.routes"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const sale_routes_1 = __importDefault(require("../routes/sale.routes"));
const connectionDB_1 = require("../db/connectionDB");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = config_1.PORT;
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, connectionDB_1.dbConnection)();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use("/api", products_routes_1.default);
        this.app.use("/api", user_routes_1.default);
        this.app.use("/api", sale_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => console.log("Servidor corriendo en http://localhost:" + this.port));
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map