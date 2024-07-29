import mongoose from "mongoose";
const scheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    discription: {
        type: String,
    },
    website: {
        type: String,
    },
    logo: {
        type: String,
    },
    UserId: {
        type: mongoose.Types.ObjectId,
        role: "User",
        required: true
    },
}, { timestamps: true });
export const Company = mongoose.model("Company", scheme);
