const startJob = async (req, res) => {
    try {
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
        res.status(200).json({
            success: true, message: 'Job stopped successfully!',
            data: null
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong!", data: null });
    }
}

export { startJob, stopJob }