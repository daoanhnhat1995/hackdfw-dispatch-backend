'use strict';

var express = require('express');
var Vehicle = require('../models/vehicle');
var router = express.Router();


function addNewVehicle(req, res) {
    console.log(JSON.stringify(req.body));

    console.log(req.body.name);

    var vehicle = new Vehicle({
        name: req.body.name
        , type: req.body.type
        , status: req.body.status
        , speed: req.body.speed
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

function getVehicles(req, res) {
    Vehicle.find({}, function (err, vehicles) {
        return res.status(200).json(vehicles);
});



function updateLocation(req, res) {
    var query = {
        'name': req.body.name
    };
    req.newData = {};
    req.newData.loc = {
        type: "Point"
        , coordinates: [req.body.lng, req.body.lat]
    }
    Vehicle.findOneAndUpdate(query, req.newData, {
        upsert: true
    }, function (err, doc) {
        if (err) return res.send(500, {
            error: err
        });
        return res.status(200).send("succesfully saved");
    });
}

router.post('/', addNewVehicle);

router.post('/updateLocation/', updateLocation);

router.get('/', getVehicles);



module.exports = router;
