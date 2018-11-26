const express = require('express');
const User = require('../Models/User');
const bodyParser = require('body-parser');
const router = express.Router();

// Middleware Definition
const VerifyToken = require('../Middleware/VerifyToken');
const Permit = require('../Middleware/Permit');

const updateUser = async (
    id,
    { firstName, lastName, email, role, activation, company, position }
) => {
    const user = await User.findById(id);

    const errors = {};

    if (!user) {
        throw { code: 404 };
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = role;
    user.activation = activation;
    user.company = company;
    user.position = position;

    const usrErrors = user.validateSync();
    if (usrErrors) {
        Object.keys(usrErrors.errors).forEach(
            k => (errors[k] = usrErrors.errors[k].message)
        );
    }

    if (Object.keys(errors).length > 0) {
        throw { code: 400, errors: errors };
    }

    await user.save();
};

router.get('/', function(req, res) {
    User.find({}, { password: 0, keys: 0 }, function(err, user) {
        if (err)
            return res
                .status(500)
                .send('There was a problem finding the posts.');
        res.status(200).send({ success: true, user });
    });
});

/*router.get('/info/:id', function(req, res) {
    User.findById(req.params.id, {}, function(err, user) {
        if (err)
            return res
                .status(500)
                .send('There was a problem finding the posts.');
        res.status(200).send({ success: true, user });
    });
});*/

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

router.get('/company', VerifyToken, Permit(1), function(req, res) {
    User.find({ role: 0 }, { company: 1, lastName: 1 }, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                success: false,
                message: 'There was a problem finding this user.'
            });
        }
        res.status(200).send({ success: true, companies: user });
    });
});

router.put('/:id', VerifyToken, Permit(2), (req, res) =>
    updateUser(req.params.id, req.body)
        .then(() => res.status(200).send({ success: true }))
        .catch(err => console.log(err))
);

module.exports = router;
