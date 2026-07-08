import express from "express"
import isLogin from "../middlewares/isLogin.js"
import { GetMessage, SendMessage } from "../controllers/message.controller.js"

const message_router = express.Router()


message_router.post("/send/:id", isLogin, SendMessage)

message_router.get("/:id", isLogin, GetMessage)


export default message_router