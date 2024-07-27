import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
   
    jobType: {
        type: String,
        required: true
    },

    discription: {
        type: String,
        required: true
    },
    requirments: [
        {
            type: String,
        }
    ],

    location: {
        type: String
    },

    salary: {
        type: Number,
        required: true
    },
created_by:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
},

company:{
    type:mongoose.Types.ObjectId,
    ref:"Company"
},
applications:[
    {
        type:mongoose.Types.ObjectId,
        ref:"Application"
    }
]






}, { timestamps: true })

export const Job = mongoose.model('Job', schema)