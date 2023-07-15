require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const verifyJWT = require("./middlewares/verifyJWT")
const connectDB = require("./database/connectDB")
const errorPage = require("./helpers/errorPage")
const corsOptions = require("./config/corsOptions.js")
const authRouter = require("./routes/authRouter")
const clientRouter = require("./routes/clientRouter")
const productRouter = require("./routes/productRouter")
const serviceRouter = require("./routes/serviceRouter")
const { MONGO_URI, PORT } = process.env
const app = express()

connectDB(MONGO_URI)

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }), express.json({ limit: "20mb" }))
app.use(cookieParser())
app.use(helmet())

app.use("/auth", authRouter)
app.use("/client", verifyJWT, clientRouter)
app.use("/product", verifyJWT, productRouter)
app.use("/service", verifyJWT, serviceRouter)
app.use("*", errorPage)

mongoose.connection.on("open", () => {
    app.listen(PORT, () => {
        console.log(`Server Listening at PORT ${PORT}... http://localhost:${PORT}`)
    })
})