import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/dbs.js";
// Import routes
import userRoutes from './routes/user.js'

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Server is working")
})

// using routes
app.use('/api', userRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDB()
});