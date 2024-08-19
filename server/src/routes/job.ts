import express from "express";
import {
    createJob,
    getAllJobs,
    getJobById,
    recruitersCreatedJobs,
} from "../controllers/job.js";
import { isUserAuthenticated } from "./../middlewares/authentication.js";
const app = express.Router();

//1. route - /api/v1/job/create/new
app.post("/create/new", isUserAuthenticated, createJob);

//2. route - /api/v1/job/:id
app.get("/:id", isUserAuthenticated, getJobById);

//2. route - /api/v1/job/all/jobs
app.get("/all/jobs", getAllJobs);
//2. route - /api/v1/job/recruiter-job
app.get("/all/recruiter-job", isUserAuthenticated, recruitersCreatedJobs);

export default app;
