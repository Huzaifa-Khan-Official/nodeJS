import mongoose from "mongoose";

const { Schema, Collection } = mongoose

const TodoSchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    todoList: [
        {
            type: Schema.Types.ObjectId,
            ref: "todoItem",
        }
    ]
}, { timestamps: true })

const TodoModel = mongoose.model("todo", TodoSchema)

export { TodoModel }