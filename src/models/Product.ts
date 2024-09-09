import { model, Schema, Document } from "mongoose"

export interface IProduct extends Document {
    name: string,
    desc: string,
    price: number,
    stock: number,
}

const ProductSchema = new Schema({

    name: { type: String, required: true },
    desc: { type: String, required: false },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },

}, {
    timestamps: true,
    versionKey: 'version'
})


export const Product = model<IProduct>("products", ProductSchema)