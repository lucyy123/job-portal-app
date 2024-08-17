import express from "express";
import { getUserbyId, login, logout, Register, updateProfile } from "../controllers/userController.js";
import { isUserAuthenticated } from "../middlewares/authentication.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();
//1.  api - /api/v1/user/new/register
app.post("/new/register", singleUpload.single("profilePhoto"), Register);
//2.  api - /api/v1/user/new/login
app.post("/new/login", login);
//3.  api - /api/v1/user/new/logout
app.get("/logout", logout);
//3.  api - /api/v1/user/getUser/userId
app.get("/getUser/:id", isUserAuthenticated, getUserbyId);
//4.  api - /api/v1/user/update/profile
app.route("/update/profile").put(isUserAuthenticated, updateProfile);
export default app;
