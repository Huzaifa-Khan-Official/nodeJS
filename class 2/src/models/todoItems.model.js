import mongoose from "mongoose";

const { Schema, Collection } = mongoose

const TodoSchema = new Schema({
    todo: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const TodoItemsModel = mongoose.model("todoItem", TodoSchema)

export { TodoItemsModel }