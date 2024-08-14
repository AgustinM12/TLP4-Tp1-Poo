import { model, Schema } from "mongoose"

const ProductSchema = new Schema({

    date: Date,
    products: String,
    totalPrice: Number,
    user: String,

}, {
    timestamps: true
})


export const Product = model("products", ProductSchema)