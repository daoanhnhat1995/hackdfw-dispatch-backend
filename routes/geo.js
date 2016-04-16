'use strict';

var express = require('express');
var router = express.Router();

/**
 * @api {get} /geo/updateLoc/ Update location
 * @apiName updateLoc
 * @apiGroup geo
 *
 * @apiParam {Number} uid Unique device id
 * @apiParam {Number} lat Latitude
 * @apiParam {Number} lng Longitude
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
function updateLoc(req, res) {
  return res.status(200).json({status:"Done"});
}

router.post('/updateLocation', updateLoc);
module.exports = router;
