import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
    try {
        const url = process.env.MONGO_URL;
        await mongoose.connect(url);
        console.log('Connection Successful...');
    } catch (error) {
        console.log(error);
    }
};

export default dbConnect;