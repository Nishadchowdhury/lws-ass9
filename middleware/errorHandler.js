const errorHandler = (req, res, next) => {
    res.send(err.message)
}

module.exports = errorHandler;