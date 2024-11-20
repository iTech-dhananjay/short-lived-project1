import bcrypt from "bcryptjs";
import authModel from "../models/auth.js";




const checkExistingUser = () =>{

}
//user SignUp controller
const signUp = async(data) =>  {

    try {

        const newUser = new authModel(userData);

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        newUser.save()

    } catch (error) {
       throw error;
    }
}

// //login Controller
// const login = async (req, res) => {
//     const {email, password} = req.body;
//     try {
//         const user = await auth.findOne({email});
//         if(!user){
//             return res.status(400).json({
//                 success: false,
//                 msg: `Invalid Credential`
//             })
//         }
//         const matchPassword = await bcrypt.compare(password,user.password);
//         if(!matchPassword){
//             return res.status(400).json({
//                 success: false,
//                 msg: "Invalid Credential"
//             })
//         }
//
//         //Generate Access and Refresh Token
//         const accessToken = generateAccessToken({ email });
//         const refreshToken = generateRefreshToken({ email });
//
//         res.cookie("accessToken", accessToken, accessTokenCookieOptions);
//         res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
//
//         res.status(200).json({
//             success: true,
//             msg: `Logged In SuccessFully`,
//             user: {email: email}
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({
//             success: false,
//             msg: "Unable to Logged In user!"
//         });
//     }
// };
//
// //logout Controller
// const logout = async (req,res) => {
//     res.clearCookie("accessToken");
//     res.send("logged out Successfully");
// };
//
// //profile Controller
// const profile = (req, res) => {
//     // console.log(req.user);
//     res.status(200).json({
//         success: true,
//         message: "You are authenticated User",
//         result: req.user
//     })
// }

export  const authService = {
    signUp,
    checkExistingUser,
    // login,
    // logout,
    // profile
}