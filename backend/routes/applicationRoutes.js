import express from "express";
import Application from "../models/Application.js";

const router = express.Router();

// ADD
router.post("/", async(req, res) => {
    const app = await Application.create(req.body);
    res.json(app);
});

// GET ALL
router.get("/", async(req, res) => {
    const apps = await Application.find();
    res.json(apps);
});

// GET BY RECRUITER
router.get("/recruiter/:id", async(req, res) => {
    const apps = await Application.find({
        recruiterId: req.params.id
    });
    res.json(apps);
});

// UPDATE STATUS
router.put("/:id", async(req, res) => {
    await Application.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    });
    res.json({ message: "Updated" });
});

// DELETE
router.delete("/:id", async(req, res) => {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

export default router;