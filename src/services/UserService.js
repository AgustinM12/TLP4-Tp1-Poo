import { User } from "../models/User.js";

class UserService {
    constructor() { }

    async findOne(_id) {
        return await User.findById(_id)
    }

    async create(user) {
        return await User.create(user)
    }

}

export default new UserService()