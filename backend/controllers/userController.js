import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";


export const updateProfile = async (req, res) => {
    try {
        const { profilePic, ...otherData } = req.body;
        const updatedData = otherData;

        if (profilePic) {
            if (profilePic.startsWith("data:image")) {
                try {
                    const uploadResponse = await cloudinary.uploader.upload(profilePic);
                    updatedData.profilePic = uploadResponse.secure_url;
                } catch (error) {
                    return res.status(400).json({
                        success: false,
                        message: "Error uploading image"
                    })
                }
            }
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true });

        res.status(200).json({
            success: true,
            user: updatedUser,
        })
    } catch (error) {
        console.log("Error in updateProfile: ", error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}