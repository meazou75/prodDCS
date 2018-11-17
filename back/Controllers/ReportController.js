const express = require('express');
const Report = require('../Models/Report');
const User = require('../Models/User');
const router = express.Router();

// Middleware Definition
const VerifyToken = require('../Middleware/VerifyToken');
const Permit = require('../Middleware/Permit');
const { pdfGenPending } = require('../Middleware/pdfGeneration');

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

router.get('/me', VerifyToken, Permit(0, 1), function(req, res) {
    if (req.user.role === 0) {
        Report.find({ customer: req.user._id }, function(err, reports) {
            if (err) return res.status(500).send({ success: false });
            return res.status(200).send({ success: true, reports });
        })
            .populate('engineer', '-keys -password -activation -__v -role')
            .populate('customer', '-keys -password -activation -__v -role');
    }
    if (req.user.role === 1) {
        Report.find({ engineer: req.user._id }, function(err, reports) {
            if (err) return res.status(500).send({ success: false });
            return res.status(200).send({ success: true, reports });
        })
            .populate('engineer', '-keys -password -activation -__v -role')
            .populate('customer', '-keys -password -activation -__v -role');
    }
});

router.get('/download/:id', function(req, res) {
    var file = `public/reports/${req.params.id}.pdf`;
    res.download(file); // Set disposition and send it.
});

router.put('/status/:id', VerifyToken, Permit(0, 1, 2), function(req, res) {
    Report.findOneAndUpdate(
        { _id: req.params.id },
        { status: req.body.status },
        function(err, report) {
            if (err) {
                return res.status(500).send({ success: false });
            }
            if (!report) {
                return res.status(404).send({ success: false });
            }
            return res.status(200).send({ success: true, report });
        }
    );
});

router.post('/create', VerifyToken, Permit(1, 2), function(req, res) {
    this.userData;
    this.companyData;

    User.findById({ _id: req.user._id }, { keys: 0 }, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send({ success: false });
        }
        this.userData = user;

        User.findById({ _id: req.body.companyId }, { keys: 0 }, function(
            err,
            company
        ) {
            if (err) {
                console.log(err);
                return res.status(500).send({ success: false });
            }
            this.companyData = company;

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
                        return res
                            .status(500)
                            .send('There was a problem generating the report.');
                    }
                    pdfGenPending(report, this.companyData, this.userData);
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
