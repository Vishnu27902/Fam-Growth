const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    orderAt: {
        type: String,
        required: true
    }
})

const orderModel = new mongoose.model("order", orderSchema)

module.exports = orderModel
