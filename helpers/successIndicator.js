const successIndicator = (res, status, message, data) => {
    message = message || ""
    console.log(message)
    res.status(status).json({
        success: true,
        message,
        data
    })
}

module.exports = successIndicator