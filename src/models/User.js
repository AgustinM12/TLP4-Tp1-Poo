import { model, Schema } from "mongoose"

const UserSchema = new Schema({

    name: String,
    password: String,
    purchasesAmount: Number,

}, {
    timestamps: true
})


export const User = model("users", UserSchema)