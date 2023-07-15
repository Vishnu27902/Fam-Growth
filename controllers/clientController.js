const bcrypt = require("bcrypt")
const errorIndicator = require("../helpers/errorIndicator")
const clientModel = require("../models/clientModel")
const status = require("../helpers/statusProvider")
const successIndicator = require("../helpers/successIndicator")

const getClientData = async (req, res) => {
    const { username } = req.body
    try {
        const userData = await clientModel.findOne({ _id: username }).exec()
        if (!userData) {
            errorIndicator(res, status.unauthorized, "No Such User Exists")
            return
        }
        successIndicator(res, status.success, "Client Data Fetched Successfully", userData)
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const setDP = async (req, res) => {
    const { username, data } = req.body
    try {
        await clientModel.updateOne({ _id: username }, { $set: { "img.data": data, "img.alt": username } })
        successIndicator(res, status.success, "Client's DP set Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const checkPassword = async (req, res) => {
    const { username, password } = req.body
    try {
        const userData = await clientModel.findOne({ _id: username }).exec()
        if (!userData) {
            errorIndicator(res, status.unauthorized, "No Such User Exists")
            return
        }
        const checkPassword = bcrypt.compare(password, userData.password)
        if (!checkPassword) {
            errorIndicator(res, status.unauthorized, "No Such User Exists")
            return
        }
        successIndicator(res, status.success, "Validation Successful")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const changePassword = async (req, res) => {
    let { username, password } = req.body
    try {
        password = await bcrypt.hash(password, 10)
        await clientModel({ _id: username }, { $set: { password } })
        successIndicator(res, status.success, "Password Changed Successfully!")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const updateClientData = async (req, res) => {
    const { username, phoneNumber, address, dob, firstName, lastName } = req.body
    try {
        await clientModel.updateOne({ _id: username }, { $set: { phoneNumber, address, dob, firstName, lastName } })
        successIndicator(res, status.success, "User Updated successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const enableProvider = async (req, res) => {
    const { username } = req.body
    try {
        await clientModel.updateOne({ _id: username }, { $set: { provider: true } })
        successIndicator(res, status.success, "Provider Feature Enabled Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const disableProvider = async (req, res) => {
    const { username } = req.body
    try {
        await clientModel.updateOne({ _id: username }, { $set: { provider: false } })
        successIndicator(res, status.success, "Provider Feature Disabled Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const deleteAccount = async (req, res) => {
    const { username } = req.body
    try {
        await clientModel.deleteOne({ _id: username })
        successIndicator(res, status.success, "Client Deleted Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

module.exports = { getClientData, updateClientData, deleteAccount, setDP, checkPassword, changePassword, enableProvider, disableProvider }