var Wit = require('node-wit').Wit;
var apiKeys = require('./../config').apiKey;


var actions = {
    say: function(sessionId, context, message, cb) {
      console.log(message);
      cb();
    },
    merge: function(sessionId, context, entities, message, cb) {
      cb(context);
    },
    error: function (sessionId, context, error) {
      console.log(error.message);
    }
 };

 var client = new Wit(apiKeys.wit,actions);

 exports.sendMessage = function(message){

   var promise = new Promise(function(reject,resolve){

     client.message(message, function(error,data){
       if(error){
         reject(error);
       } else {
         resolve(data);
       }
     });

   });
   return promise;
}

