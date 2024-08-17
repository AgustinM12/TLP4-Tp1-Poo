import { User } from "../models/User.js";
import { generateToken, verifyToken } from "../helpers/jwt.js"
import { verifyPassword } from "../helpers/validatePassword.js"

class UserService {

    async findOne(id) {
        try {
            return await User.findById(id)
        } catch (error) {
            throw new Error("No se encontro usuario");
        }
    }

    async findByNameOrEmail(user) {

        try {
            return await User.findOne({
                $or: [
                    { name: user },
                    { email: user }
                ]
            });
        } catch (error) {
            throw new Error("No se encontró el usuario");
        }
    }

    async findByRole(role) {
        try {
            return await User.find(role)
        } catch (error) {
            throw new Error("No se encontraron usuarios");
        }
    }

    async createClient(user) {
        try {
            if (!user.role) {
                return await User.create({ ...user, role: "CLIENT" });
            }
        } catch (error) {
            throw new Error("Error al crear usuario");
        }
    }

    async createSeller(user) {
        try {
            if (user) {
                return await User.create(user);
            }
        } catch (error) {
            throw new Error("Error al crear usuario");
        }
    }

    async delete(id) {
        try {
            const deletedUser = await this.findOne(id)
            console.log(deletedUser);

            if (deletedUser.role !== "ADMIN") {
                return await User.findByIdAndDelete(id)
            } else {
                throw new Error("No se puede eliminar al ADMIN")
            }
        } catch (error) {
            throw new Error("No fue posible eliminar al usuario");
        }
    }

    async login(data) {
        try {
            const existUser = await this.findByNameOrEmail(data.user)

            const validPassword = await verifyPassword(data.password, existUser.password)

            if (existUser && validPassword) {
                return generateToken(existUser)
            }
        } catch (error) {
            throw new Error("Error al iniciar sesion");
        }
    }

}

export default new UserService()