import express from "express";
import checkAuth from "../middlewares/check-auth.middleware.js";
import { createTodo, createTodoListItem, getTodoItem } from "../controllers/todo.controller.js";

const route = express.Router();

route.post("/create-todo", checkAuth, createTodo);
route.get("/get-todo-item/:todoId", getTodoItem);
route.post("/list-item/:todoId/create", createTodoListItem);

export { route as todoRoute };