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
    },

    // 2nd way
    // todoCid: {
    //     type: Schema.Types.ObjectId,
    //     ref: "todo",
    // }
}, { timestamps: true })

const TodoItemsModel = mongoose.model("todoItem", TodoSchema)

export { TodoItemsModel }