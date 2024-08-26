// packages
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import { MongoDb } from "./utils/db.js";
//imports routes
import { errorMiddleware } from "./middlewares/error.js";
import applicationRoutes from "./routes/application.js";
import companyRoutes from "./routes/company.js";
import jobRoutes from "./routes/job.js";
import userRoutes from "./routes/user.js";
config();
const app = express();
const port = process.env.PORT || 4000;
const mongoUrl = process.env.MONGO_URL || "";
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
};
//middlewares
app.use(cors(corsOptions));
// Handle preflight requests
app.options('*', cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);
// to check the error after route
app.use(errorMiddleware);
app.listen(port, () => {
    MongoDb(mongoUrl);
    console.log(`server is connected to port ${port}`);
});
