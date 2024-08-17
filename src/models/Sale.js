import { model, Schema } from "mongoose"

const SaleSchema = new Schema({

    date: { type: String, required: true },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    }],
    totalPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    taxes: { type: Number, required: true },
    discount: { type: Number, required: true },
    idClient: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    idSeller: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

}, {
    timestamps: true
})

export const Sale = model("sales", SaleSchema)