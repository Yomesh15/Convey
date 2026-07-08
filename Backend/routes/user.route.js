import express from "express"
import { LoginUser, RegisterUser } from "../controllers/user.controller.js"

const user_router = express.Router()

user_router.post("/register", RegisterUser)

user_router.post("/login", LoginUser)


export default user_router