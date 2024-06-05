import jwt from "jsonwebtoken"
import serverConfig from "../configs/server.config.js";

const checkAuth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: "No token provided"
        })

        const isValid = jwt.verify(token.slice(7), serverConfig.jwtSecretKey)
        console.log("isValid ==>", isValid);
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized", error: error })
    }
}

export default checkAuth;