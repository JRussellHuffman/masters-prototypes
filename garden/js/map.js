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

    var greenIcon = L.icon({
        iconUrl: 'images/marker-iconGreen.png',
        iconAnchor:   [13, 40],
        popupAnchor:  [0, -33]
    });
    var yellowIcon = L.icon({
        iconUrl: 'images/marker-iconYellow.png',
        iconAnchor:   [13, 40],
        popupAnchor:  [0, -33]
    });
    var redIcon = L.icon({
        iconUrl: 'images/marker-iconRed.png',
        iconAnchor:   [13, 40],
        popupAnchor:  [0, -33]
    });
    var blackIcon = L.icon({
        iconUrl: 'images/marker-iconBlack.png',
        iconAnchor:   [13, 40],
        popupAnchor:  [0, -33]
    });
    //markers on map
    var marker0 = L.marker([33.750441, -84.389593], {icon: greenIcon}).addTo(map);
        marker0.bindPopup('current status: good<br>see full status <span class="status good">here</span>');
    var marker1 = L.marker([33.827279, -84.355706], {icon: greenIcon}).addTo(map);
        marker1.bindPopup('current status: good<br>see full status <span class="status good">here</span>');
    var marker2 = L.marker([33.772145, -84.358538], {icon: yellowIcon}).addTo(map);
        marker2.bindPopup('current status: okay<br>see full status <span class="status okay">here</span>');
    var marker3 = L.marker([33.778994, -84.402140], {icon: redIcon}).addTo(map);
        marker3.bindPopup('current status: dying<br>see full status <span class="status dying">here</span>');
    var marker4 = L.marker([33.728327, -84.348067], {icon: yellowIcon}).addTo(map);
        marker4.bindPopup('current status: okay<br>see full status <span class="status okay">here</span>');
    var marker5 = L.marker([33.741674, -84.440614], {icon: blackIcon}).addTo(map);
        marker5.bindPopup('current status: no plant<br>see full status <span class="status gone">here</span>');
    var marker6 = L.marker([33.777496, -84.379223], {icon: blackIcon}).addTo(map);
        marker6.bindPopup('current status: no plant<br>see full status <span class="status gone">here</span>');
    var marker7 = L.marker([33.778281, -84.395746], {icon: greenIcon}).addTo(map);
        marker7.bindPopup('current status: good<br>see full status <span class="status good">here</span>');

    //image on map
    var imageUrl = 'images/heat.png',
    imageBounds = [[33.838472, -84.448274], [33.719189, -84.328454]];

L.imageOverlay(imageUrl, imageBounds).addTo(map);


    $('.leaflet-popup-pane').on("click", ".good", function() {
        $(".rightContent").load("ajax/statusGood.html");
    });
    $('.leaflet-popup-pane').on("click", ".okay", function() {
        $(".rightContent").load("ajax/statusOkay.html");
    });
    $('.leaflet-popup-pane').on("click", ".dying", function() {
        $(".rightContent").load("ajax/statusDying.html");
    });
    $('.leaflet-popup-pane').on("click", ".gone", function() {
        $(".rightContent").load("ajax/statusGone.html");
    });
});