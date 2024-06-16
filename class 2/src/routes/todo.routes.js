import express from "express";
import checkAuth from "../middlewares/check-auth.middleware.js";
import { createTodo, createTodoListItem, getTodoItem } from "../controllers/todo.controller.js";

const route = express.Router();
// 666eec399aabe9ab725aefe6
// route.post("/create-todo", checkAuth, createTodo);
route.post("/create-todo-category", createTodo);
route.get("/get-todo-category/:todoId", getTodoItem);
route.post("/list-item/:todoId/create", createTodoListItem);

export { route as todoRoute };