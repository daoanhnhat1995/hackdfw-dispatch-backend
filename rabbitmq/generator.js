var http = require('http')
    , url = require('url')
    , amqp = require('amqp');

var exchange

function sendMsg(msg) {
    console.log(msg)
    if (exchange) {

        exchange.publish('key.a', msg)

    } else {
        console.log("exchange not around now...")
    }
}

var server = http.createServer(function (req, res) {
    // your normal server code 
    var path = url.parse(req.url).pathname;


    sendMsg(path);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.write('OK', 'utf8');
    res.end();
});




var rabbitMQ = amqp.createConnection({
    url: 'amqp://_jrNxlgu:OIEyX9nG9Svx4pM0_Ikf3tF1K9ajoVNd@hiding-speedwell-39.bigwig.lshift.net:10426/REBd2RDVR5D1'
});

rabbitMQ.addListener('ready', function () {

    // create the exchange if it doesnt exist
    exchange = rabbitMQ.exchange('rabbitExchange', {
        'type': 'fanout'
    })

});


setTimeout(function () {
    sendMsg("HELLO WORLD");
}, 3000);



//server.listen(8081);