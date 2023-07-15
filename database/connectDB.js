const mongoose = require("mongoose")

const connectDB = async (connectionString) => {
    try {
        await mongoose.connect(connectionString)
        console.log("Mongo DB Connection Established Successfully")
    } catch (err) {
        console.log("Database Connection Failed")
    }
}

module.exports = connectDB