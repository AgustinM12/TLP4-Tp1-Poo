import { model, Schema } from "mongoose"

const SaleSchema = new Schema({

    date: Date,
    products: String,
    totalPrice: Number,
    price: Number,
    taxes: Number,
    discount:Number,
    user: String,

}, {
    timestamps: true
})

SaleSchema.

export const Sale = model("sales", SaleSchema)