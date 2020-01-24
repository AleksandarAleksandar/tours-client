window.myscript = {};
window.myscript.state = {
  initialized: false
};

// https://leafletjs.com/examples/quick-start/

// window.myscript.map_is_here;

window.my_map = {};

window.myscript.init = function (ll, ll_arr, cb_ll, cb_tt) {
  // REINIT
  console.log('*** leaflet map widget INIT ', ll);
  console.log('geouri za canada bariff je: geo:51.2,-159.6?z=2');
  console.log(ll_arr);
  var coordinates_ready = false;

  /*
  console.log(window.myscript);
  if (window.myscript.map_is_here.mymap) {
    window.myscript.map_is_here.mymap.remove();
  }
  console.log(window.myscript);
  window.myscript.map_is_here.mymap = {};

  console.log(window.myscript);
  
  window.myscript.map_is_here.
  */
  /*
  if (window.myscript.state.initialized === false) {
    window.myscript.state.initialized = true;
    window.my_map = L.map('mapid').setView([51.505, -0.09], 13);
  }
  */


  var dom_parent = document.getElementById('map-dom-parent');
  if (dom_parent) {

    // obrisi sav html od mape (ukoliko uopste postoji)
    while (dom_parent.firstChild) {
      dom_parent.removeChild(dom_parent.firstChild);
    }

    // kreiramo novi cisti html elemenat za mapu
    var dom_map = document.createElement("div");
    dom_parent.appendChild(dom_map);
    dom_map.id = 'lfmapid';
    dom_map.classList.add("leaflet-widget-height");

    // praznimo pormenjivu (ukoliko je postojala)
    window.my_map = {};

    // inicijalizujemo leaflet widget
    /*
    tLng
Represents a geographical point with a certain latitude and longitude.

Usage example
var latlng = L.latLng(50.5, 30.5);
All Leaflet methods that accept LatLng objects also accept them in a simple Array form and simple object form (unless noted otherwise), so these lines are equivalent:

map.panTo([50, 30]);
map.panTo({lon: 30, lat: 50});
map.panTo({lat: 50, lng: 30});
map.panTo(L.latLng(50, 30));
    */
    var lat = ll[0];
    var long = ll[1];

    if (typeof lat === 'number' && typeof long === 'number') {
      coordinates_ready = true;
    }

    if (coordinates_ready === true) {
      window.my_map = L.map('lfmapid').setView([lat, long], 6);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11'
      }).addTo(window.my_map);


      // dodavanje tacaka

      // pocetna tacka
      var marker_start = L.marker([lat, long]).addTo(window.my_map); // dodajemo marker
      marker_start.bindTooltip("Start tour").openTooltip();

      /*
      var greenIcon = L.icon({
        iconUrl: 'leaf-green.png',
        shadowUrl: 'leaf-shadow.png',
  
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
      */

      var coordinates_ready_2;
      ll_arr.forEach(function (item) {
        coordinates_ready_2 = false;
        var ll = cb_ll(item); // pozivamo callback extractor za svaki item iz ll_arr arraya
        var lat = ll[0];
        var long = ll[1];
        console.log('marker', lat, long);
        if (typeof lat === 'number' && typeof long === 'number') {
          coordinates_ready_2 = true;
        }
        if (coordinates_ready_2 === true) {
          // L.marker([lat, long]).addTo(window.my_map);
          var marker = L.marker([lat, long]).addTo(window.my_map); // dodajemo marker

          // dodajemo tooltip na marker
          var tooltip_html = "my tooltip text";
          tooltip_html = cb_tt(item);

          // https://github.com/aratcliffe/Leaflet.tooltip
          /*
          var tt = L.tooltip({
            direction: 'top'
          });
          */

          // marker.bindTooltip(tooltip_html).openTooltip(); // primer bez opcija
          marker.bindTooltip(tooltip_html).openTooltip(); // primer bez opcija
        }
      });

    }
  }

};