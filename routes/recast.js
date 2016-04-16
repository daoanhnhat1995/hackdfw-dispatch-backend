var express = require('express');
var router= express.Router();
var recastClient = require('./../lib/recast');

function test(req,res){
  console.log(req.body.text);
  var payload = {
    text: req.body.text
  };

  recastClient
    .parseText(payload)
    .then(function(data){
      return res.status(200).json({message:data});
    })
    .catch(function(err){
      return res.status(400).json({message:"Bad request"});
    });
}

router.post('/test',test);
module.exports = router;


