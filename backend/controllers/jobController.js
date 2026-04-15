import Job from "../models/Job.js";
import Application from "../models/Application.js";

// ADD JOB
export const addJob = async(req, res) => {
    try {
        const job = await Job.create(req.body);
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET JOBS
export const getJobs = async(req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// APPLY JOB
export const applyJob = async(req, res) => {
    try {
        const application = await Application.create(req.body);
        res.json(application);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET APPLICATIONS
export const getApplications = async(req, res) => {
    try {
        const apps = await Application.find();
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};