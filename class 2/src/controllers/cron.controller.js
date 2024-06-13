import { cronManager } from "../jobs/index.js";

const startJob = async (req, res) => {
    try {
        const { jobName } = req.body;

        const job = cronManager.get(jobName);
        if (!job) return res.status(404).json({
            success: false, message: `Job not found with name ${jobName}!`,
            data: null
        })

        job.start();

        res.status(200).json({
            success: true, message: 'Job started successfully!',
            data: null
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong!", data: null });
    }
}

const stopJob = async (req, res) => {
    try {

        const { jobName } = req.body;

        const job = cronManager.get(jobName);
        if (!job) return res.status(404).json({
            success: false, message: `Job not found with name ${jobName}!`,
            data: null
        })

        job.stop();

        res.status(200).json({
            success: true, message: 'Job stopped successfully!',
            data: null
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong!", data: null });
    }
}

export { startJob, stopJob }