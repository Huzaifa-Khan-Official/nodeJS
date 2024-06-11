import jwt from "jsonwebtoken"
import db from "../models/index.js";
import { compareHash, createHash } from "../utils/hash.util.js";
import { createUser, deleteTokenByUID, findByEmail, getTokenByUID, saveToken, updateUserByEmail } from "../services/user.service.js";
import serverConfig from "../configs/server.config.js";

const { user: User } = db;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findByEmail(email);
        if (!user) return res.status(404).send({ message: "User not found!", data: null });

        if (!user.isActive) return res.status(500).json({ success: false, message: "Please verify your accound first!", data: null });

        const isAlreadyLoggedIn = await getTokenByUID(user.id);
        if (isAlreadyLoggedIn?.length > 0) return res.status(500).json({ success: false, message: "Already logged in", data: null });

        const passwordMatch = await compareHash(password, user.password)

        if (!passwordMatch) return res.status(500).json({ message: "Invalid credentials", data: null });

        const accessToken = jwt.sign({ email: user.email, username: user.username }, serverConfig.jwtSecretKey, { expiresIn: "5m" })
        const refreshToken = jwt.sign({ email: user.email, username: user.username }, serverConfig.jwtRefreshSecretKey, { expiresIn: "7d" })

        const saveTokenResponse = await saveToken({ token: refreshToken, user: user.id })

        res.status(200).json({ message: "Login successful", data: { accessToken, refreshToken } })
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

const verifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;
        const user = await findByEmail(email);
        if (!user) return res.status(404).send({ message: "User not found!", data: null });

        if (user.otp !== otp) return res.status(404).send({ success: false, message: "Invalid otp", data: null });

        const response = await updateUserByEmail(user.email)

        return res.status(200).send({ success: true, message: "Otp varified" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", data: null })
    }
}

const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) return res.status(401).json({ success: false, message: "Refresh is required!" });

        const decoded = jwt.verify(token, serverConfig.jwtRefreshSecretKey);
        const user = await findByEmail(decoded.email);
        if (!user) return res.status(404).json({ success: false, message: "User not found!" });

        const existingToken = await getTokenByUID(user.id);
        if (!existingToken) return res.status(403).json({ success: false, message: "Invalid Token!" });

        const newAccessToken = jwt.sign({ email: user.email, username: user.username }, serverConfig.jwtSecretKey, { expiresIn: "5m" })
        const newRefreshToken = jwt.sign({ email: user.email, username: user.username }, serverConfig.jwtRefreshSecretKey, { expiresIn: "7d" })

        const saveTokenRes = await saveToken({ token: newRefreshToken, user: user.id })

        return res.status(200).json({ success: true, message: "Token refreshed", data: { accessToken: newAccessToken, refreshToken: newRefreshToken } })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
}

export { login, signup, logout, verifyOtp, refreshToken }