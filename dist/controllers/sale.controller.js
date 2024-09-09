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
exports.createSale = exports.getSalesByUser = exports.getSalesByDate = exports.getSaleById = exports.getSales = void 0;
const SaleService_js_1 = __importDefault(require("../services/SaleService.js"));
const CustomErrors_js_1 = require("../models/CustomErrors.js");
const getSales = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield SaleService_js_1.default.findAll();
        if (!sales) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron ventas",
            });
        }
        return res.json(sales);
    }
    catch (error) {
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
});
exports.getSales = getSales;
const getSaleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.getSaleById = getSaleById;
const getSalesByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.getSalesByDate = getSalesByDate;
const getSalesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.getSalesByUser = getSalesByUser;
const createSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield SaleService_js_1.default.create(req.body);
        return res.status(201).json({
            message: 'Venta registrado'
        });
    }
    catch (error) {
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
});
exports.createSale = createSale;
//# sourceMappingURL=sale.controller.js.map