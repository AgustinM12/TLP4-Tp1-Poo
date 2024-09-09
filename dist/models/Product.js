"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: false },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
}, {
    timestamps: true,
    versionKey: 'version'
});
exports.Product = (0, mongoose_1.model)("products", ProductSchema);
//# sourceMappingURL=Product.js.map