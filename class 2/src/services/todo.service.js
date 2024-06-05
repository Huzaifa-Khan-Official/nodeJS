const createTodo = async (req, res) => {
    try {
        res.status(200).json({
            success: true, message: 'Todo created successfully!',
            data: null
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong!", data: null });
    }
}

export { createTodo }