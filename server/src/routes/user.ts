import express from "express";
import { login, logout, Register, updateProfile } from "../controllers/userController.js";
import { isUserAuthenticated } from "../middlewares/authentication.js";

const app=express.Router()


//1.  api - /api/v1/user/new/register
app.post("/new/register",Register)

//2.  api - /api/v1/user/new/login
app.post("/new/login",login)

//3.  api - /api/v1/user/new/logout
app.get("/logout",logout)

//4.  api - /api/v1/user/new/login
app.route("/update/profile").put(isUserAuthenticated,updateProfile)





export default app