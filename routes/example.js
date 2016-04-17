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

function handleText(req,res){
  witClient
  .sendMessage("My house is on fire at 800 W sdsd")
  .then(function(res){
    return res.status(200).json({data:res});
  })
  .catch(function(err){
    return res.status(400).json({err:err});
  });

}

function decodeGeo(req,res){
  geodecoder
  .decode('700 W Mitchell Circle, 76013')
  .then(function(data){
    return res.status(200).json({message: data});
  })
  .catch(function(err){
    return res.status(400).json({err: err});
  });
}


router.get('/',sample);
router.post('/sendText',handleText);
router.get('/geolocation',decodeGeo);

module.exports = router;
