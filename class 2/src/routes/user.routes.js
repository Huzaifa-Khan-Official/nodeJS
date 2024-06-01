import express from 'express'
import { login, signup } from '../controllers/user.controller';

const route = express.Router();

route.post("/login", login)
route.post("/signup", signup)

export { route }