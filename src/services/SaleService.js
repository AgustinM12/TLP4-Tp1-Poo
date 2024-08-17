import { Sale } from "../models/Sale.js";
import UserService from "./UserService.js";
import ProductService from "./ProductService.js"

class SaleService {
    constructor() { }

    async findAll(id) {
        try {
            if (id) {
                return await Sale.find()
            } else {
                throw new Error("Debe ser un vendedor a admin para acceder a todas la ventas");
            }
        } catch (error) {
            throw new Error(error.message || "No hay ventas registradas");
        }
    }

    async findOne(id) {
        try {
            return await Sale.findById(id)
        } catch (error) {
            throw new Error("No hay registro de esa venta");
        }
    }

    async findByDate(date) {
        try {
            return await Sale.find(date)
        } catch (error) {
            throw new Error("No hay registro de ventas en esa fecha");
        }
    }

    async findByUser(idUser) {
        try {
            return await Sale.find(idUser)
        } catch (error) {
            throw new Error("No hay registro de ventas de ese vendedor");
        }
    }

    async create(cart) {
        try {

            const client = await UserService.findOne(cart.idClient)
            if (!client || !client.role !== "CLIENT") {
                throw new Error("El ID no corresponde al de un cliente");
            }

            const seller = await UserService.findOne(cart.idSeller)
            if (!seller || !seller.role !== "SELLER") {
                throw new Error("El ID no corresponde al de un vendedor");
            }

            const productPrices = await ProductService.getPricesByIds(cart.products)

            const prices = productPrices.reduce((accumulator, current) => {
                return accumulator + current.price;
            }, 0);

            let totalPrice = prices

            if (cart.taxes) {
                totalPrice + cart.taxes
            }
            if (cart.discount) {
                totalPrice - cart.discount
            }

            return await Sale.create({
                ...cart, price: prices, totalPrice
            })

        } catch (error) {
            throw new Error(error.message || "Error al registrar venta")
        }
    }

}

export default new SaleService()