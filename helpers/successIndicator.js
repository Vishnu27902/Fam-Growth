const successIndicator = (res, message, data) => {
    console.log(`Error Occurred : ${message}`)
    res.status(400).json({
        success: true,
        message: `Error Occurred ${message}`,
        data
    })
}

module.exports = successIndicator