import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ IMAGE ACCESS
app.use("/uploads", express.static("uploads"));

// ✅ ROUTES
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// ✅ DB CONNECT (MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Atlas Connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err)); ++


        // ✅ SERVER
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });