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
const Product_js_1 = require("../models/Product.js");
const CustomErrors_js_1 = require("../models/CustomErrors.js");
class ProductService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Product_js_1.Product.find();
            }
            catch (error) {
                throw new Error("No hay productos registrados");
            }
        });
    }
    findByName(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name }) {
            try {
                return yield Product_js_1.Product.findOne({ name });
            }
            catch (error) {
                throw new Error("No existe ese producto");
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Product_js_1.Product.findById(id);
            }
            catch (error) {
                throw new Error("No existe ese producto");
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (product !== null) {
                    const existProduct = yield this.findByName({ name: product.name });
                    if (existProduct) {
                        throw new Error("Ya existe un producto con ese nombre");
                    }
                }
                else {
                    throw new Error("Ya existe un producto con ese nombre");
                }
                return yield Product_js_1.Product.create(product);
            }
            catch (error) {
                throw new CustomErrors_js_1.CustomError("Error al registrar producto", 500);
            }
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Product_js_1.Product.findByIdAndUpdate(id, product);
            }
            catch (error) {
                throw new Error("Error al actualizar producto");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Product_js_1.Product.findByIdAndDelete(id);
            }
            catch (error) {
                throw new Error("Error al eliminar producto");
            }
        });
    }
    getPricesByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Asegúrate de que `ids` es un array de ObjectId o cadenas
                const products = yield Product_js_1.Product.find({ _id: { $in: ids } }).select('price _id');
                if (products) {
                    // Extrae los precios de los productos encontrados
                    const prices = products.map((product) => ({
                        id: product._id, // Asegúrate de que el id se convierta a cadena
                        price: product.price
                    }));
                    return prices;
                }
                else {
                    throw new Error("No se encontraron productos");
                }
            }
            catch (error) {
                throw new Error("Error al obtener los precios de los productos");
            }
        });
    }
}
exports.default = new ProductService();
//# sourceMappingURL=ProductService.js.map