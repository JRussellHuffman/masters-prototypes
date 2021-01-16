function initialize() {
  var bryantPark = new google.maps.LatLng(37.869260, -122.254811);
  var atlanta = new google.maps.LatLng(33.754482, -84.372547);
  var panoramaOptions = {
    position: atlanta,
    pov: {
      heading: 165,
      pitch: 0
    },
    zoom: 1
  };
  var myPano = new google.maps.StreetViewPanorama(
      document.getElementById('map-canvas'),
      panoramaOptions);
  myPano.setVisible(true);
}

$(document).ready(function() {
  console.log("from google streetview");
  atlanta = new google.maps.LatLng(33.750441, -84.389593);
});

google.maps.event.addDomListener(window, 'load', initialize);