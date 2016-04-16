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
 * @apiParam {Number} speed Speed of vehicle
 *
 *
 * @apiSuccessExample Success-Response:
 *     {message: "valid"}
 *     HTTP/1.1 200 OK
 *
 */
function updateLoc(req, res) {
  let uid   = req.body['uid'],
      lat   = req.body['lat'],
      lng   = req.body['lng'],
      speed = req.body['speed']

  if(uid == undefined || lat == undefined || lng == undefined || speed == undefined) {
    return res.status(422).json({ message: 'invalid' })
  }

  return res.status(200).json({ message: 'valid' })
}

router.post('/updateLocation', updateLoc);
module.exports = router;
