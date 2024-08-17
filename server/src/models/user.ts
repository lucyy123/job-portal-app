import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please Enter Your Full Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email Address"],
      unique: true,
    },

    phoneNumber: {
      type: Number,
      required: [true, "Please Enter Phone Number"],
    },

    password: {
      type: String,
      required: [true, "Please Enter Password"],
    },

    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },

    bio: { type: String },
    skills: [
      {
        type: String,
      },
    ],
    resume: {
      type: String,
    },
    resumeOriginalName: {
      type: String,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", schema);
