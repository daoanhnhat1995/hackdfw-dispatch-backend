//dependencies
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

// mongoose
mongoose.connect('mongodb://hackuser:hackuser16@ds030829.mlab.com:30829/hackdfw16');

// create instance of express
var app = express();


// define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// Routes declare here


var routes = {
    message: require('./routes/message'),
    vehicle: require('./routes/vehicle'),
    report: require('./routes/report'),
    crash: require('./routes/crash'),
    home: require('./routes/home')
};
app.use(cors());
app.use('/message/', routes.message);
app.use('/vehicle/', routes.vehicle);
app.use('/report/', routes.report);
app.use('/crash/',routes.crash);
app.use('/', routes.home);


// error hndlers
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message
        , error: {}
    }));
});
logger('combined', {
    skip: function (req, res) {
        return res
    }
});
module.exports = app;
