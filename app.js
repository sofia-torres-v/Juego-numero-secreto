let numeroSecreto = 0;
let intentos = 0;
// Alamacenando los números en una lista para prevenir que si ya salió no vuelva a salir.
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let titulo = document.querySelector(elemento);
    titulo.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(
        document.getElementById("valorUsuario").value
    );
    console.log(numeroDeUsuario);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento(
            //Alternar texto 'vez o 'veces
            "p",
            `Asertaste el número en ${intentos} ${
                intentos === 1 ? "vez" : "veces"
            }`
        );
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento("p", "El número secreto es menor");
        } else {
            asignarTextoElemento("p", "El número secreto es mayor");
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    // abreviando,document.querySelector("#valorUsuario").value = '';
    let valorCaja = document.querySelector("#valorUsuario");
    valorCaja.value = "";
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * 10) + 1;
    console.log(numeroGenerado);
    // Si el numero generado esta incluido en la lista
    // Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        //Solucionando el error en la recursividad
        asignarTextoElemento(
            "p",
            "Ya se sortearon todos los números posibles."
        );
    } else {
        console.log(numeroSecreto);
        console.log(listaNumerosSorteados);
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento("h1", "¡Juego del número secreto!");
    asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    //Deshabilitar el boton de nuevo juego
    document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

condicionesIniciales();
