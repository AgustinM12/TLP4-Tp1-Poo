import { User } from "../models/User.js";
import { generateToken, verifyToken } from "../helpers/jwt.js"
import { verifyPassword } from "../helpers/validatePassword.js"

class UserService {

    async findOne(id) {
        return await User.findById(id)
    }

    async findByNameOrEmail(nameOrEmail) {
        return await User.find(nameOrEmail)
    }

    async findByRole(role) {
        return await User.find(role)
    }

    async create(user) {

        if (user.role) {
            // ! crear cliente            
            return await User.create(user)
        } else {
            // ! crear vendedor
            return await User.create({ ...user, role: "CLIENT" });
        }
    }


    
    async delete(id) {
        return await User.findByIdAndDelete(id)
    }

    async login(data) {

        const existUser = this.findByNameOrEmail(data.user)

        const validPassword = await verifyPassword(data.password, existUser.password)

        if (existUser && validPassword) {
            return generateToken(existUser)
        }
    }

}

export default new UserService()