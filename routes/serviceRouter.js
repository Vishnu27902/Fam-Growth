const express = require("express")
const { getServices, getService, addService, editService, deleteService, addReview, deleteReview, subscribeProduct } = require("../controllers/serviceController")
const Router = express.Router()

Router.route("/").get(getServices).post(addService)

Router.route("/:id").get(getService).patch(editService).delete(deleteService).post(subscribeProduct)

Router.route("/:id/review").post(addReview)

Router.route("/:id/review/:reviewID").delete(deleteReview)

Router.route("/rating").post()

module.exports = Router