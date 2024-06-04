import mongoose from "mongoose";
import UserModel from "./user.model.js";
import { TokenModel } from "./token.model.js";

const db = {};

db.mongoose = mongoose;
db.user = UserModel;
db.token = TokenModel;

export default db;