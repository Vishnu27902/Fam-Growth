const express = require("express")
const Router = express.Router()

Router.route("/").get().post().patch().delete()

Router.route("/review").post()

Router.route("/rating").post()

module.exports = Router