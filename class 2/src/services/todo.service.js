import db from "../models/index.js ";

const { todo: Todo } = db;
const getTodoCategoryById = async (todoId) => {
    try {

        const response = await Todo.findById(todoId).populate(["createdBy", "todoList"]);
        return response;
    } catch (error) {
        throw error;
    }
}

export { getTodoCategoryById }