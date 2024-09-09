import { Product } from "../models/Product.js";
import { CustomError } from "../models/CustomErrors.js";
import { productDB } from "../types/dataFromDb"
import { IProduct } from "../models/Product"
import { ObjectId } from "mongoose";

class ProductService {

    async findAll(): Promise<productDB[]> {
        try {
            return await Product.find()
        } catch (error) {
            throw new Error("No hay productos registrados");
        }
    }

    async findByName({ name }: { name: string }): Promise<productDB> {
        try {
            return await Product.findOne({ name })
        } catch (error) {
            throw new Error("No existe ese producto");
        }
    }

    async findOne(id: string | ObjectId): Promise<productDB> {
        try {
            return await Product.findById(id)
        } catch (error) {
            throw new Error("No existe ese producto");
        }
    }

    async create(product: productDB): Promise<productDB> {
        try {
            if (product !== null) {
                const existProduct = await this.findByName({ name: product.name })
                if (existProduct) {
                    throw new Error("Ya existe un producto con ese nombre");
                }
            } else {
                throw new Error("Ya existe un producto con ese nombre");
            }

            return await Product.create(product)

        } catch (error) {
            throw new CustomError("Error al registrar producto", 500);
        }
    }

    async update(id: string | ObjectId, product: IProduct | { stock: number }): Promise<productDB> {
        try {
            return await Product.findByIdAndUpdate(id, product)
        } catch (error) {
            throw new Error("Error al actualizar producto");
        }
    }

    async delete(id: string): Promise<boolean | null> {
        try {
            return await Product.findByIdAndDelete(id)
        } catch (error) {
            throw new Error("Error al eliminar producto");
        }
    }

    async getPricesByIds(ids: string[] | ObjectId[]): Promise<{ id: ObjectId | string, price: number }[]> {
        try {
            // Asegúrate de que `ids` es un array de ObjectId o cadenas
            const products: { _id: ObjectId, price: number }[] = await Product.find({ _id: { $in: ids } }).select('price _id');

            if (products) {
                // Extrae los precios de los productos encontrados
                const prices: { id: ObjectId, price: number }[] = products.map((product) => ({
                    id: product._id, // Asegúrate de que el id se convierta a cadena
                    price: product.price
                }));

                return prices;
            } else {
                throw new Error("No se encontraron productos")
            }

        } catch (error) {
            throw new Error("Error al obtener los precios de los productos");
        }
    }
}

export default new ProductService()