import { Obstaculo } from "./ObjetosCarcel/Obstaculo.js";
import { Vino } from './ObjetosCarcel/Vino.js';
let botonJugar = document.querySelector('.play');
let botonReset = document.querySelectorAll('.reset');
let fisura = document.querySelector('.fisura');
let cartelEscape = document.querySelector('.cartelEscape');
let cartelLost = document.querySelector('.cartelLost');
let cartelGano = document.querySelector('.cartelGano');
let contador = document.querySelector('.contador');
let contadorBirrasElemento = document.querySelector('.contadorBirras');
let contadorWiskeyElemento = document.querySelector('.contadorWiskey');
let contadorBirras = 0;
let contadorWiskey = 0;
let gravedad = 2; // Velocidad de caída
let posicionTop = 400; // Posición inicial en "top"
const radioFisura = 48; // Radio de colisión de la fisura
let isJumping = false; // Bandera para evitar múltiples saltos
let intervaloCaida; // Intervalo para la gravedad
let fisuraDead; // Intervalo para revisar si la fisura se sale de la pantalla
let murio = false;
let gano = false;
let generaObstaculo;
let generaVinos;
let moverObjetos;
const fisuraRect = fisura.getBoundingClientRect(); // Obtener las coordenadas reales de fisura

const fisuraX = fisuraRect.left + fisuraRect.width / 2; // Centro horizontal de fisura

const obstaculos = [];

const vinosArray = [];


function generarVino() {
    let posYrandom = Math.floor(Math.random() * (400 - 100 + 1)) + 100; // Altura aleatoria entre 100 y 400
    const nuevoVino = new Vino(1800, posYrandom); // Crear un nuevo vino
    vinosArray.push(nuevoVino); // Agregar el nuevo vino al arreglo
    nuevoVino.dibujar();
}

function moverVinos() {
    for (let i = 0; i < vinosArray.length; i++) {
        const vino = vinosArray[i];
        vino.setPosX(vino.posX - 5); // Mueve el vino hacia la izquierda
        // Eliminar el vino si sale de la pantalla
        if (vino.posX < -500 || vino.collected) {
            console.log('Vino eliminado');
            vino.destroy();
            vinosArray.splice(i, 1); // Eliminar del arreglo
        }
    }
}

function generarObstaculo() {
    const nuevoObstaculo = new Obstaculo(1200, 350); // Altura aleatoria
    obstaculos.push(nuevoObstaculo); // Agregar el nuevo obstáculo al arreglo
}

// Función para mover los obstáculos y eliminarlos si salen de la pantalla
function moverObstaculos() {
    for (let i = 0; i < obstaculos.length - 1; i++) {
        const obstaculo = obstaculos[i];
        obstaculo.setPosX(obstaculo.posX - 5); // Mueve el obstáculo hacia la izquierda

        let fisuraY = posicionTop + fisuraRect.height - 20; // Centro vertical de fisura
        // Eliminar el obstáculo si sale de la pantalla
        
        if (obstaculo.posX < -500 || (obstaculo.estaColisionando(fisuraX, fisuraY, radioFisura) && contadorWiskey > 0)) { // si el objeto se pasa de la pantalla o coliciona con el fisura y tiene > 1 escudo
            console.log('Obstáculo eliminado');
            if (obstaculo.estaColisionando(fisuraX, fisuraY, radioFisura) && contadorWiskey > 0) {
                contadorWiskey--; // Usa un whiskey para evitar el obstáculo
            }
            obstaculo.destroy(); // elimina el objeto de la vista
            obstaculos.splice(i, 1); // Eliminar del arreglo
        }
        
    }
}

fisura.style.top = `${posicionTop}px`;
fisura.classList.add('walk');

