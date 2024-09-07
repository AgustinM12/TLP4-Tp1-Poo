import { User, IUserModel, IUser } from "../models/User";
import { generateToken } from "../helpers/jwt"
import { verifyPassword } from "../helpers/validatePassword"
import { userDB } from "../types/userFromDb"
import { CustomError } from "../models/CustomErrors"

class UserService {

    async findOne(id: string): Promise<userDB> {
        try {
            return await User.findById(id)
        } catch (error) {
            throw new CustomError("No se encontró al usuario", 500);
        }
    }

    async findByNameOrEmail({ user }: { user: string }): Promise<userDB> {
        try {
            return await User.findOne({
                $or: [
                    { name: user },
                    { email: user }
                ]
            });
        } catch (error) {
            throw new CustomError("No se encontró al usuario", 500);
        }
    }

    async findByRole(role: string): Promise<IUser[]> {
        try {
            if (role) {
                return await User.find({ role: role })
            } else {
                throw new Error("Elija el rol que quiere buscar");
            }
        } catch (error) {
            throw new CustomError("No se encontró al usuario", 500);
        }
    }

    async createClient(user: IUser): Promise<string> {
        try {
            if (!user) {
                throw new CustomError("El usuario proporcionado es inválido", 400);
            }

            const existClient: userDB = await this.findByNameOrEmail({ user: user.name });

            if (!existClient) {
                if (!user.role) {
                    await User.create({ ...user, role: "CLIENT" });
                    return "Cliente creado correctamente";
                } else {
                    throw new CustomError("El rol no puedo ser asignado", 400);
                }
            } else {
                throw new CustomError("El nombre de usuario ya está ocupado", 400);
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error; // Lanza el error personalizado si es del tipo CustomError
            }
            // Lanza un error general si no es un CustomError
            throw new CustomError("No se pudo crear el cliente", 500);
        }
    }


    async createSeller(user: IUserModel): Promise<string> {
        try {
            const existSeller = await this.findByNameOrEmail({ user: user.name })

            if (!existSeller) {
                await User.create(user);
                return "Usuario creado correctamente"
            } else {
                throw new CustomError("No se encontró al usuario", 500);
            }
        } catch (error) {
            throw new CustomError("No se encontró al usuario", 500);
        }
    }

    async delete(id: string): Promise<string> {
        try {
            const deletedUser: userDB = await this.findOne(id)

            if (deletedUser) {
                if (deletedUser.role !== "ADMIN") {
                    await User.findByIdAndDelete(id)
                    return "Usuario eliminado correctamente"
                } else {
                    throw new Error("No se puede eliminar al ADMIN")
                }
            } else {
                return "El usuario no existe"
            }

        } catch (error) {
            throw new Error("No fue posible eliminar al usuario");
        }
    }

    async login(data: { user: string, password: string }): Promise<string> {
        try {

            const existUser: userDB = await this.findByNameOrEmail({ user: data.user })

            if (existUser) {
                const validPassword: boolean = await verifyPassword(data.password, existUser.password)

                if (validPassword) {
                    return generateToken(existUser)
                } else {
                    return "La contraseña no es valida"
                }
            } else {
                throw new CustomError("No se encontró al usuario", 500);
            }
        } catch (error) {
            throw new CustomError("No se encontró al usuario", 500);
        }
    }

}

export default new UserService()