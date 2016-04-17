'use strict';

var express = require('express');
var Vehicle = require('../models/vehicle');
var router = express.Router();


function addNewVehicle(req, res) {
    console.log(JSON.stringify(req.body));

    console.log(req.body.name)

    var vehicle = new Vehicle({
        name: req.body.name
        , type: req.body.type
        , status: req.body.status
        , loc: {
            type: "Point"
            , coordinates: [req.body.lng, req.body.lat]
        }
    });
    vehicle.save();

    return res.status(200).json({
        status: "Done"
        , request_body: req.body
    });
}

function returnError(req, res) {
    return res.status(301).json({
        status: "Please use post"
    })
}

router.post('/', addNewVehicle);

router.get('/', returnError);



module.exports = router;