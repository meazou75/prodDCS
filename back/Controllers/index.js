// Library Importation
const express = require('express');
const router = express.Router();

// Controller Importation
const TaskController = require('./TaskController');
const AuthController = require('./AuthController');
const ProductController = require('./ProductController');
const UserController = require('./UserController');
const ReportController = require('./ReportController');

router.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, GET, POST, DELETE, OPTIONS'
    );
    next();
});

router.use('/task', TaskController);
router.use('/auth', AuthController);
router.use('/product', ProductController);
router.use('/report', ReportController);
router.use('/user', UserController);


module.exports = router;
