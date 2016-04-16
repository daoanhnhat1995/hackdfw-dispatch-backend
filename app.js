//dependencies
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

// mongoose
//mongoose.connect('mongodb://localhost/client-app');

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
  example: require('./routes/example')
};

app.use('/example/', routes.example);


// error hndlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
});
logger('combined', {
  skip: function (req, res) { return res }
});
module.exports = app;
