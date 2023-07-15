const express = require("express")
const { getServices, getService, addService, editService, deleteService, addReview, deleteReview } = require("../controllers/serviceController")
const Router = express.Router()

Router.route("/").get(getServices).post(addService)

Router.route("/:id").get(getService).patch(editService).delete(deleteService)

Router.route("/review").post(addReview)

Router.route("/review/:reviewID").delete(deleteReview)

Router.route("/rating").post()

module.exports = Router