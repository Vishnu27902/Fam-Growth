const express = require("express")
const { getProducts, getProduct, editProduct, deleteProduct, addProduct, addReview, deleteReview, orderProduct } = require("../controllers/productController")
const Router = express.Router()

Router.route("/").get(getProducts).post(addProduct)

Router.route("/:id").get(getProduct).patch(editProduct).delete(deleteProduct).post(orderProduct)

Router.route("/:id/review").post(addReview)

Router.route("/:id/review/:reviewID").delete(deleteReview)

Router.route("/rating").post()

module.exports = Router