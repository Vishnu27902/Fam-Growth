const bcrypt = require("bcrypt")
const errorIndicator = require("../helpers/errorIndicator")
const successIndicator = require("../helpers/successIndicator")
const clientModel = require("../models/clientModel")
const status = require("../helpers/statusProvider")

const login = async (req, res) => {
    let { username, password } = req.body
    username = username.toLowerCase()
    try {
        const userData = await clientModel.findOne({ _id: username }).exec()
        if (!userData) {
            errorIndicator(res, status.unauthorized, "No Such User Exists")
            return
        }
        const checkPassword = bcrypt.compare(password, userData.password)
        if (!checkPassword) {
            errorIndicator(res, status.unauthorized, "Check Your Username and Password")
            return
        }
        successIndicator(res, status.success, {
            username
        })
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const register = async (req, res) => {
    let { firstName, lastName, dob, address, password, phoneNumber, email } = req.body
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()
    email = email.toLowerCase()
    try {
        password = await bcrypt.hash(password, 10)
        const client = {
            firstName,
            lastName,
            dob,
            address,
            phoneNumber,
            password,
            _id: email
        }
        await clientModel.create(client)
        successIndicator(res, status.success, "New Client Account Created Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const logout = async (req, res) => {
    req.session.destroy()
    res.status(201).end()
}

const refresh = async (req, res) => {

}

module.exports = { login, register, logout, refresh }