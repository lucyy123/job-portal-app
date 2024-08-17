import { v2 as cloudinary } from 'cloudinary';
import { config } from "dotenv";
import fs from "fs";
config()

export const cloud = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});


export const uploadOnCloudinary = (localfilePath:string | undefined) => {
    if (!localfilePath) return null
    try {
        const res = cloudinary.uploader.upload(localfilePath, {
            resource_type: "auto",
            folder:"job-portal/user"
        })
        return res

    } catch (error) {
        fs.unlinkSync(localfilePath)
    }

}
