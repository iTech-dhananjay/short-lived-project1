import auth from "../modules/auth/models/auth.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";

// passport.use(
//     new LocalStrategy(
//         {usernameField: "email"},
//         async (emailOrPhone, password, done) => {
//             try {
//                 const user = await auth.findOne({
//                     $or: [{email: emailOrPhone}, {phone: emailOrPhone}],
//                 });

//                 if(!user){
//                     return done(null, false, {message: "Incorrect email or password"});
//                 }

//                 const isMatch = await bcrypt.compare(password, user.password);
//                 if(!isMatch){
//                     return done(null, false, {message: "Incorrect email or password"});
//                 }

//                 return done(null, user);
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

//Generate a short-lived access token (valid for 15 minutes)
export const generateAccessToken = (user) => {
    const payload = { userId: user._id, email: user.email };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
    return accessToken;
}

//Generate a long-lived JWT refresh token (valid for 7 days)
export const generateRefreshToken = (user) => {
    const payload = { userId: user._id };
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return refreshToken;
};

//Middleware to verify JWT access token from cookies
export const verifyAccessToken = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const data = decoded;
        req.user = await auth.findOne({email: data.email}).select("-password");
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Access token expired or Invalid"});
    }
};

//Middleware to verify JWT refresh token from cookies
export const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await auth.findById(decoded.userId);

        if(!user || user.refreshToken !== refreshToken){
            return res.status(403).josn({success: false, message: "Invalid or expired refresh token"});
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid or expired refresh token"});
    }
};

//Centralized Cookies Setting
export const accessTokenCookieOptions = { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 }; //15 minutes
export const refreshTokenCookieOptions = { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }; //7 days

export default passport;