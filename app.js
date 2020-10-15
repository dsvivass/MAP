const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

var myMap = L.map('myMap').setView([4.60971, -74.08175], 13)

L.tileLayer(tilesProvider, {
    maxZoom: 18
}).addTo(myMap)