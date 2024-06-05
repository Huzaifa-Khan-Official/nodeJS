import mongoose from "mongoose";

const { Schema } = mongoose

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})

const TokenModel = mongoose.model("Token", TokenSchema)

export { TokenModel };