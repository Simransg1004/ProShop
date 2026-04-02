import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken"

const protect = asyncHandler( async (req, res, next) => {
    let token;

    // Read the token from "jwt" cookie
    token = req.cookies.jwt;

    if(token) {
        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");

            next();

        } catch (error) {

            console.error(error)
            res.status(401);
            throw new Error("Not Authorized, token failed");

        }
               
    } else {

        res.status(401);
        throw new Error("Not Authorized, no token");

    }
})

// Admin Middleware
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not Authorized as an admin");
    }

}



export { protect, admin };