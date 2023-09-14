import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.js";

const authRouter = express.Router();

//CREATE A USER
authRouter.post("/signup", signup);

//SIGN IN
authRouter.post("/signin", signin);

//GOOGLE AUTH
authRouter.post("/google", googleAuth);

export default authRouter;
