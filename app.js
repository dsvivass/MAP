obj = {"UNA1P1": {
    "ID_EXPLORACION": "UNA1P1",
    "COOR_X": 105112,
    "COOR_Y": 116788,
    "ESTE": -74.051561,
    "NORTE": 4.737266,
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

// var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
// 	maxZoom: 20,
// 	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
// }).addTo(myMap);

var tileLayer = L.tileLayer(tilesProvider).addTo(myMap)

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(myMap);
}

myMap.on('click', onMapClick);

var marker = L.marker([4.60971, -74.08175]).addTo(myMap)

marker.bindPopup("<b>Hello world!</b><br>I am a popup.")

const arbol = document.querySelector('#inicio')

marker.on('click', e => {
    console.log('clicked')
    // location.href = './pag1.html'
    // arbol.style.display = 'block'
    $('#inicio').toggle() //Se esconde o se muestra cada vez que se hace un click
    // arbol.toggle()
}).on('mouseover', e => {
    console.log('mouse over')
    marker.openPopup()
})


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

// ----------------------------

var dict = {}
var dict2 = {}
const unpack = (obj, lenObj, ID, status, ID_prev, i, dicc, col) => {Object.keys(obj).forEach(key => {

    console.log(obj)
    if (typeof (obj[key]) === 'object') {

        var id = ''
        color_btn = ['btn-outline-primary', 'btn-outline-primary', 'btn-outline-success', 'btn-outline-primary', 'btn-outline-info',
                 'btn-outline-warning', 'btn-outline-danger']

        color = ['text-primary', 'text-primary', 'text-secondary', 'text-success', 'text-danger',
                 'text-warning', 'text-info']

        color_tr = ['table-primary', 'table-primary', 'table-success', 'table-primary','table-info', 'table-warning', 'table-danger']
            
        id = key + uniqueID() // Para crear ids unicos
        dicc = get(dicc, ID, [color_btn[i], color_tr[i]])

        console.log('id', id, 'ID', ID, 'ID_prev', ID_prev)
        


            if (status === true) {
                t = `
                <tr>
                    <td colspan="10">
                        <div class="${ID} collapse" id="${key+ID}" >
                            <button class="btn ${dicc[ID][0]} btn-sm" type="button" data-toggle="collapse" data-target=".${id}" aria-expanded="false" aria-controls="${id}">
                                ${key}
                            </button>
                        </div>    

                        <div class = "collapse ${id}" >
                            <table class="table table-bordered" >
                                <tbody id="tbody${id}">
                                    
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                `;

                var doc = document.querySelector('#tbody'+ID)
                
            } else {
                t = `
                <div id="${key+ID}">
                    <table class="table borderless w-auto small table-sm" >
                        <tbody>
                            <tr>
                                <td>
                                    <button class="btn btn-outline-primary btn-sm" type="button" data-toggle="collapse" data-target=".${id}" aria-expanded="false" aria-controls="${id}">
                                        ${key}
                                    </button>
                                </td>
                                <td>
                                    <div class = "collapse ${id}" >
                                        <table class="table table-bordered">
                                            <tbody id="tbody${id}">
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                
                `;

                var doc = document.querySelector('#inicio');

            }
    
            doc.innerHTML += t;

            i+=1

            var color = dicc[ID][1]
            console.log(document.documentElement.innerHTML)
            
            unpack(obj[key], Object.values(obj[key]).filter( v => typeof v === 'object').length, id, true, key+ID, i, dicc, color);
        
    } else {

        color_tr = ['table-primary', 'table-success', 'table-info', 'table-warning', 'table-danger']

        t_r = `
                        <tr class="${col}">
                            <th scope="row">${key}</td>
                            <td>${obj[key]}</td>
                        </tr>
            `

        var docInfo = document.querySelector('#tbody'+ID);
        docInfo.innerHTML += t_r;

        console.log('id2', id, 'ID', ID, 'ID_prev', ID_prev)
    
    } 

    
})
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function uniqueID() {
    return Math.floor(Math.random() * Date.now())
    }   

function get(object, key, default_value) {
    if (typeof object[key] == "undefined") {
        object[key] = default_value
    }
    // var result = object[key];
    return object
}

var idInicial = ''
Object.values(obj).filter( v => { 
    if (typeof v === 'object') {
        idInicial = getKeyByValue(obj, v)
    }
})

unpack(obj, Object.values(obj).filter( v => typeof v === 'object').length, idInicial, false, 'inicio', 0, dict, '')
console.log(document.documentElement.innerHTML)

