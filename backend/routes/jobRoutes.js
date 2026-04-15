import express from "express";
import multer from "multer";
import Job from "../models/Job.js";

const router = express.Router();

/* =========================
   MULTER SETUP
========================= */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

/* =========================
   ADD JOB (WITH IMAGE)
========================= */
router.post("/", upload.single("img"), async(req, res) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            company: req.body.company,
            desc: req.body.desc,
            eligibility: req.body.eligibility,
            img: req.file ? req.file.filename : "",
            recruiterId: req.body.recruiterId
        });

        res.json(job);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding job" });
    }
});

/* =========================
   GET JOBS
========================= */
router.get("/", async(req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching jobs" });
    }
});

/* =========================
   DELETE JOB
========================= */
router.delete("/:id", async(req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
});

export default router;