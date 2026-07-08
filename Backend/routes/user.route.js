import express from "express"
import { GetUsers, LoginUser, RegisterUser } from "../controllers/user.controller.js"
import isLogin from "../middlewares/isLogin.js"

const user_router = express.Router()


user_router.post("/register", RegisterUser)

user_router.post("/login", LoginUser)

user_router.get("/all-users",isLogin, GetUsers);


export default user_router