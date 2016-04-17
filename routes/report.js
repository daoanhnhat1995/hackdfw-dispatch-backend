'use strict';

var express = require('express');
var Report = require('../models/report');
var router = express.Router();

/**
 * @api {get} /report get reports
 *
 * @apiSuccessExample Success-Response:
 *     {message: "valid"}
 *     HTTP/1.1 200 OK
 *
 */

/**
 * @api {post} /report Add report
 *
 * @apiParam {String} name Unique report name
 * @apiParam {String} staus status
 * @apiParam {Number} lng Longitude
 * @apiParam {Number} lat Latitude
 * @apiParam {Number} numFire 
 * @apiParam {Number} numPolice
 * @apiParam {Number} numMedic
 * @apiParam {String} transcript
 * @apiParam {String} user
 *
 *
 * @apiSuccessExample Success-Response:
 *     {message: "valid"}
 *     HTTP/1.1 200 OK
 *
 */

/**
 * @api {post} /report/updateReport update report
 *
 * @apiParam {String} name Unique report name
 * @apiParam {String} optional staus status
 * @apiParam {Number} optional lng Longitude
 * @apiParam {Number} optional lat Latitude
 * @apiParam {Number} optional numFire 
 * @apiParam {Number} optional numPolice
 * @apiParam {Number} optional numMedic
 * @apiParam {String} optional transcript
 * @apiParam {String} optional user
 *
 *
 * @apiSuccessExample Success-Response:
 *     {message: "valid"}
 *     HTTP/1.1 200 OK
 *
 */

function addNewReport(req, res) {
    console.log(JSON.stringify(req.body));

    console.log(req.body.name);

    var report = new Report({
        name: req.body.name
        , type: req.body.type
        , status: req.body.status
        , user: req.body.user
        , transcript: req.body.transcript
        , numFire: req.body.numFire
        , numPolice: req.body.numPolice
        , numMedic: req.body.numMedic
        , loc: {
            type: "Point"
            , coordinates: [req.body.lng, req.body.lat]
        }
    });
    report.save();

    return res.status(200).json({
        status: "Done"
        , request_body: report
    });
}

function getReports(req, res) {
    Report.find({}, function (err, reports) {
        return res.status(200).json(reports);
    });
}

function updateReport(req, res) {
    var query = {
        'name': req.body._id
    };
    req.newData = {};

    if (req.body.lng != undefined && req.body.lat != undefined) {
        req.newData.loc = {
            type: "Point"
            , coordinates: [req.body.lng, req.body.lat]
        }
    }
    if (req.body.name != undefined) req.newData.name = req.body.name;
    if (req.body.type != undefined) req.newData.type = req.body.type;
    if (req.body.status != undefined) req.newData.status = req.body.status;
    if (req.body.transcript != undefined) req.newData.transcript = req.body.transcript;
    if (req.body.numFire != undefined) req.newData.numFire = req.body.numFire;
    if (req.body.numPolice != undefined) req.newData.numPolice = req.body.numPolice;
    if (req.body.numMedic != undefined) req.newData.numMedic = req.body.numMedic;
    if (req.body.user != undefined) req.newData.user = req.body.user;

    Report.findOneAndUpdate(query, req.newData, {
        upsert: true
    }, function (err, doc) {
        if (err) return res.send(500, {
            error: err
        });
        return res.status(200).send("succesfully saved");
    });
}



router.post('/', addNewReport);

router.get('/', getReports);

router.post('/updateReport/', updateReport);



module.exports = router;
