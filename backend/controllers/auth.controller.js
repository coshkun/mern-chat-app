import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    //console.log("signup user")
    try {
        const { 
            fullName, username,
            password, confirmPassword, 
            gender
        } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({error:"Passwords don't match"})
        }

        const user = await User.findOne({username});

        if (user) {
            return res.status(400).json({error:"Username already exist"})
        }

        // HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/
        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyPic : girlPic
        });

        if (newUser) {
            // Generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
            // Save user
            await newUser.save();

            res.status(201).json({
                id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({error:"Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const login = async (req, res) => {
    //console.log("login user")
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        const isPassword = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPassword) {
            res.cookie("jwt", "", {maxAge: 0});
            return res.status(400).json({error:"Invalid username or password"});
        }

        const token = generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            profilePic: user.profilePic,
            token: token
        });

    } catch (error) {
        console.log("Error in auth.controller.js, login method.", error.message);
        return res.status(500).json({error:"Internal server error"})
    }
}

export const logout = async (req, res) => {
    //console.log("logout user")
    try {
        res.cookie("jwt", "", {maxAge: 0});
        return res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in auth.controller.js, logout method.", error.message);
        return res.status(500).json({error:"Internal server error"})
    }
} 