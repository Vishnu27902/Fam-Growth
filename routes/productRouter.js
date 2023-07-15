const express = require("express")
const { getProducts, getProduct, editProduct, deleteProduct, addProduct, addReview, deleteReview } = require("../controllers/productController")
const Router = express.Router()

Router.route("/").get(getProducts).post(addProduct)

Router.route("/:id").get(getProduct).patch(editProduct).delete(deleteProduct)

Router.route("/review").post(addReview)

Router.route("/review/:reviewID").delete(deleteReview)

Router.route("/rating").post()

module.exports = Router