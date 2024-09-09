import { model, Schema, Document, ObjectId } from "mongoose"

export interface ISale extends Document {
    date: string,
    products: ObjectId[],
    amount: [],
    totalPrice: number,
    price: number,
    taxes: number,
    discount: number,
    idClient: ObjectId,
    idSeller: ObjectId
}

const SaleSchema = new Schema({

    date: { type: String, required: true },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    }],
    amount: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    taxes: { type: Number, required: false },
    discount: { type: Number, required: false },
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

export const Sale = model<ISale>("sales", SaleSchema)