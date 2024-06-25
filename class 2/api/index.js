import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import { ExpressAdapter } from "@bull-board/express"
import { createBullBoard } from "@bull-board/api"
import { BullAdapter } from "@bull-board/api/bullAdapter.js"
import emailQueue from "../src/Queues/index.js";
import serverConfig from "../src/configs/server.config.js";
import redisConfig from "../src/configs/redis.config.js";
import { DB_RETRY_LIMIT, DB_RETRY_TIMEOUT } from "../src/constants/constants.js";
import { todoRoute } from "../src/routes/todo.routes.js";
import { cronRoute } from "../src/routes/cron.routes.js";
import { userRoute } from "../src/routes/user.routes.js";
import { dummyJob1 } from "../src/jobs/dummy1.job.js";
import { dummyJob2 } from "../src/jobs/dummy2.job.js";

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



connectToDB()
    .then(res => console.log("Successfully connected to database"))
    .catch(err => console.log("Error connecting to database"))

app.use(cors());
app.use(express.json());
dummyJob1.stop();
dummyJob2.stop();
app.use("/user", userRoute)
app.use("/todo", todoRoute)
app.use("/cron", cronRoute)

// const serverAdapter = new ExpressAdapter();

// serverAdapter.setBasePath("/ui");

// createBullBoard({
//     queues: [new BullAdapter(emailQueue)],
//     serverAdapter
// });

// app.use("/ui", serverAdapter.getRouter());

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/ui');

createBullBoard({
    queues: [new BullAdapter(emailQueue)],
    serverAdapter,
});

app.use('/ui', serverAdapter.getRouter());


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

export default app;