// Inicia el juego al presionar el botón "Jugar"
botonJugar.addEventListener('click', () => {
    fisura.style.animationPlayState = 'running';
    contador.classList.remove('ocultar');
    contador.classList.add('mostrar');
    contadorWiskeyElemento.classList.remove('ocultar');
    contadorWiskeyElemento.classList.add('mostrar');
    fisura.classList.remove('walk', 'dead', 'afk', 'attack', 'drink');
    fisura.classList.add('drink');
    posicionTop -= 200; // Pequeño salto inicial al comenzar
    setTimeout(() => {
        //genero el primero
        generarObstaculo();

        // Generar obstáculos cada 1.5 segundo
        generaObstaculo = setInterval(() => {
            generarObstaculo();
        }, 1500);

        // Generar vinos cada 3 segundos
        generaVinos = setInterval(() => {
            generarVino();
        }, 3000);

        // Mover obstáculos existentes
        moverObjetos = setInterval(() => {
            if (!murio && !gano) {
                moverObstaculos();
                moverVinos();
            }
        }, 10);

        botonJugar.classList.add('ocultar');
        fisura.classList.add('afk');
        cartelEscape.classList.add('ocultar');

        // Inicia el bucle de gravedad
        intervaloCaida = setInterval(() => { // lo hace caer siempre y cuando no este saltando, muerto o gano
            if (!isJumping && !murio && !gano) {
                posicionTop += gravedad; // La gravedad hace que baje
                fisura.style.top = `${posicionTop}px`;
            }
        
            if (murio && posicionTop < 410) { // si murio y no llego al suelo
                posicionTop += gravedad;
                fisura.style.top = `${posicionTop}px`;
            } else if (murio && posicionTop >= 410) { // si murio y llego al suelo
                posicionTop = 410; // Fijar la posición en el límite
                fisura.style.top = `${posicionTop}px`;
                fisura.classList.remove('drink', 'afk', 'attack', 'walk');
                fisura.classList.add('dead');
                clearInterval(intervaloCaida); // Detener la caída
            }
        
            if (gano && posicionTop < 400) { // si gano y no llego al suelo
                posicionTop += gravedad;
                fisura.style.top = `${posicionTop}px`;
            } else if (gano && posicionTop >= 400) { // si gano y llego al suelo
                posicionTop = 400; // Fijar la posición en el límite
                fisura.style.top = `${posicionTop}px`;
                fisura.classList.remove('drink', 'afk', 'dead', 'attack');
                fisura.classList.add('walk'); // Mantener la animación de caminar
                clearInterval(intervaloCaida); // Detener la caída
            }
        }, 10); // Actualiza cada 10ms
    }, 1000);

    // Evita que la fisura se salga de la pantalla
    fisuraDead = setInterval(() => {
        let fisuraY = posicionTop + fisuraRect.height - 20; // Centro vertical de fisura
        for(const obstaculo of obstaculos) {
            if (posicionTop >= 411 || posicionTop <= -80 || (obstaculo.estaColisionando(fisuraX, fisuraY, radioFisura) && contadorWiskey === 0)) {
                if (!murio) {
                    cartelLost.classList.remove('ocultar');
                    cartelLost.classList.add('mostrar');
                    contadorBirrasElemento.textContent = `Agarraste ${contadorBirras} birras 🍻`;
                    murio = true;
                    reiniciarEscena();
                }
            }
        }
    }, 10); // Revisa cada 10ms que no se salga de los límites
});

// Reinicia el juego al presionar el botón "Reset"
botonReset.forEach(boton => {
    boton.addEventListener('click', () => {
        // Reinicia la posición y el estado del juego
        murio = false;
        gano = false;
        posicionTop = 400;
        fisura.style.top = `${posicionTop}px`;
        fisura.classList.remove('dead', 'drink', 'afk', 'attack');
        fisura.classList.add('walk');
        setInterval(() => {
            fisura.style.animationPlayState = 'running';
        }, 10);
        cartelLost.classList.remove('mostrar');
        cartelLost.classList.add('ocultar');
        cartelEscape.classList.remove('ocultar');
        cartelEscape.classList.add('mostrar');
        cartelGano.classList.remove('mostrar');
        cartelGano.classList.add('ocultar');
        botonJugar.classList.remove('ocultar');
        botonJugar.classList.add('mostrar');
    
        reiniciarEscena();
    })
});

