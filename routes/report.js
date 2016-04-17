'use strict';

var express = require('express');
var Report = require('../models/report');
var router = express.Router();


function addNewReport(req, res) {
    console.log(JSON.stringify(req.body));

    console.log(req.body.name)

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



router.post('/', addNewReport);

router.get('/', getReports);



module.exports = router;