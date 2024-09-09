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
const Sale_js_1 = require("../models/Sale.js");
const UserService_js_1 = __importDefault(require("./UserService.js"));
const ProductService_js_1 = __importDefault(require("./ProductService.js"));
const dayjs_1 = __importDefault(require("dayjs"));
class SaleService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Sale_js_1.Sale.find();
            }
            catch (error) {
                throw new Error("No hay ventas registradas");
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Sale_js_1.Sale.findById(id);
            }
            catch (error) {
                throw new Error("No hay registro de esa venta");
            }
        });
    }
    findByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Sale_js_1.Sale.find({ date });
            }
            catch (error) {
                throw new Error("No hay registro de ventas en esa fecha");
            }
        });
    }
    findByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Sale_js_1.Sale.find({ idSeller: id });
            }
            catch (error) {
                throw new Error("No hay registro de ventas de ese vendedor");
            }
        });
    }
    create(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (cart.amount.length !== cart.products.length) {
                    throw new Error("Las cantidades no coinciden con los productos");
                }
                const client = yield UserService_js_1.default.findOne(cart.idClient);
                if (!client || client.role !== "CLIENT") {
                    throw new Error("El ID no corresponde al de un cliente");
                }
                const seller = yield UserService_js_1.default.findOne(cart.idSeller);
                if (!seller || (seller.role !== "SELLER" && seller.role !== "ADMIN")) {
                    throw new Error("El ID no corresponde al de un vendedor o ADMIN");
                }
                const productPrices = yield ProductService_js_1.default.getPricesByIds(cart.products);
                let totalPrice = 0;
                // ! CALCULAR COSTOS Y ACTUALIZAR STOCK
                for (let i = 0; i < productPrices.length; i++) {
                    //! VerificaR que haya suficiente stock
                    const product = yield ProductService_js_1.default.findOne(cart.products[i]);
                    if (!product) {
                        throw new Error(`El ID n°${i + 1} es invalido`);
                    }
                    if (product.stock < cart.amount[i]) {
                        throw new Error(`Stock insuficiente para el producto ${product.name}`);
                    }
                    //! Actualiza el stock del producto
                    yield ProductService_js_1.default.update(cart.products[i], { stock: product.stock - cart.amount[i] });
                    totalPrice += productPrices[i].price * (cart.amount[i] === 0 ? 1 : cart.amount[i]);
                }
                const prices = totalPrice;
                if (cart.taxes) {
                    totalPrice += cart.taxes;
                }
                if (cart.discount) {
                    totalPrice -= cart.discount;
                }
                const date = (0, dayjs_1.default)().format('DD/MM/YYYY');
                return yield Sale_js_1.Sale.create(Object.assign(Object.assign({}, cart), { price: prices, totalPrice, date }));
            }
            catch (error) {
                throw new Error("Error al registrar venta");
            }
        });
    }
}
exports.default = new SaleService();
//# sourceMappingURL=SaleService.js.map