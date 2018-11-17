const express = require('express');
const User = require('../Models/User');
const bodyParser = require('body-parser');
const router = express.Router();

// Middleware Definition
const VerifyToken = require('../Middleware/VerifyToken');
const Permit = require('../Middleware/Permit');

router.get('/', function(req, res) {
    User.find({}, { password: 0, keys: 0 }, function(err, user) {
        if (err)
            return res
                .status(500)
                .send('There was a problem finding the posts.');
        res.status(200).send({ success: true, user });
    });
});

router.get('/:id', function(req, res) {
    User.findById(req.params.id, {}, function(err, user) {
        if (err)
            return res
                .status(500)
                .send('There was a problem finding the posts.');
        res.status(200).send({ success: true, user });
    })
});

router.delete('/:id', function(req, res) {
    User.remove({ _id: req.params.id }, function(err) {
        if (err)
            return res.status(500).send({
                success: false,
                message: 'There was a problem deleting this user.'
            });
        res.status(200).send({
            success: true,
            message: 'User successfully deleted'
        });
    });
});

router.get('/engineer', function(req, res) {
    User.find({ role: 1 }, { password: 0, keys: 0 }, function(err, user) {
        if (err)
            return res.status(500).send({
                success: false,
                message: 'There was a problem finding this user.'
            });
        res.status(200).send({ success: true, user });
    });
});

router.get('/customer', function(req, res) {
    User.find({ role: 0 }, { password: 0, keys: 0 }, function(err, user) {
        if (err)
            return res.status(500).send({
                success: false,
                message: 'There was a problem finding this user.'
            });
        res.status(200).send({ success: true, user });
    });
});

router.get('/company', VerifyToken, Permit(1, 2), function(req, res) {
    User.find({ role: 0 }, { company: 1, lastName: 1 }, function(err, user) {
        if (err)
            return res.status(500).send({
                success: false,
                message: 'There was a problem finding this user.'
            });
        res.status(200).send({ success: true, companies: user });
    });
});

module.exports = router;
