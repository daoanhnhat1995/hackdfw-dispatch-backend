var Pusher = require('pusher');
var config = require('./../config').apiKey.pusher;
var pusher = new Pusher(config);

module.exports = pusher;
