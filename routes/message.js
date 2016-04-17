'use strict';

var express = require('express');
var router = express.Router();

var witClient = require('./../lib/wit');
var geodecoder = require('./../lib/location-api');
var _ = require('underscore');


/*
 * POST /message
 * @param {Object} text message object from wit.ai
 * @return {entites,locations}
 */
function handleText(req,res,next){
  console.log(JSON.stringify(req.body));

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

function decodeGeo(req,res){
 console.log(JSON.stringify(req.body));
  if(req.body.location.outcomes === undefined){
    return res.status(200).json({data:null});
  }
  var entities = req.body.location.outcomes[0].entities;
  var location = "";
  var keys = _.keys(entities);
  if(entities.location){
    location =  entities.location[0].value + ' , TX';
  
  geodecoder
  .decode(location)
  .then(function(data){
    var geoPoint = {
      longitude: data[0].longitude,
      latitude: data[0].latitude
    };


    return res.status(200).json({location: geoPoint,keys});
  })
  .catch(function(err){

    return res.status(400).json({err: err});

  });
  } else {
    return res.status(200).json(keys);
  }


}

function handleCrash(req,res){
  console.log(req.body);
  return res.status(200).json({body:req.body});
}
router.post('/crash',handleCrash);
router.post('/',handleText,decodeGeo);
module.exports = router;

