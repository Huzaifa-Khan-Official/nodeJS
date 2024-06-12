
import express from "express";
import { startJob, stopJob } from "../controllers/cron.controller.js";

const route = express.Router();

route.post("/start-job", startJob)
route.post("/stop-job", stopJob)