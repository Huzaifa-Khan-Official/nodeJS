import db from "../models/index.js";

const { user: User } = db;
const findByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        throw error;
    }
}


const createUser = async (payload) => {
    try {
        const user = new User({ ...payload });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

export { findByEmail, createUser }