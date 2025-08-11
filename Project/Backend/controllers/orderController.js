
import Order from "../models/order.js";

export function createOrder(req,res){
    if(req.user == null){
        console.log("[In userController req.user][",req.user,"]")
        res.json({
            massage : "You need to login frist"
        })
        return;
    }

    const body = req.body
    const orderData = {
        orderId : "",
        email : req.user.email,
        name : body.name,
        address : body.address,
        phoneNumber : body.phoneNumber,
        billItems : [],
        total : 0
    }
    Order.find().sort({
        date : -1
    }).limit(1).then((lastBills)=>{

    if(lastBills.length == 0){
        orderData.orderId = "ODR0001";
    }else {
            const lastBill = lastBills[0];
            const lastOrderId = lastBill.orderId;
            const lastOrderNumber = lastOrderId.replace("ODR", "");
            const lastOrderNumberInt = parseInt(lastOrderNumber);
            const newOrderNumberInt = lastOrderNumberInt + 1;
            const newOrderNumberStr = newOrderNumberInt.toString().padStart(4, "0");
            orderData.orderId = "ODR" + newOrderNumberStr;
            console.log(orderData.orderId)
        }
    const newOrder = new Order(orderData);    
    newOrder.save().then(()=>{
        res.json({
            massage : " The Order successfully Saved"
        })
    }).catch((err)=>{
        res.json({
            massage : "the Order is not Saved",err
        })
    })

    }).catch((error)=>{
        res.json({
            massage : "The error relared to creating OrderId",error
        })
    })
}

export function getOrders(req,res){

    if(req.user == null){
        res.json({
            massege : "You need to login frist."
        })
        return;
    }
    if(req.user.role.toLowerCase() == "customer"){
    Order.find({
        email : req.user.email
    }).then((orders)=>{
        res.json(orders)
    }).catch((error)=>{
        res.json({
            massage : "Order not found.",error
        })
    });
    return;
    }

    if(req.user.role.toLowerCase() == "admin"){
        Order.find().then((orders)=>{
            res.json(orders)
        }).catch((error)=>{
            res.json({
                massage : "There is no any orders yet",error
            })
        })
        return;
    }
}