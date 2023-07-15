const mongoose = require("mongoose")
const Schema = mongoose.Schema

const serviceSchema = new Schema({
    name: {
        type: [String, "Service's Name must be Entered"],
        required: true
    },
    description: {
        type: [String, "Service's Description must be Entered"],
        required: true
    },
    thumbnail: {
        type: [String, "Service's Thumbnail must be Entered"],
        required: true
    },
    rating: {
        type: Number,
        min: [1, "Rating should not less than one."],
        max: [5, "Rating can't exceed five."],
        default: 1
    },
    reviews: [{
        reviewID: {
            type: mongoose.Schema.ObjectId,
            required: [true, "Review ID is mandatory"],
            unique: [true, "Review ID should be Unique"]
        },
        clientID: {
            type: [String, "Client ID is mandatory "],
            required: true
        },
        comment: {
            type: [String, "Comment is mandatory"],
            required: true
        },
        commentedAt: {
            type: String,
            required: true
        }
    }],
    stock: {
        type: [Number, "Stock Count must be Entered"],
        required: true
    },
    sold: {
        type: [Number, "Sold Count must be Entered"],
        default: 0
    }
})

const serviceModel = mongoose.model("service", serviceSchema)

module.exports = serviceModel