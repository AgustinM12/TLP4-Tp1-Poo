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
exports.createSale = exports.getSalesByUser = exports.getSalesByDate = exports.getSaleById = exports.getSales = void 0;
const SaleService_js_1 = __importDefault(require("../services/SaleService.js"));
const CustomErrors_js_1 = require("../models/CustomErrors.js");
class SalesControllers {
    handleError(error, res) {
        if (error instanceof CustomErrors_js_1.CustomError) {
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
    getSales(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield SaleService_js_1.default.findAll();
                if (!sales) {
                    throw new CustomErrors_js_1.CustomError("No se encontraron ventas", 404);
                }
                return res.json(sales);
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    getSaleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sale = yield SaleService_js_1.default.findOne(req.params.id);
                if (!sale) {
                    throw ({
                        statusCode: 404,
                        status: "Not Found",
                        message: "No se encontraron ventas para ese vendedor/admin",
                    });
                }
                return res.json(sale);
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    getSalesByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield SaleService_js_1.default.findByDate(req.body);
                if (!sales || sales.length === 0) {
                    throw ({
                        statusCode: 404,
                        status: "Not Found",
                        message: "No se encontraron ventas en esa fecha",
                    });
                }
                return res.json(sales);
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    getSalesByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield SaleService_js_1.default.findByUser(req.params.id);
                if (!sales || sales.length === 0) {
                    throw ({
                        statusCode: 404,
                        status: "Not Found",
                        message: "No se encontraron ventas de ese vendedor",
                    });
                }
                return res.json(sales);
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    createSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield SaleService_js_1.default.create(req.body);
                return res.status(201).json({
                    message: 'Venta registrado'
                });
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
}
_a = new SalesControllers(), exports.getSales = _a.getSales, exports.getSaleById = _a.getSaleById, exports.getSalesByDate = _a.getSalesByDate, exports.getSalesByUser = _a.getSalesByUser, exports.createSale = _a.createSale;
//# sourceMappingURL=sale.controller.js.map