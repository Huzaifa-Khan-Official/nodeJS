import { createTodoCategoryService, createTodoListItem, getTodoCategoryById } from "../services/todo.service.js";

const createTodoCategory = async (req, res) => {
    try {
        const { title, uid } = req.body;

        const createTodoResponse = await createTodoCategoryService({ title, uid })

        res.status(200).json({
            success: true, message: 'Todo created successfully!',
            data: createTodoResponse
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong!", data: null });
    }
}

const getTodoCategory = async (req, res) => {
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

const createTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { todo } = req.body;

        const response = await createTodoListItem({ todo })

        const getTodoCategory = await getTodoCategoryById(todoId);
        if (!getTodoCategory) return res.status(500).json({ success: false, message: `Todo category by ${todoId} not found `, data: null });

        getTodoCategory.todoList.push(response.id);
        await getTodoCategory.save();
        res.status(200).json({
            success: true, message: 'Todo list item created successfully!',
            data: response
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong!", error })
    }
}

export { createTodoCategory, getTodoCategory, createTodo }