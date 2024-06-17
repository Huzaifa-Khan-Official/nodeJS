import express from "express";
import checkAuth from "../middlewares/check-auth.middleware.js";
import { createTodoCategory, createTodo, getTodoCategory } from "../controllers/todo.controller.js";

const route = express.Router();
// route.post("/create-todo", checkAuth, createTodo);
route.post("/create-todo-category", createTodoCategory);
route.get("/get-todo-category/:todoId", getTodoCategory);
// route.post("/list-item/:todoId/create", createTodoListItem);
route.post("/create-todo/:todoId/create", createTodo);

export { route as todoRoute };