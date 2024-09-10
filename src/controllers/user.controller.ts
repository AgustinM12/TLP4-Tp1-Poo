import { Request, Response } from "express";
import UserService from "../services/UserService"
import { CustomError } from "../models/CustomErrors";
import { IUser } from "../models/User"

class UserControllers {

    private handleError(error: any, res: Response): Response {
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

    public async getUserById(req: Request, res: Response): Promise<Response> {

        try {
            const user: IUser | null = await UserService.findOne(req.params.id);
            if (!user) {
                throw new CustomError("No se encontro al usuario", 404);
            }
            return res.json(user)

        } catch (error) {
            return this.handleError(error, res);
        }
    }

    public async getUserByNameOrEmail(req: Request, res: Response): Promise<Response> {
        try {
            const user: IUser | null = await UserService.findByNameOrEmail(req.body);
            if (!user) {
                throw new CustomError("No se encontro al usuario", 404);
            }
            return res.json(user)

        } catch (error) {
            return this.handleError(error, res);
        }
    }

    public async getUsersByRole(req: Request, res: Response): Promise<Response> {
        try {
            const users = await UserService.findByRole(req.params.role);

            if (!users) {
                throw new CustomError(
                    "No se encontraron usuarios", 404);
            }
            return res.json(users)

        } catch (error) {
            return this.handleError(error, res);
        }
    }

    public async createClient(req: Request, res: Response): Promise<Response> {
        try {
            await UserService.createClient(req.body)

            return res.status(201).json({
                message: 'Cliente registrado'
            })

        } catch (error) {
            return this.handleError(error, res);
        }
    }

    public async createSeller(req: Request, res: Response): Promise<Response> {
        try {
            await UserService.createSeller(req.body)

            return res.status(201).json({
                message: 'Usuario registrado'
            })
        } catch (error) {
            return this.handleError(error, res);
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            await UserService.delete(req.params.id)

            return res.status(201).json({
                message: 'Usuario Eliminado'
            })
        } catch (error) {
            return this.handleError(error, res);
        }
    }

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const token: string = await UserService.login(req.body)

            return res.status(201).json({
                message: 'Login correcto', token
            })
        } catch (error) {
            return this.handleError(error, res);
        }
    }
}

export const { createClient, createSeller, deleteUser, getUserById, getUserByNameOrEmail, getUsersByRole, login } = new UserControllers()
