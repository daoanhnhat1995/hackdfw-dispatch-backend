var geocoderProvider = 'google';
var httpAdapter = 'https';


var extra = {
  apiKey: require('./../config').apiKey.googleMap,
  formatter: null
};

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);


/*
 * @param {String} address
 * return {Promise} geocode
 * 
 */
exports.decode = function(address){

  return geocoder.geocode(address);

};
