import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import serverConfig from "./src/configs/server.config.js";
import { route as userRouter } from "./src/routes/user.routes.js";
import { todoRoute } from "./src/controllers/todo.controller.js";

const app = express();
const PORT = serverConfig.PORT;

(async () => {
    try {

        await mongoose.connect(serverConfig.dbUrl);
        console.log("DB connection established");

        app.use(cors());
        app.use(express.json());
        app.use("/user", userRouter)
        app.use("/todo", todoRoute)

    } catch (error) {
        console.log("couldn't connect to database ==>", error);
    }
})()


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})