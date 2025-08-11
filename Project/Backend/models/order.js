import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    phoneNumber: {
        type: String,
        required: true
    },
    billItems: {
        type: [
            {
                productId: String,
                productName: String,
                image: String,
                quantity: Number,
                price: Number,
            }
        ],
        required: true
    },
    total: {
        type: String,
        required: true
    }
});

const Order = new mongoose .model("orders",orderSchema);
export default Order;