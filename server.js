import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Successfully connected to database."));
