import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);

export default function connectDB() {
    return mongoose.connect(MONGODB_URL)
}