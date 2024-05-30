import express from "express";
import serverConfig from "./src/configs/server.config.js";
import cors from 'cors'

const app = express();
app.use(cors());
const PORT = serverConfig.PORT;

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})