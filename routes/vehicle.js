'use strict';

var express = require('express');
var Vehicle = require('../models/vehicle');
var router = express.Router();


/**
 * @api {get} /vehicle get vehicles
 *
 * @apiSuccessExample Success-Response:
 *     {message: "valid"}
 *     HTTP/1.1 200 OK
 *
 */

/**
 * @api {post} /vehicle Add vehicle
 *
 * @apiParam {String} name Unique report name
 * @apiParam {String} staus status
 * @apiParam {Number} lng Longitude
 * @apiParam {Number} lat Latitude
 * @apiParam {String} type
 * @apiParam {String} speed
 *
 *
 * @apiSuccessExample Success-Response:
 *     {message: "valid"}
 *     HTTP/1.1 200 OK
 *
 */

/**
 * @api {post} /vehicle/updateVehicle update vehicle
 *
 * @apiParam {String} name Unique report name
 * @apiParam {String} staus status
 * @apiParam {Number} lng Longitude
 * @apiParam {Number} lat Latitude
 * @apiParam {String} type
 * @apiParam {String} speed
 *
 *
 * @apiSuccessExample Success-Response:
 *     {message: "valid"}
 *     HTTP/1.1 200 OK
 *
 */

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
        , request_body: vehicle
    });
}

function getVehicles(req, res) {
    Vehicle.find({}, function (err, vehicles) {
        return res.status(200).json(vehicles);
    });
}

function updateLocation(req, res) {
    var query = {
        'name': req.body._id
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