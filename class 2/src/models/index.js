import mongoose from "mongoose";
import UserModel from "./user.model.js";

const db = {};

db.mongoose = mongoose;
db.user = UserModel

export default db;