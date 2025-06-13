import express from "express"
import { saveUser, userLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",saveUser)
userRouter.post("/login",userLogin)


export default userRouter;