const express = require("express")
const { getClientData, updateClientData, deleteAccount, setDP, checkPassword, changePassword, enableProvider, disableProvider, getOrders, getSubscriptions } = require("../controllers/clientController")
const Router = express.Router()

Router.route("/").get(getClientData).patch(updateClientData).delete(deleteAccount)

Router.route("/setDP").patch(setDP)

Router.route("/checkPassword").post(checkPassword)

Router.route("/changePassword").post(changePassword)

Router.route("/enableProvider").post(enableProvider)

Router.route("/disableProvider").get(disableProvider)

Router.route("/orders").get(getOrders)

Router.route("/subscriptions").get(getSubscriptions)

module.exports = Router