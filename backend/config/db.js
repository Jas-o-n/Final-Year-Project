import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://jason:jason@cluster0.tbkk6.mongodb.net/fyp').then(()=>console.log("DB Connected"));
}