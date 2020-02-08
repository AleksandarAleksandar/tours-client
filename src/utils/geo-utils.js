import { Provider } from "react-redux";

let geoUtils = {};

geoUtils.extractL = (geouri) => {
  // extract [latitude, longitude] from Geo URI
  // geo:37.786971,-122.399677
  // geo:36.2556,-115.3242?z=11
  let ll = [];
  let words_1 = geouri.split(':'); // cese string tamo gde je :
  if (words_1[1]) {
    /*
    let words_2 = words_1[1].split('?'); // sece string tamo gde je ?
    let words_3 = words_2[0].split(',');
    if (words_3[1]) {
      ll = [words_3[0], words_3[1]]; // two numerical values represent latitude and longitude
    }
    */
    let words_2 = words_1[1].split(','); // sece string tamo gde je ,
    let words_3 = words_2[1].split(','); // sece string tamo gde je ,
    if (!words_3[1]) {
      words_3 = words_2[1].split('?'); // sece string tamo gde je ?
      if (!words_3[1]) {
        words_3 = words_2[1].split(';'); // sece string tamo gde je ;
      }
    }
    ll = [words_2[0], words_3[0]]; // two numerical values represent latitude and longitude
  }
  return ll;
}

geoUtils.createGooleMapsURL = (ll) => {
  // https://www.google.com/maps/place/35%C2%B007'41.0%22N+106%C2%B032'08.0%22W/@35.126517,-106.535131,17z
  // https://maps.google.com/?t=k&q=18.3,-64.8
  // https://www.google.com/maps/@?api=1&map_action=map&parameters
  // https://www.google.com/maps/search/?api=1&query=centurylink+field
  // let googleMapURL = "https://www.google.com/maps/place/" + ll[o] + '/' + ll[1];
  // https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393&query_place_id=ChIJKxjxuaNqkFQR3CK6O1HNNqY
  if (ll.length < 2) {
    ll = [null, null]
  }
  let url = "https://www.google.com/maps/search/?api=1&query=" + ll[0] + ',' + ll[1];

  return url;
}

geoUtils.createOpenStreetMapURL = (ll, zoom) => {
  // https://www.openstreetmap.org/#map=15/45.2573/19.8309
  if (ll.length < 2) {
    ll = [null, null]
  }
  if (typeof zoom !== 'number') {
    zoom = 10;
  }
  let url = "https://www.openstreetmap.org/#map=" + zoom + '/ ' + ll[0] + '/' + ll[1];
  return url;
}

geoUtils.getDistance = (ll, llb) => {
  let lat1 = ll[0];
  let lon1 = ll[1];
  let lat2 = llb[0];
  let lon2 = llb[1];
  console.log('GEO LAT LONG', lat1, lon1, lat2, lon2);

  function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  let km = distance(lat1, lon1, lat2, lon2, 'K');
  return km;
}

geoUtils.getMyLocation = (cb) => {
  if ("geolocation" in window.navigator) {
    /* geolocation is available */
    // console.log('geoUtils.getMyLocation() ')
    window.navigator.geolocation.getCurrentPosition(function (position) {
      console.log('location data from browser geolocation: ', position, position.coords.latitude, position.coords.longitude);
      /*
coords: GeolocationCoordinates
  latitude: 51.118372
  longitude: 6.8915451
  altitude: null
  accuracy: 25
  altitudeAccuracy: null
  heading: null
  speed: null
__proto__: GeolocationCoordinates
timestamp: 1581155134049
      */
      if (typeof cb === 'function') {
        cb(position);
      }
    });
  } else {
    /* geolocation IS NOT available */
    console.log('Browser not support geolocation.');
    if (typeof cb === 'function') {
      cb(false);
    }
  }
}

// TODO: kreator linkova za google mape, kreator linkova za openstreet mape... dodati zoom opciju i za google maps

export default geoUtils;
