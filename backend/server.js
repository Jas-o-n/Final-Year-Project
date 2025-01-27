import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { connectDB } from "./config/db.js"
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'




// app config
const app = express()
const port = 4000 || process.env.PORT



// middleware
const allowedOrigins = [
    "http://localhost:5173", // dev admin frontend
    "http://localhost:5174", // dev frontend
    "https://ibmsadminfyp.netlify.app", // admin frontend
    "https://ibmsfyp.netlify.app", // frontend
]

app.use(cors({
    origin: allowedOrigins
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));

// db connection
connectDB();

// api endpoints
app.use("/api/product",productRouter)
app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})