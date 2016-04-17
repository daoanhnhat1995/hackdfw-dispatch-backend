var app = require('./app'),
     http = require('http'),
     url = require('url'),
     amqp = require('amqp'),
     pusher = require('./lib/pusher');


app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});
/*
var rabbitMQ = amqp.createConnection({
    url: 'amqp://_jrNxlgu:OIEyX9nG9Svx4pM0_Ikf3tF1K9ajoVNd@hiding-speedwell-39.bigwig.lshift.net:10427/REBd2RDVR5D1'
});

rabbitMQ.addListener('ready', function () {
    var queue = rabbitMQ.queue('', {
        'exclusive': true
    }, function (q) {

        //get all messages for the rabbitExchange
        q.bind('rabbitExchange', '#');

        // Receive messages
        q.subscribe(function (message) {
            // Print messages to stdout
            console.log("received message");
            console.log(message.data.toString());
        });
    });

});

function loadMessage(){
}
*/

pusher.trigger('dispatch','location',{
  "message":"hello"
});