///se detecta la tecla espacio o flecha arriba para saltar///
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        if (!isJumping && !murio && !gano) {
            isJumping = true; // Evita múltiples saltos
            fisura.classList.remove('afk', 'walk', 'attack', 'dead');
            fisura.classList.add('drink');

            let velocidadActual = -gravedad * 10; // Velocidad inicial del salto (negativa para subir)

            let salto = setInterval(() => {
                velocidadActual += gravedad; // Incrementa la velocidad con la gravedad
                posicionTop += velocidadActual; // Actualiza la posición con la velocidad
                fisura.style.top = `${posicionTop}px`;

                // Detener el salto cuando comience a caer
                if (velocidadActual >= 0) { // Cuando la velocidad sea positiva, el salto terminó
                    clearInterval(salto);

                    // Volver a activar la gravedad después del salto
                    setTimeout(() => {
                        isJumping = false;
                    }, 50); // Tiempo en el aire
                }
            }, 20); // Actualiza cada 20ms

            setTimeout(() => {
                fisura.classList.remove('drink');
                fisura.classList.add('afk');
            }, 800); // Cambia a 'afk' después de completar el salto
        }
    }
});

//////////check colisiones//////////
setInterval(() => {
    const fisuraY = posicionTop + fisuraRect.height - 20; // Centro vertical de fisura
    for (const vino of vinosArray) {
        if (!vino.collected && vino.estaColisionando(fisuraX, fisuraY, radioFisura) && !vino.especial) { // si colisiona con una birra
            vino.collected = true;
            contadorBirras++;
            console.log(`Vino recogido! Total: ${contadorBirras}`);
        }else if (!vino.collected && vino.estaColisionando(fisuraX, fisuraY, radioFisura) && vino.especial) { // si colisiona con un wiskey
            vino.collected = true;
            if (contadorWiskey < 3) {
                contadorWiskey++;
            }

            fisura.classList.remove('afk', 'walk', 'drink', 'dead');
            fisura.classList.add('attack');
        }
    }

}, 10);

setInterval(() => {
    contador.textContent = `Birras: ${contadorBirras}`;
    if (contadorWiskey === 1) {
        contadorWiskeyElemento.textContent = `Whiskeys: 🛡️`;
    }else if (contadorWiskey === 2) {
        contadorWiskeyElemento.textContent = `Whiskeys: 🛡️🛡️`;
    }else if (contadorWiskey === 3) {
        contadorWiskeyElemento.textContent = `Whiskeys: 🛡️🛡️🛡️`;
    }else{
        contadorWiskeyElemento.textContent = `Sin Whiskeys`;
    }
}, 10);

setInterval(() => {
    if (contadorBirras === 10) {
        gano = true;
        cartelGano.classList.remove('ocultar');
        cartelGano.classList.add('mostrar');

        if (posicionTop >= 400) {
            fisura.classList.remove('drink', 'afk', 'dead', 'attack');
            fisura.classList.add('walk'); // Mantener la animación de caminar
        }
        reiniciarEscena();
    }
}, 10);

function reiniciarEscena() {
    // Elimina todos los obstáculos existentes
    contadorBirras = 0;
    contadorWiskey = 0;
    for (const obstaculo of obstaculos) {
        obstaculo.destroy();
    }
    obstaculos.splice(0, obstaculos.length);
    // Elimina todos los vinos existentes
    for (const vino of vinosArray) {
        vino.destroy();
    }
    vinosArray.splice(0, vinosArray.length);

    clearInterval(moverObjetos);
    clearInterval(generaObstaculo);
    clearInterval(generaVinos);
    
    if (posicionTop >= 410) { // si llego al suelo
        clearInterval(intervaloCaida);
    }
}

//fix Anim Dead
setInterval(() => {
    if (murio) {
        fisura.classList.remove('drink', 'afk', 'walk', 'attack');
        fisura.classList.add('dead'); // Aplicar la animación de muerte

        // Detener cualquier lógica adicional después de que la animación termine
        setTimeout(() => {
            fisura.style.animationPlayState = 'paused'; // Pausar la animación para evitar reinicios
        }, 700); // Tiempo de duración de la animación (debe coincidir con el CSS)
        
    }
}, 10);