'use strict';

var express = require('express');
var router = express.Router();


function addNewVehicle(req,res){
    console.log(JSON.stringify(req.body));
    
    return res.status(200).json({status:"Done", request_body:req.body});
}

function returnError(req, res){
    return res.status(301).json({status:"Please use post"})
}

router.post('/', addNewVehicle);

router.get('/', returnError);


module.exports = router;
