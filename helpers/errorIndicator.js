const errorIndicator = (res, status, error) => {
    const message = error?.message || error
    console.log(`Error Occurred : ${message}`)
    res.status(status).json({
        success: false,
        message: `Error Occurred ${message}`
    })
}

module.exports = errorIndicator