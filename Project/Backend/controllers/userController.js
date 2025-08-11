import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

export function saveUser(req,res){
    const hashedPassword = bcrypt.hashSync(req.body.password , 10)
    const user = new User({
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        role : req.body.role,
        phone : req.body.phone,
        password : hashedPassword
    })

    user.save().then(()=>{
        res.json({
            massage : "User is Saved."
        })
    }).catch((error)=>{
        res.json({
            massage : "User is not saved.",error
        })
    })
}

export function userLogin(req,res){
    const email = req.body.email
    const password = req.body.password

    User.findOne({
        email : email,
    }).then((user)=>{
        if(user==null){
            res.json({
                massage : "Invalide UserName"
            })
        }else{
            const isPasswordCorrect = bcrypt.compareSync(password,user.password)// In here password value is boolean
            if(isPasswordCorrect){

                const userData = {
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    role : user.role,
                    phone : user.phone,
                    isDisable : user.isDisable,
                    IsEmailVeryfide : user.IsEmailVeryfide
                }
                const token = jwt.sign(userData,process.env.JWT_key)
               
                console.log(token)

                res.json({
                    massage : "User Login successful",
                    token : token,
                    user : userData
                })
            }else{
                res.json({
                    massage : "Wrong Password"
                })
            }
        }
    })
}