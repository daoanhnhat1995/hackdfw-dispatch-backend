var express = require('express');
var router= express.Router();
var witClient = require('./../lib/recast');

function test(req,res){

  witClient
  .sendMessage('Hello')
  .then(function(data){
    return res.status(200).json({data:data});
  })
  .catch(funtion(err){
    return res.status(400).json({err:'fail'});
  });

}

router.post('/test',test);
module.exports = router;


