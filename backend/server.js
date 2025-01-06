import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import productRouter from "./routes/productRoute.js"
import bodyParser from "body-parser"




// app config
const app = express()
const port = 4000



// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));

// db connection
connectDB();

// api endpoints
app.use("/api/product",productRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})