import express from "express";
import { getCompaneis, getCompanyById, registerCompany, updateCompany, } from "../controllers/company.js";
import { singleUpload } from "../middlewares/multer.js";
import { isUserAuthenticated } from "./../middlewares/authentication.js";
const app = express.Router();
//1. api/v1/company/register
app.post("/register", isUserAuthenticated, registerCompany);
//1. api/v1/company/all"
app.get("/all", isUserAuthenticated, getCompaneis);
//1. api/v1/company/companyId
app
    .route("/:id")
    .get(isUserAuthenticated, getCompanyById)
    .put(isUserAuthenticated, singleUpload.single('logo'), updateCompany);
export default app;
