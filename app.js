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
        },
        "UNA1P1E3": {
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
        },
        "UNA1P1E4": {
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
},
"UNA1P2": {
    "ID_EXPLORACION": "UNA1P2",
    "COOR_X": 105112,
    "COOR_Y": 116788,
    "ESTE": -74.081561,
    "NORTE": 4.797266,
    "ESTRATOS": {
        "UNA1P2E1": {
            "ID_ESTRATO": "UNA1P2E1",
            "ID_EXPLORACION": "UNA1P1",
            "MUESTRAS": {
                "UNA1P2E1M1": {
                    "ID_MUESTRA": "UNA1P2E1M1",
                    "ID_EXPLORACION": "UNA1P1",
                }
            }
        },
        "UNA1P2E2": {
            "ID_ESTRATO": "UNA1P2E2",
            "ID_EXPLORACION": "UNA1P2",
            "MUESTRAS": {
                "UNA1P2E2M2": {
                    "ID_MUESTRA": "UNA1P2E2M2",
                    "ID_EXPLORACION": "UNA1P1",               
                },
                "UNA1P2E2M3": {
                    "ID_MUESTRA": "UNA1P2E2M3",
                    "ID_EXPLORACION": "UNA1P1",       
                }
            }
        }
    }
}
}

var dict = {}
var dictLevel = {}
const unpack = (obj, lenObj, ID, status, ID_prev, i, dicc, col, depth, rec) => {Object.keys(obj).forEach(key => {

    if (typeof (obj[key]) === 'object' && obj[key] !== null && i <= depth) {

        var id = ''

        color_btn = ['btn-primary', 'btn-primary', 'btn-success', 'btn-primary', 'btn-info',
                 'btn-warning', 'btn-danger']

        color = ['text-primary', 'text-primary', 'text-secondary', 'text-success', 'text-danger',
                 'text-warning', 'text-info']

        color_tr = ['table-primary', 'table-primary', 'table-success', 'table-primary','table-info', 'table-warning', 'table-danger']
        position = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh']
            
        id = key + uniqueID() // Para crear ids unicos
        if (status === true) {
            dicc = get(dicc, ID, [color_btn[i], color_tr[i], position[i]])
        } else {
           dicc = get(dicc, ID, [color_btn[i], color_tr[i], position[i]])
        }

        Level = get(dictLevel, key+ID, get(dictLevel, ID_prev, 0)[ID_prev] + 1)

            if (status === true) {
                t = `
                <tr>
                    <td colspan="10">
                        <div class="${ID} collapse ${dicc[ID][2]}" id="${key+ID}" >
                            <button class="btn ${dicc[ID][0]} btn-sm sticky" type="button" data-toggle="collapse" data-target=".${id}" aria-expanded="false" aria-controls="${id}">
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
                                    <button class="btn btn-outline-primary btn-sm sticky" type="button" data-toggle="collapse" data-target=".${id}" aria-expanded="false" aria-controls="${id}">
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

                var doc = document.querySelector('#'+ID_prev);

            }
    
            doc.innerHTML += t;

            i = dictLevel[key + ID]
            i+=1

            var color = dicc[ID][1]
            
            return unpack(obj[key], Object.values(obj[key]).filter( v => typeof v === 'object').length, id, true, key+ID, i, dicc, color, depth, true);
        
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

// unpack(obj, Object.values(obj).filter( v => typeof v === 'object').length, 'begin', false, 'inicio', 0, dict, '', 8, false)
// console.log(document.documentElement.innerHTML)

// ----------------------

const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

var myMap = L.map('myMap').setView([4.60971, -74.08175], 13)

// var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
// 	maxZoom: 20,
// 	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
// }).addTo(myMap);

var tileLayer = L.tileLayer(tilesProvider).addTo(myMap)

var popup = L.popup();

myMap.on('click', e => {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(myMap);
})

var marker = L.marker([4.60971, -74.08175]).addTo(myMap)

marker.bindPopup("<b>Hello world!</b><br>I am a popup.")

const arbol = document.querySelector('#inicio')
var clicked = false

marker.on('click', e => {
    console.log('clicked')
    // location.href = './pag1.html'
    // arbol.style.display = 'block'
    $('#inicio').toggle() //Se esconde o se muestra cada vez que se hace un click
    marker.openPopup()
    if (!clicked) {clicked = true}
    else {clicked = false}
    
    // arbol.toggle()
}).on('mouseover', e => {
    console.log('mouse over')
    marker.openPopup()
}).on('mouseout', e => {
    console.log('Fueraa')
    if (!clicked) {
    marker.closePopup()
    }
})

var iconMarker = L.icon({
    iconUrl: './marker2.png',
    iconSize: [60, 60],
    iconAnchor: [30, 60]
})

console.log(idInicial)

var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var blueIcon = new L.Icon({
iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
iconSize: [25, 41],
iconAnchor: [12, 41],
popupAnchor: [1, -34],
shadowSize: [41, 41]
});

const inicio = document.querySelector('#inicio')
var list = []

Object.keys(obj).forEach(key => {

    dict = {}
    dictLevel = {}

    div = `<div class="table-responsive text-nowrap col-md-12 mx-auto inicio" id="${key}inicio">
    
    </div>`

    inicio.innerHTML += div

    console.log('nameee', key)
    var objMod = {}

    objMod[key] = obj[key]
    unpack(objMod, Object.values(obj).filter( v => typeof v === 'object').length, '', false, key+'inicio', 0, dict, '', 2, false)
    

    window['marker'+key] = L.marker([obj[key]['NORTE'], obj[key]['ESTE']]).addTo(myMap)
    window['clicked'+'marker'+key] = false
    window['marker'+key].bindPopup(`<b>ID_EXPLORACION:</b><br>${obj[key]['ID_EXPLORACION']}`)
    list.push(['marker'+key])

    window['marker'+key].on('click', e => {
        console.log('clicked')

        
        // location.href = './pag1.html'
        $('#inicio').toggle()
        window['marker'+key].openPopup()
        if (!clicked) {
            window['marker'+key].setIcon(greenIcon)
            window['marker'+key].openPopup()
            clicked = true
            $("#inicio").children().hide(); 
            $('#'+key+'inicio').show()
        }
        else {
            window['marker'+key].setIcon(blueIcon)
            clicked = false
        }
    }).on('mouseover', e => {
        console.log('mouse over')
        window['marker'+key].openPopup()
    }).on('mouseout', e => {
        console.log('Fueraa')
        if (!window['clicked'+'marker'+key]) {
        window['marker'+key].closePopup()
        }
    })
    list.push(eval('marker'+key))
})

// ====================

var cities = L.layerGroup(list);

var overlayMaps = {
    "Cities": cities
};

L.control.layers({}, overlayMaps).addTo(myMap);

myMap.doubleClickZoom.disable()

myMap.on('dblclick', e => {
    var latlng = myMap.mouseEventToLatLng(e.originalEvent)
    console.log(latlng)
    L.marker([latlng['lat'], latlng['lng']], {
        icon: iconMarker,
    }).addTo(myMap)   
}).on('click', e => {
    if (clicked) {
    $('#inicio').toggle()
    clicked = false
    }
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

// obj = {
//     "UNA1P1": {
//         "ID_EXPLORACION": "UNA1P1",
//         "TIPO": "P",
//         "ID_TIPO": 1,
//         "ID_FUENTE": "UNA",
//         "CLASE": "PERFORACION MECANICA",
//         "PROFUNDIDAD_DE_EXPLORACION": 50,
//         "NIVEL_FREATICO": 1.6,
//         "NOMBRE_EXPLORACION": "CALLE 170 - F.F.N.N.",
//         "FECHA": 836179200000,
//         "DIRECCION": "CALLE 170 F.F.N.N.",
//         "NUMERO_RELACIONADO": "N1",
//         "COOR_X": 105112,
//         "COOR_Y": 116788,
//         "ESTRATOS": {
//             "UNA1P1E1": {
//                 "ID_ESTRATO": "UNA1P1E1",
//                 "ID_EXPLORACION": "UNA1P1",
//                 "No_CAPA": 1,
//                 "TRAMO_DESDE": 0,
//                 "TRAMO_HASTA": 2.5,
//                 "USCS": "OH",
//                 "DESCRIPCION ": "Suelo Orgánico",
//                 "COOR_X": 105112,
//                 "COOR_Y": 116788,
//                 "MUESTRAS": {
//                     "UNA1P1E1M1": {
//                         "ID_MUESTRA": "UNA1P1E1M1",
//                         "ID_EXPLORACION": "UNA1P1",
//                         "ID_ESTRATO": "UNA1P1E1",
//                         "No_MUESTRA": 1,
//                         "TRAMO_DESDE": null,
//                         "TRAMO_HASTA": null,
//                         "PROFUNDIDAD_MEDIA": 2.5,
//                         "USCS": "CH",
//                         "WN ": 158.98,
//                         "LL ": 141.7,
//                         "LP ": 42.6,
//                         "IP ": 99.1,
//                         "PESO_UNITARIO_TOTAL": null,
//                         "PESO_UNITARIO_SECO": null,
//                         "PESO_ESPECIFICO": null,
//                         "e0": null,
//                         "GRAVAS": null,
//                         "ARENAS": null,
//                         "FINOS": null,
//                         "Cu_INCONFINADA": null,
//                         "OTROS_ENSAYOS": null,
//                         "COOR_X": 105112,
//                         "COOR_Y": 116788
//                     }
//                 }
//             },
//             "UNA1P1E2": {
//                 "ID_ESTRATO": "UNA1P1E2",
//                 "ID_EXPLORACION": "UNA1P1",
//                 "No_CAPA": 2,
//                 "TRAMO_DESDE": 2.5,
//                 "TRAMO_HASTA": 4.5,
//                 "USCS": "CH",
//                 "DESCRIPCION ": "Arcilla limosa marrón amarillento oscuro",
//                 "COOR_X": 105112,
//                 "COOR_Y": 116788,
//                 "MUESTRAS": {
//                     "UNA1P1E2M2": {
//                         "ID_MUESTRA": "UNA1P1E2M2",
//                         "ID_EXPLORACION": "UNA1P1",
//                         "ID_ESTRATO": "UNA1P1E2",
//                         "No_MUESTRA": 2,
//                         "TRAMO_DESDE": null,
//                         "TRAMO_HASTA": null,
//                         "PROFUNDIDAD_MEDIA": 2.65,
//                         "USCS": "CH",
//                         "WN ": 204.86,
//                         "LL ": 140.8,
//                         "LP ": 42.5,
//                         "IP ": 98.3,
//                         "PESO_UNITARIO_TOTAL": null,
//                         "PESO_UNITARIO_SECO": null,
//                         "PESO_ESPECIFICO": null,
//                         "e0": null,
//                         "GRAVAS": null,
//                         "ARENAS": null,
//                         "FINOS": null,
//                         "Cu_INCONFINADA": null,
//                         "OTROS_ENSAYOS": null,
//                         "COOR_X": 105112,
//                         "COOR_Y": 116788
//                     },
//                     "UNA1P1E2M3": {
//                         "ID_MUESTRA": "UNA1P1E2M3",
//                         "ID_EXPLORACION": "UNA1P1",
//                         "ID_ESTRATO": "UNA1P1E2",
//                         "No_MUESTRA": 3,
//                         "TRAMO_DESDE": null,
//                         "TRAMO_HASTA": null,
//                         "PROFUNDIDAD_MEDIA": 2.74,
//                         "USCS": "CH",
//                         "WN ": null,
//                         "LL ": 166.4,
//                         "LP ": 55.5,
//                         "IP ": 110.9,
//                         "PESO_UNITARIO_TOTAL": null,
//                         "PESO_UNITARIO_SECO": null,
//                         "PESO_ESPECIFICO": null,
//                         "e0": null,
//                         "GRAVAS": null,
//                         "ARENAS": null,
//                         "FINOS": null,
//                         "Cu_INCONFINADA": null,
//                         "OTROS_ENSAYOS": null,
//                         "COOR_X": 105112,
//                         "COOR_Y": 116788
//                     },
//                     "UNA1P1E2M4": {
//                         "ID_MUESTRA": "UNA1P1E2M4",
//                         "ID_EXPLORACION": "UNA1P1",
//                         "ID_ESTRATO": "UNA1P1E2",
//                         "No_MUESTRA": 4,
//                         "TRAMO_DESDE": null,
//                         "TRAMO_HASTA": null,
//                         "PROFUNDIDAD_MEDIA": 4.02,
//                         "USCS": "CH",
//                         "WN ": 123.47,
//                         "LL ": 150.5,
//                         "LP ": 45.7,
//                         "IP ": 104.8,
//                         "PESO_UNITARIO_TOTAL": null,
//                         "PESO_UNITARIO_SECO": null,
//                         "PESO_ESPECIFICO": null,
//                         "e0": null,
//                         "GRAVAS": null,
//                         "ARENAS": null,
//                         "FINOS": null,
//                         "Cu_INCONFINADA": null,
//                         "OTROS_ENSAYOS": null,
//                         "COOR_X": 105112,
//                         "COOR_Y": 116788
//                     },
//                     "UNA1P1E2M5": {
//                         "ID_MUESTRA": "UNA1P1E2M5",
//                         "ID_EXPLORACION": "UNA1P1",
//                         "ID_ESTRATO": "UNA1P1E2",
//                         "No_MUESTRA": 5,
//                         "TRAMO_DESDE": null,
//                         "TRAMO_HASTA": null,
//                         "PROFUNDIDAD_MEDIA": 4.1,
//                         "USCS": "CH",
//                         "WN ": null,
//                         "LL ": 147,
//                         "LP ": 37.1,
//                         "IP ": 109.9,
//                         "PESO_UNITARIO_TOTAL": 1.42,
//                         "PESO_UNITARIO_SECO": null,
//                         "PESO_ESPECIFICO": null,
//                         "e0": null,
//                         "GRAVAS": null,
//                         "ARENAS": null,
//                         "FINOS": null,
//                         "Cu_INCONFINADA": 0.13,
//                         "OTROS_ENSAYOS": null,
//                         "COOR_X": 105112,
//                         "COOR_Y": 116788
//                     },
//                     "UNA1P1E2M6": {
//                         "ID_MUESTRA": "UNA1P1E2M6",
//                         "ID_EXPLORACION": "UNA1P1",
//                         "ID_ESTRATO": "UNA1P1E2",
//                         "No_MUESTRA": 6,
//                         "TRAMO_DESDE": null,
//                         "TRAMO_HASTA": null,
//                         "PROFUNDIDAD_MEDIA": 4.42,
//                         "USCS": "CH",
//                         "WN ": 131.36,
//                         "LL ": 168.9,
//                         "LP ": 44.7,
//                         "IP ": 124.2,
//                         "PESO_UNITARIO_TOTAL": null,
//                         "PESO_UNITARIO_SECO": null,
//                         "PESO_ESPECIFICO": null,
//                         "e0": null,
//                         "GRAVAS": null,
//                         "ARENAS": null,
//                         "FINOS": null,
//                         "Cu_INCONFINADA": null,
//                         "OTROS_ENSAYOS": null,
//                         "COOR_X": 105112,
//                         "COOR_Y": 116788
//                     }
//                 }
//             }
//         }
//     },
//     "UNA1P2": {
//         "ID_EXPLORACION": "UNA1P2",
//         "TIPO": "P",
//         "ID_TIPO": 2,
//         "ID_FUENTE": "UNA",
//         "CLASE": "PERFORACION MECANICA",
//         "PROFUNDIDAD_DE_EXPLORACION": 50,
//         "NIVEL_FREATICO": 5,
//         "NOMBRE_EXPLORACION": "JARDINES DE PAZ",
//         "FECHA": 848534400000,
//         "DIRECCION": "Autopista Norte con Calle 200",
//         "NUMERO_RELACIONADO": "N2",
//         "COOR_X": 104008,
//         "COOR_Y": 120975,
//         "ESTRATOS": {
//             "UNA1P2E1": {
//                 "ID_ESTRATO": "UNA1P2E1",
//                 "ID_EXPLORACION": "UNA1P2",
//                 "No_CAPA": 1,
//                 "TRAMO_DESDE": 0,
//                 "TRAMO_HASTA": 4,
//                 "USCS": "CL",
//                 "DESCRIPCION ": "Arcilla arenosa con grava gris oliva. Presencia de turba",
//                 "COOR_X": 104008,
//                 "COOR_Y": 120975,
//                 "MUESTRAS": {
//                     "UNA1P2E1M1": {
//                         "ID_MUESTRA": "UNA1P2E1M1",
//                         "ID_EXPLORACION": "UNA1P2",
//                         "ID_ESTRATO": "UNA1P2E1",
//                         "No_MUESTRA": 1,
//                         "TRAMO_DESDE": null,
//                         "TRAMO_HASTA": null,
//                         "PROFUNDIDAD_MEDIA": 3.55,
//                         "USCS": "CH-MH",
//                         "WN ": 45.81,
//                         "LL ": 60.4,
//                         "LP ": 30.6,
//                         "IP ": 29.8,
//                         "PESO_UNITARIO_TOTAL": null,
//                         "PESO_UNITARIO_SECO": null,
//                         "PESO_ESPECIFICO": null,
//                         "e0": null,
//                         "GRAVAS": null,
//                         "ARENAS": null,
//                         "FINOS": null,
//                         "Cu_INCONFINADA": null,
//                         "OTROS_ENSAYOS": null,
//                         "COOR_X": 104008,
//                         "COOR_Y": 120975
//                     },
//                     "UNA1P2E1M2": {
//                         "ID_MUESTRA": "UNA1P2E1M2",
//                         "ID_EXPLORACION": "UNA1P2",
//                         "ID_ESTRATO": "UNA1P2E1",
//                         "No_MUESTRA": 2,
//                         "TRAMO_DESDE": null,
//                         "TRAMO_HASTA": null,
//                         "PROFUNDIDAD_MEDIA": 3.65,
//                         "USCS": "CH",
//                         "WN ": null,
//                         "LL ": 61,
//                         "LP ": 22.2,
//                         "IP ": 38.8,
//                         "PESO_UNITARIO_TOTAL": 1.8,
//                         "PESO_UNITARIO_SECO": null,
//                         "PESO_ESPECIFICO": null,
//                         "e0": null,
//                         "GRAVAS": null,
//                         "ARENAS": null,
//                         "FINOS": null,
//                         "Cu_INCONFINADA": 0.004,
//                         "OTROS_ENSAYOS": null,
//                         "COOR_X": 104008,
//                         "COOR_Y": 120975
//                     }
//                 }
//             }
//         }
//     }
// }

