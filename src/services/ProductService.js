import { Product } from "../models/Product.js";

class ProductService {
    constructor() { }

    async findAll() {
        return await Product.find()
    }

    async findOne(id) {
        return await Product.findById(id)
    }

    async create(product) {
        return await Product.create(product)
    }

    async update(id, product) {
        return await Product.findByIdAndUpdate(id, product)
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id)
    }

}

export default new ProductService()