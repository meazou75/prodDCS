const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/DCS');

var TaskSchema = new mongoose.Schema({
    taskName  : { type: String, required: true },
    taskDetail: { type: String}
});

mongoose.model('Task', TaskSchema);

module.exports = mongoose.model('Task');