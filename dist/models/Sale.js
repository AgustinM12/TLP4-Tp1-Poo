"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
const mongoose_1 = require("mongoose");
const SaleSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    products: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        }],
    amount: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    taxes: { type: Number, required: false },
    discount: { type: Number, required: false },
    idClient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    idSeller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, {
    timestamps: true
});
exports.Sale = (0, mongoose_1.model)("sales", SaleSchema);
//# sourceMappingURL=Sale.js.map