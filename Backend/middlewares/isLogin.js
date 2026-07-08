import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js"

const isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        if (!decode) {
            return res.status(500).json({ message: "Invalid Token", success: false })
        }

        const user = await UserModel.findById(decode.id)

        if (!user) {
            return res.status(500).json({ message: "User Not Found", success: false })
        }

        req.user = user

        next()

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export default isLogin