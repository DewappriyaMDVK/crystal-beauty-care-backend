import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config()

function verifyJwt(req,res,next){
        const header = req.header("Authorization")
        console.log(header)
        if(header!=null){
            const token = header.replace("Bearer ","")
            jwt.verify(token,process.env.JWT_key,(error,decoded)=>{
            console.log(decoded)
            if(decoded!=null){
                req.user = decoded // creat a user variable in "req"
                console.log("In index js req.user]**[",req.user,"]")
                
            }
            })
        }
        next()
}
export default verifyJwt;