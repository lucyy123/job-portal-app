import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      required: true,
    },

    discription: {
      type: String,
      required: true,
    },
    requirments: [
      {
        type: String,
      },
    ],
    experienceLevel: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },

    salary: {
      type: Number,
      required: true,
    },

    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required:true
    },
    applications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", schema);
