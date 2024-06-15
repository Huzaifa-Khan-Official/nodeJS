import { createTodoCategory, createTodoListItems, getTodoCategoryById } from "../services/todo.service.js";

const createTodo = async (req, res) => {
    try {

        const { name, uid } = req.body;

        const createTodoResponse = await createTodoCategory({ name, uid })

        res.status(200).json({
            success: true, message: 'Todo created successfully!',
            data: createTodoResponse
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

const createTodoListItem = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { name } = req.body;

        const response = await createTodoListItems({ name })

        const getTodoCategory = await getTodoCategoryById(todoId);
        if (!getTodoCategory) return res.status(500).json({ success: false, message: `Todo category by ${todoId} not found `, data: null });

        getTodoCategory.todoList.push(response.id);
        await getTodoCategory.save();
        res.status(200).json({
            success: true, message: 'Todo list item created successfully!',
            data: response
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong!", data: null })
    }
}

export { createTodo, getTodoItem, createTodoListItem }