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

// TODO: kreator linkova za google mape, kreator linkova za openstreet mape... dodati zoom opciju i za google maps


export default geoUtils;