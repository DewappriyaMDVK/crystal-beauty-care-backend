import Product from "../models/product.js";

export async function createProduct(req,res){

    if(req.user == null){
        res.json({
            massege : "You need to login frist"
        })
        return;
    }

    if(req.user.role != "admin"){
        res.json({
            massege : "You are not authorized"
        })
        return;
    }

    const product = new Product(req.body)
        try{
            await product.save()
            res.json({
                massege : "product is saved"
        })
        }catch(error){
            res.json({
                massege : "Product is not saved",error
            })
        }
}

export function getProducts(req,res){
    Product.find().then((products)=>{
        res.json({products})
    }).catch(()=>{
        res.json({massege : "products not found"})
    })
}

export function deleteProduct(req,res){

    if(req.user == null){
        res.json({
            massege : "You need to login frist"
        })
        return;
    }
    if(req.user.role != "admin"){
        res.json({
            massege : "You are not Authorized"
        })
        return;
    }

    Product.findOneAndDelete({
        productId : req.params.productId
    }).then((product)=>{
        res.json({
            massege : "Product deleted successfully. The Deleted product is ",Product
        })
    }).catch(()=>{
        res.json({
            massege : "Product can't be Deleted"
        })
    })
}

export function updateProduct(req,res){
    if(req.user == null){
        res.json({
            massege : "You need to Login frist"
        })
        return;
    }
    if(req.user.role != "admin"){
        res.json({
            massege : "You are not authorized"
        })
        return;
    }
    Product.findOneAndUpdate({
        productId : req.params.productId
    },req.body).then((Product)=>{
        res.json({
            massege : "Product Update successfully"
        })
    }).catch((err)=>{
        res.json({
            massege : "Product is not updated",err
        })
    })
}