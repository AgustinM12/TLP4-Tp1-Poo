import { Sale } from "../models/Sale.js";

class SaleService {
    constructor() { }

    async findAll() {
        return await Sale.find()
    }

    async findOne(_id) {
        return await Sale.findById(_id)
    }

    async findByDate(date) {
        return await Sale.find(date)
    }

    async findByUser(_idUser) {
        return await Sale.find(_idUser)
    }

    async create(cart) {
        return await Sale.create(cart)
    }

}

export default new SaleService()