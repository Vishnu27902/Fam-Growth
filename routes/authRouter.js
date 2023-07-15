const express = require("express")
const { login, register, logout, refresh } = require("../controllers/authController")
const Router = express.Router()

Router.route("/login").post(login)

Router.route("/register").post(register)

Router.route("/logout").post(logout)

Router.route("/refresh").post(refresh)

Router.route("/disable").get()

module.exports = Router