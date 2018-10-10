const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/DCS');

var ProductSchema = new mongoose.Schema({
    productBrand: { type: String, required: true },
    productModel: [
        {
            productModelName: { type: String, required: true }
        }
    ]
});

mongoose.model('Product', ProductSchema);

module.exports = mongoose.model('Product');
