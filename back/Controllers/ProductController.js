const express = require('express');
const Product = require('../Models/Product');
const router = express.Router();

router.get('/', function(req, res) {
    Product.find({}, function(err, products) {
        if (err)
            return res
                .status(500)
                .send('There was a problem finding the posts.');
        res.status(200).send({ success: true, products });
    });
});

router.post('/brand', function(req, res) {
    /* TODO : VALIDATION */
    Product.create(
        {
            productBrand: req.body.productBrand,
            productModel: []
        },
        function(err, product) {
            if (err) {
                return res
                    .status(500)
                    .send('There was a problem adding the brand.');
            }
            res.status(200).send({
                success: true,
                message: 'Brand bien ajouté',
                product
            });
        }
    );
});

router.delete('/brand/:id', function(req, res) {
    Product.remove({ _id: req.params.id }, function(err) {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'There was a probleme deleting this brand.'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Brand successfully deleted'
        });
    });
});

router.put('/brand/:id', function(req, res) {
    Product.findByIdAndUpdate(
        { _id: req.params.id },
        { productBrand: req.body.productBrand },
        { upsert: true, new: true },
        function(err, brand) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'There was a probleme updating this brand.'
                });
            }
            return res.status(200).send({
                success: true,
                message: 'Brand successfully Updated',
                brand
            });
        }
    );
});

router.post('/model', function(req, res) {
    /* TODO : VALIDATION */
    Product.findByIdAndUpdate(
        { _id: req.body._id },
        {
            $push: {
                productModel: { productModelName: req.body.productModelName }
            }
        },
        { safe: true, upsert: true, new: true },
        function(err, product) {
            if (err) {
                return res
                    .status(500)
                    .send('There was a problem finding the posts.');
            }
            return res.status(200).send({
                success: true,
                message: 'Model successfully add',
                product
            });
        }
    );
});

router.put('/model', function(req, res) {
    /* TODO : VALIDATION */
    Product.update(
        { _id: req.body._id, 'productModel._id': req.body._idModel },
        {
            $set: {
                'productModel.$.productModelName': req.body.productModelName
            }
        },
        function(err, product) {
            if (err) {
                return res
                    .status(500)
                    .send('There was a problem finding the posts.');
            }
            res.status(200).send({
                success: true,
                message: 'ModelName bien modifié',
                product
            });
        }
    );
});

router.delete('/model/:id', function(req, res) {
    /* TODO : VALIDATION */
    Product.update(
        { _id: req.body._id },
        {
            $pull: {
                productModel: { _id: req.params.id }
            }
        },
        { safe: true, multi: true },
        function(err, product) {
            if (err) {
                return res
                    .status(500)
                    .send('There was a problem finding the posts.');
            }
            res.status(200).send({
                success: true,
                message: 'ModelName bien modifié',
                product
            });
        }
    );
});

module.exports = router;
