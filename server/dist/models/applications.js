import mongoose from "mongoose";
const schema = new mongoose.Schema({
    job: {
        type: mongoose.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicants: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });
export const Application = mongoose.model('Application', schema);
