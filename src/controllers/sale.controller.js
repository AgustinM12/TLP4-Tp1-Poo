import SaleService from "../services/SaleService.js";

export const getSales = async (req, res) => {
    try {

        const sales = await SaleService.findAll(req.params.id)
        if (!sales) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron ventas",
            });
        }
        return res.json(sales)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}

export const getSaleById = async (req, res) => {
    try {

        const sale = await SaleService.findOne(req.params.id)
        if (!sale) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron ventas para ese vendedor/admin",
            });
        }
        return res.json(sale)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}

export const getSalesByDate = async (req, res) => {
    try {

        const sales = await SaleService.findByDate(req.body)
        if (!sales || sales.length === 0) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron ventas en esa fecha",
            });
        }
        return res.json(sales)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}

export const getSalesByUser = async (req, res) => {
    try {

        const sales = await SaleService.findByUser(req.body)
        if (!sales || sales.length === 0) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron ventas/compras para ese usuario",
            });
        }
        return res.json(sales)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}

export const createSale = async (req, res) => {
    try {

        await SaleService.create(req.body)

        return res.status(201).json({
            message: 'Venta registrado'
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}
