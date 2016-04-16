'use strict';

var express = require('express')
var Vinly = require('../libs/vinly')

var router = express.Router()

let init = (req, res) => {
  let vin = new Vinly();
  return res.status(200).json({status: 'Done'})
};

router.get('/', init)
module.exports = router
