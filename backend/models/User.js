import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

// ✅ VERY IMPORTANT LINE
const User = mongoose.model("User", userSchema);

export default User;