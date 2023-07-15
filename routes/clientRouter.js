const express = require("express")
const { getClientData, updateClientData, deleteAccount, setDP, checkPassword, changePassword } = require("../controllers/clientController")
const Router = express.Router()

Router.route("/").get(getClientData).patch(updateClientData).delete(deleteAccount)

Router.route("/setDP").patch(setDP)

Router.route("/checkPassword").post(checkPassword)

Router.route("/changePassword").post(changePassword)

module.exports = Router