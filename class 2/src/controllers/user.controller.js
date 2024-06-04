import db from "../models/index.js";
import bcrypt from "bcrypt";
import { compareHash, createHash } from "../utils/hash.util.js";
import { createUser, findByEmail } from "../services/user.service.js";

const { user: User } = db;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findByEmail(email);
        if (!user) return res.status(404).send({ message: "Invalid credentials", data: null });

        const passwordMatch = await compareHash(password, user.password)
        if (!passwordMatch) return res.status(500).json({ message: "Invalid credentials", data: null });

        res.send("user found!")
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

export { login, signup }