"use strict";

var WebSocket = require('ws');

class Vinly {
  constructor() {
    let appId = 'd06da59c-7271-4bb4-821d-2806a9198216'
    let appSecret = '4uAq715GdQqEs81VOM'

    this.wsObj = new WebSocket(`wss://stream.vin.li/api/v1/messages`, null, {
      headers: {
        Authorization: `Basic ${new Buffer(`${appId}:${appSecret}`).toString('base64')}`
      }
    });

    this.wsObj.on('message', this._callbackMessage);
  }

  _callbackMessage(data) {
    console.log(data);
  }
}

module.exports = Vinly
