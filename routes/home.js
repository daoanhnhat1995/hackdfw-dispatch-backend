'use strict';

var express = require('express');
var router = express.Router();



function returnInfo(req, res) {
    return res.status(200).json({
        status: 'we are good homie'
    });
}


router.post('/', returnInfo);

router.get('/', returnInfo);



module.exports = router;