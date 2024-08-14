import ProductService from "../services/ProductService.js"

export const getProducts = async (req, res) => {
    try {
        const products = await ProductService.findAll();
        if (products.length === 0 || !products) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron productos",
            });
        }
        return res.json(products)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        await ProductService.create(req.body)
        return res.status(201).json({
            message: 'Producto creado'
        })
    } catch (error) {
        return res.status(err.statusCode || 500).json({
            message: err.message,
            status: err.status
        })
    }
}

export const updateProduct = (req, res) => {
    try {

    } catch (error) {

    }
    return res.json({
        msg: "All products"
    })
}

export const deleteProduct = (req, res) => {
    try {

    } catch (error) {

    }
    return res.json({
        msg: "All products"
    })
}