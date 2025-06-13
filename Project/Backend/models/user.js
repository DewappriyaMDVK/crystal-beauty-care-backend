import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "Customer"
    },
    password : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
        default : "not given"
    },
    isDisable : {
        type : Boolean,
        required : true,
        default : false
    },
    IsEmailVeryfide : {
        type : Boolean,
        required : true,
        default : false
    }
})

const User = mongoose.model("users",userSchema)
export default User;