// Inicialización de variables y objectos
var formulario;
var nick;
var size;
var email;
var error;
var avatar_items;
var item_img;
var avatar_container;


// Funciones de evento
function comprobar_formulario(event) {
    if (nick.value.match(/(?<!\S)[0-9]/)) {
        nick.focus();
        event.preventDefault();
        error.innerText = 'El campo nick no puede comenzar con un número';
        return false;
    } else if (size.value == '') {
        size.focus();
        event.preventDefault();
        error.innerText = 'El necesario seleccionar el tamaño del panel';
        return false;
    }
    guardar_datos(nick, size, email, avatar_container);
    historico(nick, size, email);

    return true;
}

function moviendo_img(event) {
    item_img = event.target;
}

function cambiar_img(event) {
    avatar_container.src = item_img.src;
}

function dom_cargado () {
    formulario = document.getElementById('formulario');
    nick = document.getElementById('nick');
    size = document.getElementById('size');
    email = document.getElementById('email');
    error = document.getElementById('error');

    if (sessionStorage.getItem('error') != null) {
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }
    
    formulario.addEventListener('submit', comprobar_formulario);

    avatar_items = document.getElementsByClassName('avatarImgItem');
    for (let item of avatar_items) {
        item.addEventListener('dragstart', moviendo_img);
    }

    avatar_container = document.getElementById('avatarImg');
    avatar_container.addEventListener('dragover', 
        e => {e.preventDefault()}
    );
    avatar_container.addEventListener('drop', cambiar_img);
}


// Eventos
document.addEventListener('DOMContentLoaded', dom_cargado);

geolocalizacion();