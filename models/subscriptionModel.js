const mongoose = require("mongoose")
const Schema = mongoose.Schema

const subscriptionSchema = new Schema({
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
    duration: {
        type: String,
        default: "1 Month"
    },
    price: {
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
    owner: {
        type: String,
        required: true
    },
    subscribedAt: {
        type: String,
        required: true
    }
})

const subscriptionModel = new mongoose.model("subscription", subscriptionSchema)

module.exports = subscriptionModel