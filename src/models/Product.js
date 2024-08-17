import { model, Schema } from "mongoose"

const ProductSchema = new Schema({

    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },

}, {
    timestamps: true,
    versionKey: 'version'
})


export const Product = model("products", ProductSchema)