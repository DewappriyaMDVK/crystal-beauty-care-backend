import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './Routers/userRouter.js';
import productRouter from './Routers/productRouter.js';
import orderRouter from './Routers/orderRouter.js';
import verifyJwt from './middleWare/auth.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()
let app = express();
app.use(cors())

mongoose.connect(process.env.mongoUrl,{}).then(() => {
    console.log("Database connected")
}).catch((err) => {
    console.log("Database connection is failed",err);
    
});
const connection = mongoose.connection;   
connection.once("open",()=>{
    console.log("Database connection is working")
})

app.use(bodyParser.json());
app.use(verifyJwt)


app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/order",orderRouter)

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});
