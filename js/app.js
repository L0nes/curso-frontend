// Inicialización de variables y objectos
const formulario = document.getElementById('formulario');
const nick = document.getElementById('nick');
const email = document.getElementById('email');
const size = document.getElementById('size');
const error = document.getElementById('error');


// Funciones de evento
function comprobar_formulario(event) {
    if (nick.value.match(/(?<!\S)[0-9]/)) {
        event.preventDefault();
        error.innerText = 'El campo nick no puede comenzar con un número';
        return false;
    } else if (size.value == '') {
        event.preventDefault();
        error.innerText = 'El necesario seleccionar el tamaño del panel';
        return false;
    }
    return true;
}


// Eventos
formulario.addEventListener('submit', comprobar_formulario);

