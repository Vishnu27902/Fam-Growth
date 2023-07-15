const mongoose = require("mongoose")
const Schema = mongoose.Schema

const category = ["Mobile & Electronic Devices", "Fashion & Beauty", "Groceries & Pet Supply", "Health & Personal Care", "Home, Furniture & Appliances", "Music, Video and Gaming", "Books and Education", "Toys, Children and Baby", "Automotive", "Office & Professional", "Sports Outdoor & Travel", "Arts", "Scientific Equipments", "Transport & Logistics", "Delivery Service", "Software Development", "Consultancy Service", "Healthcare", "Defense & Security", "Law & Order", "Fishery", "Marketing & Advertisement", "Cyber Security and Social Engineering"]

const clientSchema = new Schema({
    firstName: {
        type: [String, "Client's First Name must be Entered"],
        required: true
    },
    lastName: {
        type: [String, "Client's Last Name must be Entered"],
        required: true
    },
    _id: {
        type: [String, "Client's Email must be Entered"],
        required: true
    },
    img: {
        data: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: "Image"
        }
    },
    phoneNumber: {
        type: [Number, "Client's Contact Details must be Entered"],
        required: true
    },
    address: {
        type: [String, "Client's Address must be Entered"],
        required: true
    },
    dob: {
        type: [String, "Client's DOB must be Entered"],
        required: true
    },
    password: {
        type: [String, "Client's Password must be Entered"],
        required: true
    },
    provider: {
        type: Boolean,
        default: false
    },
    business: {
        name: {
            type: [String, "Business Name must be Entered"],
            required: true
        },
        pinCode: {
            type: [String, "Pin code must be Entered"],
            required: true
        },
        state: {
            type: [String, "State must be Entered"],
            required: true
        },
        country: {
            type: [String, "Country must be Entered"],
            required: true
        },
        category: {
            type: String,
            enum: category,
            required: true
        }
    },
    refreshToken: {
        type: String
    }
})

const clientModel = mongoose.model("client", clientSchema)

module.exports = clientModel