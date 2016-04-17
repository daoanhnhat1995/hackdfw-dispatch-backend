var mongoose = require('mongoose');

var Report = mongoose.model('Reports', {
    name: String
    , type: String
    , loc: Object
    , status: String
    , completed_at: Date
    , user: String
    , transcript: String
    , numFire: Number
    , numPolice: Number
    , numMedic: Number
});

module.export = Report;