obj = {"UNA1P1": {
    "ID_EXPLORACION": "UNA1P1",
    "COOR_X": 105112,
    "COOR_Y": 116788,
    "ESTRATOS": {
        "UNA1P1E1": {
            "ID_ESTRATO": "UNA1P1E1",
            "ID_EXPLORACION": "UNA1P1",
            "MUESTRAS": {
                "UNA1P1E1M1": {
                    "ID_MUESTRA": "UNA1P1E1M1",
                    "ID_EXPLORACION": "UNA1P1",
                }
            }
        },
        "UNA1P1E2": {
            "ID_ESTRATO": "UNA1P1E2",
            "ID_EXPLORACION": "UNA1P1",
            "MUESTRAS": {
                "UNA1P1E2M2": {
                    "ID_MUESTRA": "UNA1P1E2M2",
                    "ID_EXPLORACION": "UNA1P1",               
                },
                "UNA1P1E2M3": {
                    "ID_MUESTRA": "UNA1P1E2M3",
                    "ID_EXPLORACION": "UNA1P1",       
                }
            }
        }
    }
}
}

const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

var myMap = L.map('myMap').setView([4.60971, -74.08175], 13)

var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(myMap);
}

myMap.on('click', onMapClick);

var marker = L.marker([4.60971, -74.08175]).addTo(myMap)

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup()

var iconMarker = L.icon({
    iconUrl: './marker2.png',
    iconSize: [60, 60],
    iconAnchor: [30, 60]
})

var marker2 = L.marker([4.61, -74.10175], {
    icon: iconMarker,
}).addTo(myMap)


myMap.doubleClickZoom.disable()
myMap.on('dblclick', e => {
    var latlng = myMap.mouseEventToLatLng(e.originalEvent)
    console.log(latlng)
    L.marker([latlng['lat'], latlng['lng']], {
        icon: iconMarker,
    }).addTo(myMap)
})

navigator.geolocation.getCurrentPosition(
    (pos) => {
        const {coords} = pos
        console.log(coords)
        L.marker([coords.latitude, coords.longitude], {
            icon: iconMarker,
        }).addTo(myMap)
    },
    (err) => {
        console.log(err)
    },
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    }
)