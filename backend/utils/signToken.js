import jwt from "jsonwebtoken"

export const signToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}