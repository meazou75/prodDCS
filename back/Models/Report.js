const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/DCS');

var ReportSchema = new mongoose.Schema({
    engineer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyLocation: { type: String, required: true },
    timeIn: { type: Date, required: true },
    timeOut: { type: Date, required: true },
    ignoreLunch: { type: Boolean, required: true },
    ignoreLunchTime: { type: Number, required: true },
    ignoreDiner: { type: Boolean, required: true },
    ignoreDinerTime: { type: Number, required: true },
    totalTime: { type: Number, required: true },
    tasks: [
        {
            taskType: { type: String, required: true },
            productBrand: { type: String, required: true },
            productModel: { type: String, required: true },
            quantity: { type: Number, required: true },
            details: [
                {
                    taskName: { type: String, required: true },
                    taskStatus: { type: String, enum: ['Pending', 'Done'] }
                }
            ]
        }
    ],
    status : { type: String, enum : ['Pending','Accepted','Rejected'], default : 'Pending'}
});

mongoose.model('Report', ReportSchema);

module.exports = mongoose.model('Report');
