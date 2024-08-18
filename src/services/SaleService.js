import { Sale } from "../models/Sale.js";
import UserService from "./UserService.js";
import ProductService from "./ProductService.js"
import dayjs from "dayjs";

class SaleService {
    constructor() { }

    async findAll() {
        try {
            return await Sale.find()
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

    async findByUser(id) {
        try {
            return await Sale.find({ idSeller: id })
        } catch (error) {
            throw new Error("No hay registro de ventas de ese vendedor");
        }
    }

    async create(cart) {
        try {

            if (cart.amount.length !== cart.products.length) {
                throw new Error("Las cantidades no coinciden con los productos");
            }

            const client = await UserService.findOne(cart.idClient)
            if (!client || client.role !== "CLIENT") {
                throw new Error("El ID no corresponde al de un cliente");
            }

            const seller = await UserService.findOne(cart.idSeller)

            if (!seller || (seller.role !== "SELLER" && seller.role !== "ADMIN")) {
                throw new Error("El ID no corresponde al de un vendedor o ADMIN");
            }

            const productPrices = await ProductService.getPricesByIds(cart.products)

            let totalPrice = 0;

            // ! CALCULAR COSTOS Y ACTUALIZAR STOCK
            for (let i = 0; i < productPrices.length; i++) {
                //! VerificaR que haya suficiente stock
                const product = await ProductService.findOne(cart.products[i]);

                if (!product) {
                    throw new Error(`El ID n°${i + 1} es invalido`);
                }

                if (product.stock < cart.amount[i]) {
                    throw new Error(`Stock insuficiente para el producto ${product.name}`);
                }

                //! Actualiza el stock del producto
                await ProductService.update(cart.products[i], { stock: product.stock - cart.amount[i] });

                totalPrice += productPrices[i].price * (cart.amount[i] === 0 ? 1 : cart.amount[i]);
            }

            const prices = totalPrice

            if (cart.taxes) {
                totalPrice += cart.taxes
            }
            if (cart.discount) {
                totalPrice -= cart.discount
            }

            const date = dayjs().format('DD/MM/YYYY');

            return await Sale.create({
                ...cart, price: prices, totalPrice, date
            })

        } catch (error) {
            throw new Error(error.message || "Error al registrar venta")
        }
    }

}

export default new SaleService()