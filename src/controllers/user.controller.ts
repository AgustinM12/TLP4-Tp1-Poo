import { Request, Response } from "express";
import UserService from "../services/UserService"
import { CustomError } from "../models/CustomErrors";
import { IUser } from "../models/User"

export const getUserById = async (req: Request, res: Response): Promise<Response> => {

    try {
        const user: IUser | null = await UserService.findOne(req.params.id);
        if (!user) {
            throw new CustomError("No se encontro al usuario", 404);
        }
        return res.json(user)

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        // Manejo de otros errores (por ejemplo, errores internos del servidor)
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
}


export const getUserByNameOrEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user: IUser | null = await UserService.findByNameOrEmail(req.body);
        if (!user) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontro al usuario",
            });
        }
        return res.json(user)

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
}

export const getUsersByRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await UserService.findByRole(req.params.role);

        if (!users) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron usuarios",
            });
        }
        return res.json(users)

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
}

export const createClient = async (req: Request, res: Response): Promise<Response> => {
    try {
        await UserService.createClient(req.body)

        return res.status(201).json({
            message: 'Cliente registrado'
        })

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }

}

export const createSeller = async (req: Request, res: Response): Promise<Response> => {
    try {
        await UserService.createSeller(req.body)

        return res.status(201).json({
            message: 'Usuario registrado'
        })
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        await UserService.delete(req.params.id)

        return res.status(201).json({
            message: 'Usuario Eliminado'
        })
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const token: string = await UserService.login(req.body)

        console.log(token);

        return res.status(201).json({
            message: 'Login correcto', token
        })
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                status: error.status,
            });
        }
        return res.status(500).json({
            message: "Ocurrió un error inesperado",
            status: "error",
        });
    }
}
