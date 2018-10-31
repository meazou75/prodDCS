const express = require('express');
const Report = require('../Models/Report');
const User = require('../Models/User');
const router = express.Router();

// Middleware Definition
const VerifyToken = require('../Middleware/VerifyToken');
const Permit = require('../Middleware/Permit');
const pdfGen = require('../Middleware/pdfGeneration');

router.get('/', function(req, res) {
    Report.find({}, function(err, reports) {
        if (err)
            return res
                .status(500)
                .send('There was a problem finding the posts.');
        res.status(200).send({ success: true, reports });
    })
        .populate('engineer', '-keys -password -activation -__v -role')
        .populate('customer', '-keys -password -activation -__v -role');
});

router.get('/download/:id', function(req, res) {
    var file = `public/reports/${req.params.id}.pdf`;
    res.download(file); // Set disposition and send it.
});

router.post('/create', VerifyToken, Permit(1, 2), function(req, res) {
    /* TODO : VALIDATION */

    this.userData;
    this.companyData;

    User.findById({ _id: req.user._id }, {keys: 0} , function(err, user) {
        if (err) {
            console.log(err);
            return res
                .status(500)
                .send('There was a problem generating the report.');
        }
        this.userData = user;

        User.findById({ _id: req.body.companyId }, {keys: 0} , function(err, company) {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .send('There was a problem generating the report.');
            }
            this.companyData = company;

            console.log(this.userData);

            console.log(this.companyData);

            console.log("Now Create the report");

            Report.create(
                {
                    engineer: req.user._id,
                    customer: req.body.companyId,
                    companyLocation: req.body.companyLocation,
                    timeIn: req.body.timeIn,
                    timeOut: req.body.timeOut,
                    ignoreLunch: req.body.ignoreLunch,
                    ignoreLunchTime: req.body.ignoreLunchTime,
                    ignoreDiner: req.body.ignoreDiner,
                    ignoreDinerTime: req.body.ignoreDinerTime,
                    totalTime: req.body.totalTime,
                    tasks: req.body.taskInput
                },
                function(err, report) {
                    if (err) {
                        console.log(err);
                        return res
                            .status(500)
                            .send('There was a problem generating the report.');
                    }
                    pdfGen(report, this.companyData, this.userData);
                    res.status(200).send({
                        success: true,
                        message: 'Report bien ajouté',
                        report
                    });
                }
            );

        });
    });
});

module.exports = router;
