import express from 'express'
import { login, logout, refreshToken, signup, verifyOtp } from '../controllers/user.controller.js';

const route = express.Router();

route.post("/signup", signup)
route.post("/login", login)
route.post("/logout", logout)
route.post("/refresh-token", refreshToken)
route.post("/verify-otp", verifyOtp)

export { route as userRoute }