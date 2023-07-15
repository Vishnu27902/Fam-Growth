const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const errorIndicator = require("../helpers/errorIndicator")
const successIndicator = require("../helpers/successIndicator")
const clientModel = require("../models/clientModel")
const status = require("../helpers/statusProvider")
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

const login = async (req, res) => {
    let { username, password } = req.body
    username = username.toLowerCase()
    try {
        const userData = await clientModel.findOne({ _id: username }).exec()
        if (!userData) {
            errorIndicator(res, status.unauthorized, "No Such User Exists")
            return
        }
        const checkPassword = await bcrypt.compare(password, userData.password)
        if (!checkPassword) {
            errorIndicator(res, status.unauthorized, "Check Your Username and Password")
            return
        }
        const accessToken = jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: "10m" })
        const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
        await clientModel.updateOne({ _id: username }, { refreshToken })
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            expiresIn: 1000 * 60 * 60 * 24 * 7
        })
        successIndicator(res, status.success, "Client Logged In Successfully",{
            username,
            accessToken
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
    const cookies = req.cookies
    if (!cookies?.jwt) {
        successIndicator(res, status.successWithoutContent, "JWT Cookie Not Found")
        return
    }
    const refreshToken = cookies.jwt
    try {
        const clientData = await clientModel.findOne({ refreshToken }).exec()
        if (!clientData) {
            successIndicator(res, status.successWithoutContent, "No Client with Such Refresh Token Exists")
            return
        }
        await clientModel.updateOne({ refreshToken }, { $unset: { refreshToken } })
        res.clearCookie("jwt", { maxAge: 24 * 7 * 1000 * 60 * 60, httpOnly: true })
        successIndicator(res, status.successWithoutContent, "Cookies Cleared Successfully")
    } catch (err) {
        errorIndicator(res, status.failed, err)
    }
}

const refresh = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        errorIndicator(res, status.unauthorized, "Cookie Not Found")
        return
    }
    const refreshToken = cookies.jwt
    const userData = await clientModel.findOne({ refreshToken }).exec()
    if (!userData) {
        errorIndicator(res, status.forbidden, "No Client with Such Refresh Token Exists")
        return
    }
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            errorIndicator(res, status.forbidden, "Access Token Expired")
            return
        }
        const accessToken = jwt.sign({ username: decoded.username }, ACCESS_TOKEN_SECRET, { expiresIn: "10m" })
        successIndicator(res, status.success,"Access Token Refreshed Successfully", {
            username: decoded.username,
            accessToken
        })
    })
}

module.exports = { login, register, logout, refresh }