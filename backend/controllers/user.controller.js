import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {

    try {
        
        const loggedInUserId = req.user._id;
        
        const allUsers = await User.find({ _id: {$ne: loggedInUserId} }).select("-password");

        if(!allUsers) {
            return res.status(200).json([]);
        }

        res.status(200).json(allUsers);
        
    } catch (error) {
        console.log("Error in user.controller.js, 'getUsersForSidebar' method.", error.message);
        return res.status(500).json({error:"Internal server error"});
    }
};