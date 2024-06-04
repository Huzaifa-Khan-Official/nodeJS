import db from "../models/index.js";
import bcrypt from "bcrypt";
import { createHash } from "../utils/hash.util.js";

const { user: User } = db;

const login = async (req, res) => {
    res.send("login api is called!")
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

        const newUser = new User({...payload});
        const user = await newUser.save();

        res.send("user is signed up successfully!")
    } catch (error) {
        console.log("error ==>", error);
        res.send("Something went wrong!");
    }
}

export { login, signup }