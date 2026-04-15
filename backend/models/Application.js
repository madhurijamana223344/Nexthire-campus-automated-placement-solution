import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    college: String,
    branch: String,
    resume: String,

    jobTitle: String,
    company: String,
    recruiterId: String, // ✅ IMPORTANT

    status: {
        type: String,
        default: "Applied"
    }
});

export default mongoose.model("Application", applicationSchema);