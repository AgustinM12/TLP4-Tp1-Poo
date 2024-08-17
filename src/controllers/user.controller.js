import UserService from "../services/UserService.js"

export const getUser = async (req, res) => {
    try {
        const user = await UserService.findOne(req.params.id);
        if (!user) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontro al usuario",
            });
        }
        return res.json(user)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}

export const getUsersByRole = async (req, res) => {
    try {
        const users = await UserService.findByRole(req.body);
        if (!users) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontro el usuarios",
            });
        }
        return res.json(users)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}

export const createUser = async (req, res) => {
    try {
        await UserService.create(req.body)
        return res.status(201).json({
            message: 'Cliente registrado'
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status
        })
    }
}

// export const createSeller = async (req, res) => {
//     try {
//         await UserService.create(req.body)
//         return res.status(201).json({
//             message: 'Vendedor registrado'
//         })
//     } catch (error) {
//         return res.status(err.statusCode || 500).json({
//             message: err.message,
//             status: err.status
//         })
//     }
// }

export const deleteUser = async (req, res) => {
    try {
        await UserService.delete(req.params.id)
        return res.status(201).json({
            message: 'Usuario Eliminado'
        })
    } catch (error) {
        return res.status(err.statusCode || 500).json({
            message: err.message,
            status: err.status
        })
    }
}