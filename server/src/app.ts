
// packages
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { MongoDb } from "./utils/db.js";
import morgan from "morgan"



//imports routes

import { errorMiddleware } from "./middlewares/error.js";
import userRoutes from "./routes/user.js";

config();
const app=express();
const port=process.env.PORT || 4000;
const mongoUrl=process.env.MONGO_URL || ""

const corsOptions={
    origin:"http://localhost:5173/",
    Credential:true,

}

//middlewares
app.use(cors(corsOptions))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

//routes
app.use("/api/v1/user",userRoutes)

// to check the error after route
app.use(errorMiddleware)


app.listen(port,()=>{
    MongoDb(mongoUrl)
    console.log(`server is connected to port ${port}`)
})

