import express from "express";
import User from "../models/User.js";

const router = express.Router();


// =======================
// ✅ SIGNUP ROUTE
// =======================
router.post("/signup", async(req, res) => {
    try {
        console.log("📥 Signup API called");
        console.log("Request Body:", req.body);

        const { name, email, password, role } = req.body;

        // ✅ VALIDATION
        if (!name || !email || !password || !role) {
            console.log("❌ Missing fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ CHECK EXISTING USER
        const exists = await User.findOne({ email });

        if (exists) {
            console.log("❌ User already exists:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ CREATE USER
        const newUser = new User({
            name,
            email,
            password,
            role
        });

        await newUser.save();

        console.log("✅ User saved successfully:", newUser.email);

        // ✅ SUCCESS RESPONSE (BEST PRACTICE)
        res.status(201).json({
            message: "Signup successful",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (err) {
        console.error("🔥 Signup Error:", err);

        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
});


// =======================
// ✅ LOGIN ROUTE (BONUS 🔥)
// =======================
router.post("/login", async(req, res) => {
    try {
        console.log("📥 Login API called");
        console.log("Request Body:", req.body);

        const { email, password } = req.body;

        // ✅ VALIDATION
        if (!email || !password) {
            return res.status(400).json({ message: "Email & Password required" });
        }

        // ✅ FIND USER
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // ❗ SIMPLE PASSWORD CHECK (no hashing yet)
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        console.log("✅ Login success:", user.email);

        // ✅ RESPONSE
        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("🔥 Login Error:", err);

        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
});

export default router;