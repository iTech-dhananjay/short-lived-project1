import express from "express";
const router = express.Router();
import { authService } from "../services/auth.js";


router.post("/register", async(req,res)=>{
    try{
        const {userName, name, age, dateOfBirth, email, password, phone, search, category} = req.body
        let userVatidation = validateModel({userName, name, age, dateOfBirth, email, password, phone});
        if(userVatidation) {  return res.status(400).send(userVatidation.message) }

        const existingUser = await authService.checkExistingUser(email)
        if(!existingUser){
            return res.status(400).json({
                success: false,
                msg: "user already exist"
            })
        }

        const user = await authService.signUp(req.body)

        if(user){
            return res.status(200).json({
                success: true,
                msg: "User Added Successfully",
                user
            })
        }

    }catch(error){
        return res.status(500).json({
            success: false,
            msg : 'Internal Server Error'
        })
    }
});


// router.post("/login", login);
// router.delete("/logout", logout);
// router.get("/profile", verifyAccessToken, profile)

export default router;