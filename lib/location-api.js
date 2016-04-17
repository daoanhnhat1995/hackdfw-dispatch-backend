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
exports.decodeGeo = function(address){
  var result;
  geocoder
  .geocode(address)
  .then(function(data){
    result = {
      longitude: data[0].longitude,
      latitude: data[0].latitude
    };
    return result;

  })
  .catch(function(err){
    return err;
  });
};
