import { Product } from "../models/Product.js";
import { CustomError } from "../models/CustomErrors.js";
import { productDB } from "../types/dataFromDb"

class ProductService {
    constructor() { }

    async findAll() {
        try {
            return await Product.find()
        } catch (error) {
            throw new Error("No hay productos registrados");
        }
    }

    async findByName(name) {
        try {
            return await Product.findOne(name)
        } catch (error) {
            throw new Error("No existe ese producto");
        }
    }

    async findOne(id) {
        try {
            return await Product.findById(id)
        } catch (error) {
            throw new Error("No existe ese producto");
        }
    }

    async create(product) {
        try {
            const existProduct = await this.findByName({ name: product.name })

            if (existProduct) {
                throw new Error("Ya existe un producto con ese nombre");
            }

            return await Product.create(product)

        } catch (error) {
            throw new Error(error.message || "Error al registrar producto");
        }
    }

    async update(id, product) {
        try {
            return await Product.findByIdAndUpdate(id, product)
        } catch (error) {
            throw new Error("Error al actualizar producto");
        }
    }

    async delete(id) {
        try {
            return await Product.findByIdAndDelete(id)
        } catch (error) {
            throw new Error("Error al eliminar producto");
        }
    }

    async getPricesByIds(ids) {
        try {
            console.log(ids);

            // Asegúrate de que `ids` es un array de ObjectId o cadenas
            const products = await Product.find({ _id: { $in: ids } }).select('price _id');

            console.log(products);

            // Extrae los precios de los productos encontrados
            const prices = products.map(product => ({
                id: product._id.toString(), // Asegúrate de que el id se convierta a cadena
                price: product.price
            }));

            return prices;
        } catch (error) {
            throw new Error("Error al obtener los precios de los productos");
        }
    }
}

export default new ProductService()