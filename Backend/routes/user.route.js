import express from "express"
import { GetUsers, LoginUser, RegisterUser, VerifyOtp } from "../controllers/user.controller.js"
import isLogin from "../middlewares/isLogin.js"

const user_router = express.Router()


user_router.post("/register", RegisterUser)

user_router.post("/login", LoginUser)

user_router.get("/all-users", isLogin, GetUsers);

user_router.get("/auth/check", isLogin, (req, res) => {
    res.status(200).json({
        success: true,
    });
});

user_router.post("/verify-otp", VerifyOtp);


export default user_router