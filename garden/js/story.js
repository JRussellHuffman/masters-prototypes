//story variables based on if a dialogue has happened yet. starts false
var church = true;
var southHelped = 0;
var northHelped = 0;
var peachtreeCreek = false;
var slocum = false;

$(document).ready(function() {
    //mapbox setup 
    L.mapbox.accessToken = 'pk.eyJ1IjoianJ1c3NlbGxodWZmbWFuIiwiYSI6Iks3dlBmdTQifQ.zUvtgRAtyQlMEaMpTaVVIQ#14/33.7633/-84.4043';
    // Replace 'examples.map-i87786ca' with your map id.
    var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/jrussellhuffman.log1d1n1/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
        attribution: 'Designed by: <a href="http://www.jrussellhuffman.com" target="_blank">J. Russell Huffman</a>'
    });

    //load the map, set the start point
    var map = L.map('map')
        .addLayer(mapboxTiles)
        .setView([33.750441, -84.389593], 12);

    var liveIcon = L.icon({
        iconUrl: 'images/marker-iconRed.png',
        iconAnchor:   [13, 40],
        popupAnchor:  [0, -33]
    });
    var marker0 = L.marker([33.750441, -84.389593], {icon: liveIcon}).addTo(map);
        marker0.bindPopup("status is: good");
    var marker1 = L.marker([33.827279, -84.355706], {icon: liveIcon}).addTo(map);
    var marker2 = L.marker([33.772145, -84.358538], {icon: liveIcon}).addTo(map);
    var marker3 = L.marker([33.778994, -84.402140], {icon: liveIcon}).addTo(map);
    var marker4 = L.marker([33.728327, -84.348067], {icon: liveIcon}).addTo(map);
});
