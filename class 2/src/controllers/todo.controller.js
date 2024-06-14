import { getTodoCategoryById } from "../services/todo.service.js";

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

const getTodoItem = async (req, res) => {
    try {

        const { todoId } = req.params;

        const response = await getTodoCategoryById(todoId);

        res.status(200).json({
            success: true, message: 'Success!',
            data: response
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong!", data: null });
    }
}

export { createTodo, getTodoItem }