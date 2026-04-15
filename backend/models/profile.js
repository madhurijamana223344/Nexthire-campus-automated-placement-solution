import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    name: String,
    skills: String,
    education: String,
    email: String,
    resume: String
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);