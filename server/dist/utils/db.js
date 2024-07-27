import mongoose from "mongoose";
export const MongoDb = (url) => {
    try {
        mongoose.connect(url);
        console.log("mongoDB connected successfully");
    }
    catch (error) {
        console.log('error:', error);
    }
};
