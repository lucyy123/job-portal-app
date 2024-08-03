import { TryCatch } from "../middlewares/error.js";
import { Job } from "../models/jobs.js";
import ErrorHandler from "../utils/errorHandlerClass.js";
export const createJob = TryCatch(async (req, res, next) => {
    const userId = req.id;
    const { position, company, discription, experienceLevel, jobType, location, requirments, salary, title, } = req.body;
    if (!title ||
        !position ||
        !company ||
        !discription ||
        !experienceLevel ||
        !jobType ||
        !location ||
        !requirments ||
        !salary)
        return next(new ErrorHandler("Please Enter all feilds", 404));
    const newJob = await Job.create({
        title,
        company,
        created_by: userId,
        discription,
        experienceLevel,
        jobType,
        location,
        position: Number(position),
        requirments: requirments.split(","),
        salary: Number(salary),
    });
    return res.status(201).json({
        message: "New Job Created Successfully",
        success: true,
    });
});
export const getAllJobs = TryCatch(async (req, res, next) => {
    const key = req.query.search || "developer";
    const condition = {
        $or: [
            { title: { $regex: key, $options: "i" } },
            { discription: { $regex: key, $options: "i" } },
        ],
    };
    const allJob = await Job.find(condition).populate("company").sort({ createdAt: -1 });
    if (!allJob)
        return next(new ErrorHandler("Job Not Found", 404));
    return res.status(200).json({
        success: true,
        Jobs: allJob,
    });
});
export const getJobById = TryCatch(async (req, res, next) => {
    const { id: jobId } = req.params;
    const job = await Job.findById(jobId).populate("company");
    if (!job)
        return next(new ErrorHandler("Invalid Job Id", 404));
    return res.status(200).json({
        success: true,
        job,
    });
});
export const recruitersCreatedJobs = TryCatch(async (req, res, next) => {
    const { id: recruiterId } = req;
    const jobs = await Job.find({ created_by: recruiterId });
    if (!jobs)
        return next(new ErrorHandler("No Jobs Found", 404));
    return res.status(200).json({
        success: true,
        jobs
    });
});
