/* VARIABLES */ 
var inicio = false;
var adyacentes=[];
var tamanoPanel;
var color_marcado;
var marcados = [];
var id_intervalo;


/* FUNCIONES */ 
/**
 * Obtener un entero aleatorio
 */
function getRandomInt (max) {
    return Math.floor(Math.random() * max);
}

/**
 * Obtener los datos de la partida
 */
function rellenar_formulario_usuario () {
    document.getElementById('nick').value = nick2;
    document.getElementById('avatarImg').src = avatarImg;
    tamanoPanel = parseInt(size);
}

/**
 * Calcular los items adyacentes al marcado
 */
function calcular_adyacentes (marcado) {
    adyacentes = [];

    if ((marcado - tamanoPanel) >= 0) {
        adyacentes.push(marcado - tamanoPanel);
    } // Arriba
    if ((marcado + tamanoPanel) < tamanoPanel**2) {
        adyacentes.push(marcado + tamanoPanel);
    } // Abajo
    if (marcado % tamanoPanel != 0) {
        adyacentes.push(marcado - 1);
    } // Izquierdo
    if ((marcado + 1) % tamanoPanel != 0) {
        adyacentes.push(marcado + 1);
    } // Derecho
}

/**
 * Temporizador de la partida
 */
function cuenta_atras () {
    let tiempo = parseInt(document.getElementById('tmpo').value) - 1;
    document.getElementById('tmpo').value = tiempo;

    if (tiempo == 0) {
        clearInterval(id_intervalo);

        const items = document.getElementsByClassName('item');

        for (let item of items) {
            item.removeEventListener('mousedown', comenzar_marcar);
            item.removeEventListener('mouseover', continuar_marcar);
        }
        document.removeEventListener('mouseup', finalizar_marcar);

        document.getElementById('juegoAcabado').style.zIndex = '2';
        document.getElementById('juego').style.zIndex = '1';

        document.getElementById('nuevaPartida').addEventListener(
            'click', () => location.reload()
        )
    }
}

/**
 * Pintar el panel inicial
 */
function pintar_panel () {
    document.getElementById('juego').style.gridTemplateColumns = "repeat("+size+", 1fr)";
    document.getElementById('juego').style.gridTemplateRows = "repeat("+size+", 1fr)";

    let items = '';
    let colores = ["rojo", "verde", "azul"];
    let color_rndm = 0;
    for (let i = 0; i < parseInt(size)**2; i++) {
        if (i % 2 > 0) color_rndm = getRandomInt(colores.length);
        items += `<div class="containerItem"><div id="${i}" class="item ${colores[color_rndm]}"></div></div>`;
    }
    document.getElementById('juego').innerHTML = items;
}

/**
 * Añadir los eventos al juego
 */
function eventos_juego () {
    const items = document.getElementsByClassName('item');

    for (let item of items) {
        item.addEventListener('mousedown', comenzar_marcar);
        item.addEventListener('mouseover', continuar_marcar);
    }

    document.addEventListener('mouseup', finalizar_marcar);
    id_intervalo = setInterval(cuenta_atras, 1000);
}


/* FUNCIONES DE JUEGO */
/**
 * Marcar los elementos clickados
 */
function comenzar_marcar (event) {
    let item = event.target;
    let containerItem = event.target.parentElement;

    if (item.classList.contains('rojo')) {
        color_marcado = 'rojo';
        containerItem.classList.add('rojo');
    } else if (item.classList.contains('verde')) {
        color_marcado = 'verde';
        containerItem.classList.add('verde');
    } else {
        color_marcado = 'azul';
        containerItem.classList.add('azul');
    }

    if (!inicio) inicio = true;

    marcados.push(parseInt(item.id));
    calcular_adyacentes(parseInt(item.id));
}

/**
 * Añadir los eventos al juego
 */
function continuar_marcar (event) {
    if (inicio) {
        let item = event.target;
        let id_nuevo = parseInt(item.id);

        if (adyacentes.includes(id_nuevo) && item.classList.contains(color_marcado)) {
            let containerItem = event.target.parentElement;

            if (item.classList.contains('rojo')) {
                containerItem.classList.add('rojo');
            } else if (item.classList.contains('verde')) {
                containerItem.classList.add('verde');
            } else containerItem.classList.add('azul');

            if (!marcados.includes(parseInt(item.id))) marcados.push(parseInt(item.id));

            calcular_adyacentes(parseInt(item.id));
        }
    }
}

function finalizar_marcar (event) {
    inicio = false;

    const puntuacion_input = document.getElementById('puntuacion');
    
    if (marcados.length > 1) {
        puntuacion_input.value = parseInt(puntuacion_input.value) + marcados.length;
    }

    for (let i = 0; i < marcados.length; i++) {
        let marcado = document.getElementById(marcados[i]);
        marcado.parentElement.classList.remove(color_marcado);

        let color = ['rojo', 'verde', 'azul'];
        let color_rnd =  getRandomInt(color.length);
        marcado.classList.remove(color_marcado);
        marcado.classList.add(color[color_rnd]);
    }
    marcados = [];
}


/* MAIN */
obtener_datos();

if (!comprobar_datos()) {
    location = 'index.html';
}

rellenar_formulario_usuario();
pintar_panel();
eventos_juego();