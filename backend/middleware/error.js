const Errorhandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

    //Wrong monogdb Id error 
    if (err.name === 'CastError') {
        const message = `Resource is not found. Invalid: ${err.path}`;
        err = new Errorhandler(message, 400)
    }

    //Moongoos duplicate key error

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new Errorhandler(message, 400);
    }
    //Wrong JWT error 
    if (err.name === 'JsonWebTokenError') {
        const message = `json web Token is invalid, try again`;
        err = new Errorhandler(message, 400);
    }
    //Jwt Expire error
    if (err.name === 'TokenExpiredError') {
        const message = 'json web Token is Expired , try again';
        err = new Errorhandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}