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
exports.updateProduct = exports.getProducts = exports.getProductByName = exports.getProduct = exports.deleteProduct = exports.createProduct = void 0;
const ProductService_js_1 = __importDefault(require("../services/ProductService.js"));
const CustomErrors_js_1 = require("../models/CustomErrors.js");
class ProductControllers {
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
    getProducts(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductService_js_1.default.findAll();
                if (products.length === 0 || !products) {
                    throw new CustomErrors_js_1.CustomError("No se encontraron productos", 404);
                }
                else {
                    return res.json(products);
                }
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield ProductService_js_1.default.findOne(req.params.id);
                if (!product) {
                    throw new CustomErrors_js_1.CustomError("No se encontro el producto", 404);
                }
                else {
                    return res.json(product);
                }
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    getProductByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield ProductService_js_1.default.findByName(req.body);
                if (!product) {
                    throw new CustomErrors_js_1.CustomError("No se encontro el producto", 404);
                }
                else {
                    return res.json(product);
                }
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ProductService_js_1.default.create(req.body);
                return res.status(201).json({
                    message: 'Producto creado'
                });
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ProductService_js_1.default.update(req.params.id, req.body);
                return res.status(201).json({
                    message: 'Producto actualizado'
                });
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ProductService_js_1.default.delete(req.params.id);
                return res.status(201).json({
                    message: 'Producto Eliminado'
                });
            }
            catch (error) {
                return this.handleError(error, res);
            }
        });
    }
}
_a = new ProductControllers(), exports.createProduct = _a.createProduct, exports.deleteProduct = _a.deleteProduct, exports.getProduct = _a.getProduct, exports.getProductByName = _a.getProductByName, exports.getProducts = _a.getProducts, exports.updateProduct = _a.updateProduct;
//# sourceMappingURL=products.controller.js.map