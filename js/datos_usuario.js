// Variables
var nick2;
var size2;
var email2;
var geolocalizacionTxt;


// Session storage
function guardar_datos (nick, size, email) {
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('size', size.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('geolocalizacionTxt', geolocalizacionTxt);
}

function obtener_datos () {
    nick2 = sessionStorage.getItem('nick');
    size2 = sessionStorage.getItem('size');
    email2 = sessionStorage.getItem('email');
}

function comprobar_datos () {
    if (nick2 == null) {
        sessionStorage.setItem('error', 'No se ha rellenado correctamente el formulario');
        return false;
    }
    return true;
}

function geolocalizacion () {
    if (!navigator.geolocation) {
        geolocalizacionTxt = 'El navegador no es compatible con la API.';
    } else {
        navigator.geolocation.getCurrentPosition(
            (position) => {geolocalizacionTxt = 'Latitud: ' + position.coords.latitude
                + ', Longitud: ' + position.coords.longitude;
            },
            () => {geolocalizacionTxt = 'El navegador no es compatible con la API.'}
        )
    }
}


// Local storage
function historico (nick2, size2, email2) {
    console.log('ola');
    
    let historicoStorage = localStorage.getItem('historico');
    let historico2;

    if (historicoStorage == null) {
        historico2 = [];
    } else {
        historico2 = JSON.parse(historicoStorage);
    }

    let registro = {
        usuario: nick2.value,
        email: email2.value,
        tamano: size2.value,
        fecha: Date.now()
    }
    historico2.push(registro);
    localStorage.setItem('historico', JSON.stringify(historico2));
}