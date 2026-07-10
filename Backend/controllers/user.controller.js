import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import OtpModel from "../models/otp.model.js";
import sendOtpMail from "../utils/sendOtpMail.js";


// for registter
export const RegisterUser = async (req, res) => {
    try {

        const { fullname, email, password, profile } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "All Fields are Required",
                success: false,
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
                success: false,
            });
        }

        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(409).json({
                message: "User already exists",
                success: false,
            });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        const hashedPassword = await bcrypt.hash(password, 11);

        await OtpModel.deleteOne({ email });

        await OtpModel.create({
            fullname,
            email,
            password: hashedPassword,
            profile,
            otp,
            otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
        });

        console.log("before")

        await sendOtpMail(email, fullname, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to your email.",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


//verify otp
export const VerifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
                success: false
            });
        }


        // Find OTP data
        const otpData = await OtpModel.findOne({ email });

        if (!otpData) {
            return res.status(400).json({
                message: "OTP not found or expired",
                success: false
            });
        }


        // Check OTP expiry
        if (otpData.otpExpiry < Date.now()) {
            await OtpModel.deleteOne({ email });

            return res.status(400).json({
                message: "OTP expired",
                success: false
            });
        }


        // Check OTP
        if (otpData.otp.toString() !== otp.toString()) {
            return res.status(401).json({
                message: "Invalid OTP",
                success: false
            });
        }


        // Create User after verification
        const user = await UserModel.create({
            fullname: otpData.fullname,
            email: otpData.email,
            password: otpData.password,
            profile: otpData.profile
        });


        // Delete temporary OTP data
        await OtpModel.deleteOne({ email });


        // Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "3d"
            }
        );


        // Store cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });


        return res.status(201).json({
            message: "Email verified and Account Created successfully",
            success: true,
            user
        });


    } catch (error) {

        console.log("VERIFY OTP ERROR:", error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};



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
            sameSite: "None",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: `Welcome ${userexists.fullname}`, success: true, token, user: userexists })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}



// get all users
export const GetUsers = async (req, res) => {
    try {

        console.log("REQ USER:", req.user);

        const loggedInUser = req.user._id;

        const users = await UserModel.find({
            _id: { $ne: loggedInUser }
        }).select("-password");

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {

        console.log("GET USERS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};