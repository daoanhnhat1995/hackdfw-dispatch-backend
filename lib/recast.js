var request = require('superagent');
var token = require('./../config').apiKeys.recast;

exports.parseText = function(payload){
  var promise = new Promise(function(reject,resolve){
    request
    .post('https://api.recast.ai/request')
    .send(payload)
    .set('Authorization', 'Token ' + token)
    .end(function(err, res) {
      if(err){
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

  return promise;
}



