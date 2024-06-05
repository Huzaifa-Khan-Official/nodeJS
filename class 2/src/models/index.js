import mongoose from "mongoose";
import UserModel from "./user.model.js";
import { TokenModel } from "./token.model.js";
import { TodoModel } from "./todo.model.js";
import { TodoItemsModel } from "./todoItems.model.js";

const db = {};

db.mongoose = mongoose;
db.user = UserModel;
db.token = TokenModel;
db.todo = TodoModel;
db.todoItem = TodoItemsModel;

export default db;