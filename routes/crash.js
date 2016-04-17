'use strict';

var express = require('express');
var Vehicle = require('../models/vehicle');
var router = express.Router();


function addNewVehicle(req, res) {
    console.log(JSON.stringify(req.body));



    return res.status(200).json({
        status: "Done"
        , request_body: req.body
    });
}

router.post('/',addNewVehicle);

module.exports = router;


