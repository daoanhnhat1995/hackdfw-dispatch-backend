var app = require('./app'),
     http = require('http'),
     url = require('url'),
     amqp = require('amqp'),
     locationApi = require('./lib/location-api');


app.set('port', process.env.PORT || 3001);

var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});

var rabbitMQ = amqp.createConnection({
    url: 'amqp://_jrNxlgu:OIEyX9nG9Svx4pM0_Ikf3tF1K9ajoVNd@hiding-speedwell-39.bigwig.lshift.net:10427/REBd2RDVR5D1'
});


var exchange;

rabbitMQ.addListener('ready', function () {
    // create the exchange if it doesnt exist
    exchange = rabbitMQ.exchange('rabbitExchange', {
        'type': 'fanout'
    });
    console.log(getMessage());
    sendMessage(JSON.stringify(getMessage()));


});

function getMessage(){
  var message = locationApi.decodeGeo('700 W Mitchell Cir');

  return message;

}

function sendMessage(msg){
    console.log(msg);
    if (exchange) {

        exchange.publish('key.a', msg);

    } else {
        console.log("exchange not around now...");
    }

}



