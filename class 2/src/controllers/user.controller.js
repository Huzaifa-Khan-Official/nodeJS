import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import db from "../models/index.js";
import { compareHash, createHash } from "../utils/hash.util.js";
import { createUser, deleteTokenByUID, findByEmail, getTokenByUID, saveToken } from "../services/user.service.js";
import serverConfig from "../configs/server.config.js";

const { user: User } = db;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findByEmail(email);
        if (!user) return res.status(404).send({ message: "User not found!", data: null });

        const isAlreadyLoggedIn = await getTokenByUID(user.id);
        if (isAlreadyLoggedIn?.length > 0) return res.status(500).json({ success: false, message: "Already logged in", data: null });

        const passwordMatch = await compareHash(password, user.password)

        if (!passwordMatch) return res.status(500).json({ message: "Invalid credentials", data: null });

        const token = jwt.sign({ email: user.email, username: user.username }, serverConfig.jwtSecretKey, { expiresIn: "1h" })

        const generateToken = await saveToken({ token, user: user.id })

        res.status(200).json({ message: "Login successful", data: { token: generateToken.token } })
    } catch (error) {
        res.status(404).send({ message: "Internal error", error: error })
    }
}

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // finding email
        const findEmail = await User.findOne({ email: email });
        if (findEmail) return res.send("Email already in use");

        const hashedPassword = await createHash(password);

        // saving user in database
        const payload = {
            username,
            email,
            password: hashedPassword
        }

        const newUser = await createUser(payload)
        if (!newUser) return res.status(404).send({ message: "Internal Server Error", error: newUser });

        res.send("user is signed up successfully!")
    } catch (error) {
        res.status(404).send({ message: "Internal Server Error", error: error });
    }
}

const logout = async (req, res) => {
    try {
        const { uid } = req.body;
        const logoutUser = await deleteTokenByUID(uid);
        if (logoutUser.deletedCount === 0) return res.status(500).json({ success: false, message: "already logged out!", data: null })

        res.status(200).json({ status: true, message: "successfully logged out!", data: null })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

export { login, signup, logout }