'use strict';

var express = require('express');
var Report = require('../models/report');
var router = express.Router();


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
        , request_body: req.body
    });
}

function getReports(req, res) {
    Report.find({}, function (err, reports) {
        return res.status(200).json(reports);
    });
}

function updateReport(req, res) {
    var query = {
        'name': req.body.name
    };
    req.newData = {};

    if (req.body.lng != undefined && req.body.lat != undefined) {
        req.newData.loc = {
            type: "Point"
            , coordinates: [req.body.lng, req.body.lat]
        }
    }
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
