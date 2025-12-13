import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function connectDB() {
  mongoose.connect(process.env.mongoURI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}

dotenv.config();
export default connectDB;