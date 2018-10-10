var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        var token = req.headers.authorization.split(' ')[1];
    } else {
        return res
            .status(403)
            .send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        // if everything good, save to request for use in other routes
        req.user = decoded.user;
        next();
    });
}

module.exports = verifyToken;
