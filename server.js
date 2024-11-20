import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDb from "./src/config/db.js";
dotenv.config();
import router from "./src/modules/auth/routes/auth.js";
import passport from "passport";
import cookieParser from "cookie-parser";


app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`);
    });
});
