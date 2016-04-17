var express = require('express');
var router = express.Router();

var Vehicle = {
  status: {
    active: true
  }
}


function setVehicleStatus(req,res){
  Vehicle.status.active = fasle;
  return res.status(200).json({object:Vehicle.status});

}

router.put('/editStatus',setVehicleStatus);
