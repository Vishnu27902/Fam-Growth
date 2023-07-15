const successIndicator = (res, status, message, data) => {
    message = message || ""
    console.log(`Error Occurred : ${message}`)
    res.status(status).json({
        success: true,
        message: `Error Occurred ${message}`,
        data
    })
}

module.exports = successIndicator