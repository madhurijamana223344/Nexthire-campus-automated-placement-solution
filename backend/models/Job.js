import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    desc: String,
    eligibility: String,
    img: String, // ✅ REQUIRED
    recruiterId: String
});

export default mongoose.model("Job", jobSchema);