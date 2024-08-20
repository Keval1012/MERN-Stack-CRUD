import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'First name is required']
    },
    lname: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, , 'Password is required']
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'mern-stack');