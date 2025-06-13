
import Oder from "../models/oder.js";

export function createOder(req,res){
    if(req.user == null){
        console.log("[In userController req.user][",req.user,"]")
        res.json({
            massege : "You need to login frist"
        })
        return;
    }

    const body = req.body
    const oderData = {
        oderId : "",
        email : req.user.email,
        name : body.name,
        address : body.address,
        phoneNumber : body.phoneNumber,
        billItems : [],
        total : 0
    }
    Oder.find().sort({
        date : -1
    }).limit(1).then((lastBills)=>{

    if(lastBills.length == 0){
        oderData.oderId = "ODR0001";
    }else {
            const lastBill = lastBills[0];
            const lastOderId = lastBill.oderId;
            const lastOderNumber = lastOderId.replace("ODR", "");
            const lastOderNumberInt = parseInt(lastOderNumber);
            const newOderNumberInt = lastOderNumberInt + 1;
            const newOderNumberStr = newOderNumberInt.toString().padStart(4, "0");
            oderData.oderId = "ODR" + newOderNumberStr;
            console.log(oderData.oderId)
        }
    const newOder = new Oder(oderData);    
    newOder.save().then(()=>{
        res.json({
            massege : " The Oder successfully Saved"
        })
    }).catch((err)=>{
        res.json({
            massege : "the oder is not Saved",err
        })
    })

    }).catch((error)=>{
        res.json({
            massege : "The error relared to creating OderId",error
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
    if(req.user.role == "Customer"){
    Oder.find({
        email : req.user.email
    }).then((orders)=>{
        res.json(orders)
    }).catch((error)=>{
        res.json({
            massege : "Order not found.",error
        })
    });
    return;
    }

    if(req.user.role == "admin"){
        Oder.find().then((orders)=>{
            res.json(orders)
        }).catch((error)=>{
            res.json({
                massege : "There is no any orders yet",error
            })
        })
        return;
    }
}