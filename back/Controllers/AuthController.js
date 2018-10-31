// AuthController.js
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const rsaKeygen = require('rsa-keygen');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const router = express.Router();

// Models Definition
const User = require('../Models/User');

// Middleware Definition
const VerifyToken = require('../Middleware/VerifyToken');
const Permit = require('../Middleware/Permit');

function validate(body) {
    const errors = [];

    if (body.password !== body.passwordConfirm) {
        errors.push('Mot de passe différent');
    }

    return errors;
}

router.post('/register', function(req, res) {
    /*let errors = validate(req.body);
    if (errors.length !== 0) {
        return res.json({ auth: false, errors: errors });
    }*/

    /* Generate Keys */

    var keys = rsaKeygen.generate();

    /* Hash Password */

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
            company: req.body.company,
            position: req.body.position,
            keys: {
                public_key: keys.public_key,
                private_key: keys.private_key
            },
            signature: req.body.signature
        },
        function(err, user) {
            if (err) {
                if (err.code === 11000) {
                    return res.status(500).send({
                        auth: false,
                        message: 'An account already exists with this email'
                    });
                }
                return res.status(500).send({
                    auth: false,
                    message: 'There was a problem registering the user.'
                });
            }
            // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        }
    );
});

router.get('/me', VerifyToken, Permit(0, 1), function(req, res, next) {
    User.findById(req.user._id, { password: 0, keys: 0 }, function(err, user) {
        if (err)
            return res
                .status(500)
                .send('There was a problem finding the user.');
        if (!user) return res.status(404).send('No user found.');

        res.status(200).send({ success: true, user: user });
    });
});
// add the middleware function
/*router.use(function(user, req, res, next) {
    res.status(200).send(user);
});*/

router.put('/password', VerifyToken, Permit(0, 1, 2), function(req, res) {
    User.findById(req.user._id, {}, function(err, user) {
        if (err)
            return res
                .status(500)
                .send('There was a problem finding the user.');
        if (!user)
            return res
                .status(404)
                .send({ success: false, message: 'No user found.' });
        if (bcrypt.compareSync(req.body.password, user.password)) {
            var hashedPassword = bcrypt.hashSync(req.body.passwordNew, 8);
            User.update(
                { _id: req.user._id },
                { password: hashedPassword },
                function(err, user) {
                    if (err)
                        return res
                            .status(500)
                            .send('There was a problem finding the user.');
                    res.status(200).send({ success: true, message: 'Password changed !' });
                }
            );
        } else {
            return res
                .status(401)
                .send({ success: false, message: 'Password doesnt match' });
        }
    });
});

router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err)
            return res
                .status(500)
                .send({ auth: false, message: 'Error on the API server.' });
        if (!user)
            return res
                .status(404)
                .send({ auth: false, message: 'No user found.' });

        /* Tcheck Password */

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid)
            return res.status(401).send({
                auth: false,
                token: null,
                message: 'Password does not match'
            });

        /* Tcheck Activate */

        if (user.activation === false) {
            return res.status(401).send({
                auth: false,
                token: null,
                message: 'Your account is not activated'
            });
        }

        /* Token Generation */

        var token = jwt.sign({ user }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        /* Auth Success */

        res.status(200).send({ auth: true, token: token });
    });
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;
