import Product from "../models/product.js";

export async function createProduct(req, res) {
  console.log("Request body:", req.body); 


  if (!req.user) {
    return res.status(401).json({ message: "You need to login first" });
  }

  if (req.user.role.toLowerCase() !== "admin") {
    return res.status(403).json({ message: "You are not authorized" });
  }

  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      message: "Product is saved",
      product,
    });
  } catch (error) {
    console.error("Save failed:", error.message);
    res.status(500).json({
      message: "Product is not saved",
      error: error.message,
    });
  }
}

export function getProducts(req,res){
    Product.find().then((products)=>{
        res.json({products})
    }).catch(()=>{
        res.json({massage : "products not found"})
    })
}

export function deleteProduct(req,res){

    if(req.user == null){
        res.json({
            massage : "You need to login frist"
        })
        return;
    }
    if(req.user.role.toLowerCase() !== "admin"){
        res.json({
            massage : "You are not Authorized"
        })
        return;
    }

    Product.findOneAndDelete({
        productId : req.params.productId
    }).then((product)=>{
        res.json({
            massage : "Product deleted successfully. The Deleted product is ",Product
        })
    }).catch(()=>{
        res.json({
            massage : "Product can't be Deleted"
        })
    })
}

export function updateProduct(req,res){
    if(req.user == null){
        res.json({
            massage : "You need to Login frist"
        })
        return;
    }
    if(req.user.role.toLowerCase() !== "admin"){
        res.json({
            massage : "You are not authorized"
        })
        return;
    }
    Product.findOneAndUpdate({
        productId : req.params.productId
    },req.body).then((Product)=>{
        res.json({
            massage : "Product is Updated successfully"
        })
    }).catch((err)=>{
        res.json({
            massage : "Product is not updated",err
        })
    })
}