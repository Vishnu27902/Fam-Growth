const express = require("express")
const { getClientData, updateClientData, deleteAccount, setDP, checkPassword, changePassword, enableProvider, disableProvider } = require("../controllers/clientController")
const Router = express.Router()

Router.route("/").get(getClientData).patch(updateClientData).delete(deleteAccount)

Router.route("/setDP").patch(setDP)

Router.route("/checkPassword").post(checkPassword)

Router.route("/changePassword").post(changePassword)

Router.route("/enableProvider").get(enableProvider)

Router.route("/disableProvider").get(disableProvider)

module.exports = Router