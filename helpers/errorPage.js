const errorPage = (req, res) => {
    res.status(404).send("<h1>Error 404, Resource Not Found Exception</h1>")
}

module.exports = errorPage