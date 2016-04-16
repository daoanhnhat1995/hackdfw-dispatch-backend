'use strict';

var express = require('express');
var router = express.Router();


function sample(req,res){
  return res.status(200).json({status:"Done"});
}


router.get('/',sample);
module.exports = router;
