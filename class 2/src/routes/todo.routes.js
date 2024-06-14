import express from "express";
import checkAuth from "../middlewares/check-auth.middleware.js";
import { createTodo, getTodoItem } from "../controllers/todo.controller.js";

const route = express.Router();

route.post("/create-todo", checkAuth, createTodo);
route.get("/get-todo-item/:todoId", getTodoItem);

export { route as todoRoute };