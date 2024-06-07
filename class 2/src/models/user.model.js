import mongoose from "mongoose";
import { generateOtp } from "../utils/randomString.util.js";
import { sendEmail } from "../services/mail.service.js";
import { text } from "express";


const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

userSchema.pre("save", function (next) {
    if (!this.otp) {
        this.otp = generateOtp()
        sendEmail({
            to: this.email,
            subject: "Account Verification OTP",
            text: `Your account verification token is ${this.otp}`
        }).then(res => console.log(`Successfully sending emial to ${this.email}`))
            .catch(err => console.log(`Error sending emial to ${this.email}`))
    }
    next();
})

const UserModel = mongoose.model("user", userSchema);

export default UserModel;