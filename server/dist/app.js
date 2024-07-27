// packages
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { MongoDb } from "./utils/db.js";
//imports routes
import userRoutes from "./routes/user.js";
config();
const app = express();
const port = process.env.PORT || 4000;
const mongoUrl = process.env.MONGO_URL || "";
const corsOptions = {
    origin: "http://localhost:5173/",
    Credential: true,
};
//middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routes
app.use("api/v1/user", userRoutes);
app.listen(port, () => {
    MongoDb(mongoUrl);
    console.log(`server is connected to ${port}`);
});
