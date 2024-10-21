import User from "../models/User.js"
import jasonwebtoken from "jsonwebtoken"

const signToken = (id) => {
    return jasonwebtoken.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

export const signup = async (req, res) => {
    const { name, email, password, age, gender, genderPreference } = req.body;

    try {
        if (!name || !email || !password || !age || !gender || !genderPreference) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: "You must be at least 18 years old"
            })
        }


        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            })
        }

        const newUser = await User.create({
            name,
            email,
            password,
            age,
            gender,
            genderPreference,
        })

        const token = signToken(newUser._id);

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        return res.status(201).json({
            success: true,
            user: newUser
        })
    } catch (error) {
        console.log("Error in sign up controller");
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const token = signToken(user._id);

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.log("Error in login controller");
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}
export const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}