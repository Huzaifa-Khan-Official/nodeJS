import db from "../models/index.js";

const { user: User, token: Token } = db;
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

const saveToken = async (payload) => {
    try {
        const newToken = new Token({ ...payload });
        const token = await newToken.save();
        return token;
    } catch (error) {
        throw error;
    }
}

const getTokenByUID = async (uid) => {
    try {
        const response = await Token.find({ user: uid })
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteTokenByUID = async (uid) => {
    try {
        const response = await Token.deleteMany({ user: uid })
        return response;
    } catch (error) {
        throw error;
    }
}

export { findByEmail, createUser, saveToken, getTokenByUID, deleteTokenByUID }