import { Product } from "../models/Product.js";

class ProductService {
    constructor() {}

    async findAll() {
        return await Product.find()
    }
    
    async findOne(_id) {
        return await Product.findById(_id)
    }

    async create(product) {
        return await Product.create(product)
    }

    async update(product) {
        return await Product.findByIdAndUpdate(product)
    }

    async delete(_id) {
        return await Product.findByIdAndDelete(_id)
    }

}

export default new ProductService()