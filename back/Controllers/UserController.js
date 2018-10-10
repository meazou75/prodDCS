const express = require('express');
const User = require('../Models/User');
const bodyParser = require('body-parser');
const router = express.Router();

router.get('/', function(req, res) {
    User.find({position : 'Manager'}, function(err, user) {
        if (err)
            return res
                .status(500)
                .send('There was a problem finding the posts.');
        res.status(200).send({ success: true, user });
    });
});

module.exports = router;
