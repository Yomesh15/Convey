import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


//for reggister
export const RegisterUser = async (req, res) => {
    try {
        const { fullname, email, password, profile } = req.body

        if (!fullname || !email || !password) {
            return res.status(401).json({ message: "All Fields are Required ", success: false })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password Must be at Least 6 ", success: false })
        }

        const exists = await UserModel.findOne({ email })

        if (exists) {
            return res.status(409).json({ message: "User Already Exist ", success: false })
        }

        const hashpassword = await bcrypt.hash(password, 11)

        await UserModel.create({
            fullname, email, password: hashpassword, profile
        })

        return res.status(201).json({ message: "Registered Successfully ", success: true })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error ", success: false })
    }
}


//for login
export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All Fields are Required", success: false })
        }

        const userexists = await UserModel.findOne({ email }).select("+password")

        if (!userexists) {
            return res.status(400).json({ message: "User Not Exist", success: false })
        }

        const comparepassword = await bcrypt.compare(password, userexists.password)

        if (!comparepassword) {
            return res.status(401).json({ message: "Invalid Credentials", success: false })
        }

        const token = jwt.sign(
            { id: userexists._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        )

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({ message: `Welcome ${userexists.fullname}`, success: true, token, user: userexists })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}



// get all users
export const GetUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const users = await UserModel.find({
            _id: { $ne: loggedInUser }
        }).select("-password");

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};