import express from "express";
import  colors from "colors";
import dotenv from "dotenv";
import morgan from   "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url";
import { dirname } from 'path';

//configure dotenv
dotenv.config();

//data base config
connectDB();

//esmodule fix
const __filename=fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//rest object
const app=express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')));

//routes 
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);

//rest api
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
});

// pass tfQI8bIFnC5utL1O
//port
const PORT=process.env.PORT || 8080;

//run lsiten
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
})
