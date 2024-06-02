import express from "express";
import serverConfig from "./src/configs/server.config.js";
import cors from 'cors'
import { route as userRouter } from "./src/routes/user.routes.js";

const app = express();
app.use(cors());
const PORT = serverConfig.PORT;

app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})