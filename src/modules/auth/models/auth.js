import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 120,
    },
    dateOfBirth: {
        type: Date        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:[/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    search: {
        type: String,
        default: null
    },
    category: {
        type:String,
        default:null
    },
    refreshToken: {
        type: String,
        default: null
    }
});

const authModel = new mongoose.model("user", authSchema);
export default authModel;