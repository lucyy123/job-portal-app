import { TryCatch } from "../middlewares/error.js";
import { Application } from "../models/applications.js";
import { Job } from "../models/jobs.js";
import { NewRequest } from "../types/allType.js";
import ErrorHandler from "../utils/errorHandlerClass.js";

export const applyJob = TryCatch(
  async (req: NewRequest<{}, {}>, res, next) => {
    const { id: userId } = req;
    const { id: jobId } = req.params;

    if (!jobId) return next(new ErrorHandler("Job Id is Required", 404));

    const job = await Job.findById(jobId);

    if (!job) return next(new ErrorHandler("Invalid Job Id", 404));

    const isJobApplied = await Application.findOne({
      job: jobId,
      applicants: userId,
    });

    if (isJobApplied) {
      return res.status(404).json({
        message: "You Have Applied This Job Already",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicants: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Applied Job Successfully",
      jobId,
    });
  }
);

export const getAppliedJobs = TryCatch(
  async (req: NewRequest<{}, {}>, res, next) => {
    const id = req.id;
    const appliedJobs = await Application.find({ applicants: id })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!appliedJobs)
      return next(new ErrorHandler("You Don't Have Applied Jobs", 404));

    return res.status(200).json({
      success: true,
      appliedJobs,
    });
  }
);

export const getAllApplicants = TryCatch(async (req, res, next) => {
  const jobId = req.params.id;
  const applications = await Job.findById(jobId).populate({
    path: "applications",
    options: { sort: { createdAt: -1 } },
    populate: {
      path: "applicants",
      options: { sort: { createdAt: -1 } },
    },
  });

  if (!applications) return next(new ErrorHandler("Invalid JOb Id Id", 404));

  return res.status(200).json({
    success: true,
    applications,
  });
});

export const updateStatus = TryCatch(
  async (req: NewRequest<{}, {}>, res, next) => {
    const applicationId = req.params.id;
    let { status } = req.body;
    const newStatus:string =String(status).toLocaleLowerCase() 
    if (!status) return next(new ErrorHandler("status is require", 404));
    const application = await Application.findById(applicationId);

    if (!application)
      return next(new ErrorHandler("Invalid Application Id", 404));
    switch (newStatus) {
      case "accepted":
        application.status = "accepted";
        break;
      case "rejected":
        application.status = "rejected";
        break;
      default:
        "pending";
        application.status = "pending";
        break;
    }
    application.save();

    return res.status(201).json({
      message: "Status Updated Successfully",
      newStatus,
      application,
    });
  }
);

export const getAllApplications = TryCatch(async(req:NewRequest<{},{}>,res,next)=>{

const id = req.id;

const allApplications = await Application.find({});

if(!allApplications) return next (new ErrorHandler("No Applications are found",404));


return res.status(200).json({
  success:true,
allApplications
})





})
