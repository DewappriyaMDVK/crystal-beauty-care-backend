import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './Routers/userRouter.js';
import jwt, { decode } from 'jsonwebtoken';
import productRouter from './Routers/productRouter.js';
import oderRouter from './Routers/oderRouter.js';
import verifyJwt from './middleWare/auth.js';

let app = express();

const mongoUrl = "mongodb+srv://admin:1998@cluster0.nticg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{}).then(() => {
    console.log("Database connection is working")
}).catch((err) => {
    console.log("Database connection is failed",err);
    
});
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Database is connected")
})

app.use(bodyParser.json());
app.use(verifyJwt)


app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/oder",oderRouter)




app.get("/", (req,res)=>{

    console.log(req.body);
    console.log("A get request is recived");
    res.json({"massage":"Hello world"});
});
app.post("/", (req,res)=>{
    const newProduct = new Product(req.body);
    newProduct.save().then(()=>{
    res.json({
        message:"The Product is Saved"})
    }).catch((error)=>{
        res.json({message:"The product couldn't be Saved",error})
    })
    console.log("a post request is recived")});
app.delete("/", ()=>{console.log("a delete request is recived")});

app.put("/", ()=>{console.log("This is a put request!")});



app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});
