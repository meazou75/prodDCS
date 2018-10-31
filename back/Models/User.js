const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/DCS');

var UserSchema = new mongoose.Schema({
    firstName  : { type: String, required: true },
    lastName   : { type: String, required: true },
    email      : { type: String, required: true, unique: true },
    password   : { type: String, required: true },
    role       : { type: Number, enum: [0, 1, 2]},
    activation : { type: Boolean,default: true, },
    company    : { type: String, required: function() { return this.role === 0; }},
    position   : { type: String, required: true },
    keys       : {
        public_key  : { type: Buffer, required: true},
        private_key : { type: Buffer, required: true}
    },
    signature  : { type: String, required: true}
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');