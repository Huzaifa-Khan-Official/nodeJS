import express from 'express'
import { login, signup } from '../controllers/user.controller.js';

const route = express.Router();

route.get("/signup", signup)
route.get("/login", login)

export { route }