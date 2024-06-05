import mongoose from "mongoose";

const { Schema, Collection } = mongoose

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    }
}, { timestamps: true })

const TodoModel = mongoose.model("todo", TodoSchema)

export { TodoModel }