import db from "../models/index.js";

const { user: User } = db;

const login = async (req, res) => {
    res.send("login api is called!")
}

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({ username, email, password });
        const user = await newUser.save();

        res.send("user ==>", user);

        res.send("signup api is called!")
    } catch (error) {
        console.log("error ==>", error);
        res.send("Something went wrong!");
    }
}

export { login, signup }