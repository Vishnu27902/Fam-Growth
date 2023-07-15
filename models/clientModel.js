const mongoose = require("mongoose")
const Schema = mongoose.Schema
const category = require("../helpers/categoryProvider")

const clientSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    },
    img: {
        data: {
            type: String
        },
        alt: {
            type: String,
            default: "Image"
        }
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dob: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    provider: {
        type: Boolean,
        default: false
    },
    business: {
        name: {
            type: String
        },
        pinCode: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        category: {
            type: String,
            enum: category
        }
    },
    refreshToken: {
        type: String
    }
})

const clientModel = mongoose.model("client", clientSchema)

module.exports = clientModel