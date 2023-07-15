const jwt = require("jsonwebtoken")
const errorIndicator = require("../helpers/errorIndicator")
const status = require("../helpers/statusProvider")
const { ACCESS_TOKEN_SECRET } = process.env

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        errorIndicator(res, status.unauthorized, "Auth Header Not Set")
        return
    }
    const accessToken = authHeader.split(" ")[1]
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            errorIndicator(res, status.forbidden, error)
            return
        }
        req.body.username = decoded.username
        next()
    })
}

module.exports = verifyJWT