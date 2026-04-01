const express = require("express");
const router = express.Router();
const razorpay = require("razorpay");
const paymentModel = require("../models/payment");



// razorpay instance (Admin Credentials)
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})


// create order
router.post('/create-order', async(req, res)=>{

    const options={
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: `order_${Date.now()}`,
        payment_capture: 1,
    }

    try {
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Order not created", error: error.message });
    }
})




// Fetch Payment Details
router.post('/fetch-payment', async(req, res)=>{

    const { paymentId, orderId } = req.body;

    if (!paymentId) {
        return res.status(400).json({ success: false, message: "paymentId is required" });
    }

    try {
        const payment = await razorpayInstance.payments.fetch(paymentId);
        if(!payment){
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        const paymentDetails = await paymentModel.create({
            // userId: req.user._id,
            paymentId: payment.id,
            amount: payment.amount / 100,
            currency: payment.currency,
            status: payment.status === "captured" ? "completed" : "pending",
            orderId: payment.order_id || orderId || "Not Found",
            method: payment.method || "Not Found",
            // userOrderID: orderID
        })

        res.status(200).json({ success: true, paymentDetails });
    } catch (error) {
        res.status(500).json({ success: false, message: "Payment not found", error: error.message });
    }
})

module.exports = router;
