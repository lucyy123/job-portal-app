import express from 'express';
import { applyJob, getAllApplicants, getAllApplications, getAppliedJobs, updateStatus } from "../controllers/application.js";
import { isUserAuthenticated } from '../middlewares/authentication.js';
const app = express.Router();
//apply to new job
//1. route api/v1/applications/jobId
app.get("/:id", isUserAuthenticated, applyJob);
//get all applicanttions
//2. route api/v1/applications/get/all
app.get("/get/all", isUserAuthenticated, getAllApplications);
// all applicaitons of users
//3. route api/v1/applications/getAppliedJobs
app.get("/getAppliedJobs/user", isUserAuthenticated, getAppliedJobs);
// get the all applicant related to the job
//4. route api/v1/applications/applicants/jobId
app.get("/job/:id/applicants", isUserAuthenticated, getAllApplicants);
//5. route api/v1/applications/updateStatus/ApplicationId
app.route("/status/:id").put(isUserAuthenticated, updateStatus);
export default app;
