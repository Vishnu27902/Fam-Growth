const express = require("express")
const { login, register, logout, refresh } = require("../controllers/authController")
const Router = express.Router()

Router.route("/login").post(login)

Router.route("/register").post(register)

Router.route("/logout").get(logout)

Router.route("/refresh").get(refresh)

module.exports = Router