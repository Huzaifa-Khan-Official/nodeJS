import express from "express";
import checkAuth from "../middlewares/check-auth.middleware.js";
import { createTodo } from "../controllers/todo.controller.js";

const route = express.Router();

route.post("/create-todo", checkAuth, createTodo);

export { route as todoRoute  };