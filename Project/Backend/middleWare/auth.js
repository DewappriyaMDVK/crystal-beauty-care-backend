import jwt from "jsonwebtoken"

function verifyJwt(req,res,next){
        const header = req.header("Authorization")
        if(header!=null){
            const token = header.replace("Bearer ","")
            jwt.verify(token,"random456",(error,decoded)=>{
            console.log(decoded)
            if(decoded!=null){
                console.log("Refine the token in index js")
                console.log("**[")
                req.user = decoded // creat a user variable in "req"
                console.log("In index js req.user]**[",req.user,"]")
            }
            })
        }
        next()
}
export default verifyJwt;