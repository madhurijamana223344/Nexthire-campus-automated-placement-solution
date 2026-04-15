import express from "express";
import multer from "multer";
import Profile from "../models/profile.js"; // ✅ CORRECT

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), async(req, res) => {
    try {
        const { name, skills, education, email } = req.body;

        const saved = await Profile.create({
            name,
            skills,
            education,
            email,
            resume: req.file ? req.file.filename : ""
        });

        res.json(saved);
    } catch (err) {
        res.status(500).json({ message: "error" });
    }
});

router.get("/", async(req, res) => {
    const data = await Profile.find();
    res.json({ data });
});

export default router;