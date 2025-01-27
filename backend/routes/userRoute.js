import express from "express"
import { loginUser,registerUser,listUser,removeUser,upgradeUserPriv,downgradeUserPriv } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/list",listUser)
userRouter.post("/remove",removeUser)
userRouter.post("/upgrade",upgradeUserPriv)
userRouter.post("/downgrade",downgradeUserPriv)

export default userRouter;