import User from "../models/user.model";
import jwt from "jsonwebtoken";

const protectRoure = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({message: "Unauthorized"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.uderId).select("-password");

        req.user;
        next();
    } catch(error){
        res.status(500).json({message: error.message});
        console.log("Error in signUpUser", error.message);
    }
}