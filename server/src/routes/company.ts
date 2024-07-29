import express from "express";
import {
  getCompanyById,
  getUserCompaneis,
  registerCompany,
  updateCompany,
} from "../controllers/company.js";
import { isUserAuthenticated } from "./../middlewares/authentication.js";

const app = express.Router();

//1. api/v1/company/register
app.post("/register", isUserAuthenticated, registerCompany);

//1. api/v1/company/myCompanies"
app.get("/myCompanies", isUserAuthenticated, getUserCompaneis);

//1. api/v1/company/companyId
app
  .route("/:id")
  .get(isUserAuthenticated, getCompanyById)
  .put(isUserAuthenticated, updateCompany);

export default app;
