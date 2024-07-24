import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/dbs.js";
import Stripe from "stripe";
import cors from 'cors' // helps to fetch backend API to frontend (prevents cross-site error)

// Import routes
import userRoutes from './routes/user.js'
import courseRoutes from './routes/course.js'
import adminRoutes from './routes/admin.js'

dotenv.config();

export const instance = new Stripe({
    key_id: process.env.Stripe_Key,
    key_secret: process.env.Stripe_Secret,
})

const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use('/uploads', express.static("uploads"));
app.use(cors());

app.get("/", (req,res)=>{
    res.send("Server is working")
})

// using routes
app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', adminRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDB()
});