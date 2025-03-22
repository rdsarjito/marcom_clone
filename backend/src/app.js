import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import materiRoutes from "./routes/materiRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/materi", materiRoutes);

// Connect
mongoose.connect(process.env.MONGO_URI, { dbName: "bri" })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

export default app;