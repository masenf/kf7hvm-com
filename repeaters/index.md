---
layout: page
title: repeater map
header_include: map.html
---

This page is a work in progress (Last update: 2021-09-28).

Raw data is sourced from [`repeaters.json`](/repeaters/repeaters.json) which is actually
edited and maintained by hand. This data is combined with the latest updates from
the [Repeaterbook API](https://www.repeaterbook.com/wiki/doku.php?id=api) to create
the map.

<div id="mapid" style="height: 400px;"></div>

The map was created using [leaflet](https://leafletjs.com) and powered by
[OpenStreetMap](https://www.openstreetmap.org/)

<script>
var repeaters_json = '/repeaters/repeaters_generated.json';
var default_start = [46.290779, -120.997925];
var default_zoom = 7;
var mymap;

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

window.onload = (event) => {
  console.log('initializing map');
  mymap = L.map('mapid').setView(default_start, default_zoom);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2Y3aHZtIiwiYSI6ImNrdTNtNDRoODJzcWsybnFtczJxYXpucWkifQ.BAUSn09PYXmpDwkyIUyuoQ'
  }).addTo(mymap);
  mymap.on('click', onMapClick);
  console.log('fetching repeater data');
  fetch(repeaters_json)
    .then(response => response.json())
    .then((data) => {
      for (var repeater of data) {
         var offset = (parseFloat(repeater["Input Freq"]) - parseFloat(repeater["Frequency"])).toFixed(2);
         var header = repeater["Frequency"] + " " + repeater["Callsign"];
         var subtitle = ((offset > 0) ? "+" : "") + offset + " / " + repeater["PL"];
         var link = "<a href='https://www.repeaterbook.com/repeaters/details.php?state_id=" + repeater["State ID"] + "&ID=" + repeater["Rptr ID"] + "' target='_blank' title='view on repeaterbook'>" + header + "</a>";
         console.log(link);
         var marker = L.marker([repeater["Lat"], repeater["Long"]])
           .addTo(mymap)
           .bindPopup("<b>" + link + "</b><br>" + subtitle + "<br><br>" + (repeater["Comment"] || ""))
           .bindTooltip(header);
      }
    });
};
</script>
