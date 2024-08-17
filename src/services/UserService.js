import { User } from "../models/User.js";

class UserService {
    constructor() { }

    async findOne(id) {
        return await User.findById(id)
    }

    async findByRole(role) {
        return await User.find(role)
    }

    async create(user) {
        return await User.create(user)
    }

    async delete(id) {
        return await User.findByIdAndDelete(id)
    }

}

export default new UserService()