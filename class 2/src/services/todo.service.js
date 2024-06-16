import db from "../models/index.js ";

const { todo: Todo, todoItem: TodoItems } = db;

const createTodoCategory = async (data) => {
    try {
        const newTodo = new Todo({ categoryName: data.title, createdBy: data.uid });

        const response = await newTodo.save();
        return response;
    } catch (error) {
        throw error;
    }
}

const getTodoCategoryById = async (todoId) => {
    try {
        const response = await Todo.findById(todoId).populate(["createdBy", "todoList"]);
        return response;
    } catch (error) {
        throw error;
    }
}

const createTodoListItems = async (data) => {
    try {
        const newTodoListItem = new TodoItems({ ...data });

        const response = await newTodoListItem.save();

        return response;
    } catch (error) {
        throw error;
    }
}

export { getTodoCategoryById, createTodoCategory, createTodoListItems }