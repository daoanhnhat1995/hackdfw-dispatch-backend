'use strict';

var express = require('express');
var router = express.Router();
var witClient = require('./../lib/wit');
var geodecoder = require('./../lib/location-api');

function sample(req, res) {
    return res.status(200).json({
        status: "Done"
    });
}

function handleText(req,res,next){

  witClient
  .sendMessage(req.body.message)
  .then(function(res){
    req.body.location = res;
    next();
  })
  .catch(function(err){
    // Dont know why it gives err
    req.body.location = err;
    next();
  });

}

function decodeGeo(){

  var location = req.body.location.outcomes[0].entities.location[0].value + ' , TX';
  geodecoder
  .decode(location)
  .then(function(data){
    var geoPoint = {
      longitude: data[0].longitude,
      latitude: data[0].latitude
    };

    return res.status(200).json({location: geoPoint});
  })
  .catch(function(err){

    return res.status(200).json({err: err});

  });


  /*
   * @param {Object} location geo data grom geodecoder 
   * @return {
   *   {long,lat}
   * }
   */

  function parseGeo(rawdata){
    var location = rawdata.location[0];
    return {
      longitude:location.longitude,
      latitude: location.latitude
    }
  }
}


router.get('/',sample);
router.post('/sendMessage',handleText,decodeGeo);
router.post('/sendText',handleText);
router.get('/geolocation',decodeGeo);

module.exports = router;
