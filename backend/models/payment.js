const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    //     required: true,
    // },
    paymentId: {type: String},
    amount: {
        type: Number,
    },
    currency: {type: String},
    status: {type: String},
    orderId: {type: String},
    method: {type: String},



});

module.exports = mongoose.model("Payment", paymentSchema);
