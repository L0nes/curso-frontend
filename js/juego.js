// Funciones
function rellenar_formulario_usuario () {
    document.getElementById('nick').value = nick2;
    document.getElementById('avatarImg').src = avatarImg;
}

function pintar_panel () {
    console.log(size);
    document.getElementById('juego').style.gridTemplateColumns = "repeat("+size+", 1fr)";
    document.getElementById('juego').style.gridTemplateRows = "repeat("+size+", 1fr)";
}


// Acciones 
obtener_datos();

if (!comprobar_datos()) {
    location = 'index.html';
}

rellenar_formulario_usuario();
pintar_panel();