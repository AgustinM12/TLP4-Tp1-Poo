import { model, Schema } from "mongoose"

const ProductSchema = new Schema({

    name: String,
    desc: String,
    price: Number,
    category: String,
    stock: Number,

}, {
    timestamps: true
})


export const Product = model("products", ProductSchema)