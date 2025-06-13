import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId :{
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    altName : {
        type : String,
        default : []
    },
    price : {
        type : Number,
        required : true
    },
    labeledPrice : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true,
        default : ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fcosmetic-products&psig=AOvVaw02w470NcMq1hTP6A6WyQR4&ust=1749300324198000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCVkeHp3I0DFQAAAAAdAAAAABAE"]
    },
    stock : {
        type : Number,
        required : true
    }
})

const Product = mongoose.model("products",productSchema);
export default Product;