var mongoose = require('mongoose');

//mongo db data models
var Vehicle = mongoose.model('Vehicles', {
    name: String
    , type: String
    , loc: Object
    , status: String
    , speed: Number
});

module.exports = Vehicle;