import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export function saveUser(req,res){
    const hashedPassword = bcrypt.hashSync(req.body.password , 10)
    const user = new User({
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        role : req.body.role,
        password : hashedPassword
    })

    user.save().then(()=>{
        res.json({
            massege : "User is Saved."
        })
    }).catch((error)=>{
        res.json({
            massege : "User is not saved.",error
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
                massege : "Invalide UserName"
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
                const token = jwt.sign(userData,"random456")
                console.log("User controller")
                console.log("[")
                console.log(token)
                console.log("]")

                res.json({
                    massege : "User Login successful",
                    token : token
                })
            }else{
                res.json({
                    massege : "Wrong Password"
                })
            }
        }
    })
}