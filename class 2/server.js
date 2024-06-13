import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import serverConfig from "./src/configs/server.config.js";
import { DB_RETRY_LIMIT, DB_RETRY_TIMEOUT } from "./src/constants/constants.js";
import { todoRoute } from "./src/routes/todo.routes.js";
import { cronRoute } from "./src/routes/cron.routes.js";
import { userRoute } from "./src/routes/user.routes.js";

const app = express();
const PORT = serverConfig.PORT;

let connectionRetries = 0

async function connectToDB() {
    try {
        console.log("Establishing DB connection...");
        await mongoose.connect(serverConfig.dbUrl);
        console.log("DB connection established");
    } catch (error) {
        if (connectionRetries < DB_RETRY_LIMIT) {
            connectionRetries++;
            console.log(`Reconnecting to DB ${connectionRetries}/${DB_RETRY_LIMIT}`);
            await new Promise(resolve => setTimeout(resolve, DB_RETRY_TIMEOUT))
            await connectToDB();
        } else {
            process.exit();
        }
    }
}

(async () => {
    try {

        await connectToDB();

        app.use(cors());
        app.use(express.json());
        app.use("/user", userRoute)
        app.use("/todo", todoRoute)
        app.use("/cron", cronRoute)

    } catch (error) {
        console.log("couldn't connect to database ==>", error);
    }
})()


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})