import { Obstaculo } from "./ObjetosCarcel/Obstaculo.js";
import { Vino } from './ObjetosCarcel/Vino.js';
let botonJugar = document.querySelector('.play');
let botonReset = document.querySelector('.reset');
let fisura = document.querySelector('.fisura');
let cartelEscape = document.querySelector('.cartelEscape');
let cartelLost = document.querySelector('.cartelLost');
let contador = document.querySelector('.contador');
let contadorBirras = document.querySelector('.contadorBirras');
let contadorVinos = 0;
let gravedad = 2; // Velocidad de caída
let velocidadSalto = -20; // Velocidad de salto (negativa para subir)
let posicionTop = 400; // Posición inicial en "top"
const radioFisura = 64; // Radio de colisión de la fisura
let isJumping = false; // Bandera para evitar múltiples saltos
let intervaloCaida; // Intervalo para la gravedad
let fisuraDead; // Intervalo para revisar si la fisura se sale de la pantalla
let murio = false;
let generaObstaculo;
let generaVinos;
let moverObjetos;
const obstaculos = [];

const vinosArray = [];


function generarVino() {
    let posYrandom = Math.floor(Math.random() * 400); // Altura aleatoria entre 300 y 500
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

        // Eliminar el obstáculo si sale de la pantalla
        if (obstaculo.posX < -500) {
            console.log('Obstáculo eliminado');
            obstaculo.destroy(); // elimina el objeto de la vista
            obstaculos.splice(i, 1); // Eliminar del arreglo
        }
    }
}

fisura.style.top = `${posicionTop}px`;
fisura.classList.add('walk');

// Inicia el juego al presionar el botón "Jugar"
botonJugar.addEventListener('click', () => {
    contador.classList.remove('ocultar');
    contador.classList.add('mostrar');
    fisura.classList.remove('walk');
    fisura.classList.add('drink');
    posicionTop -= 200; // Pequeño salto inicial al comenzar
    fisura.style.animationPlayState = 'running';
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
            moverObstaculos();
            moverVinos();
        }, 10);

        botonJugar.classList.add('ocultar');
        fisura.classList.add('afk');
        cartelEscape.classList.add('ocultar');

        // Inicia el bucle de gravedad
        intervaloCaida = setInterval(() => {
            if (!isJumping && !murio) {
                posicionTop += gravedad; // La gravedad hace que baje
                fisura.style.top = `${posicionTop}px`;
            }
            if (murio && posicionTop < 410) { // Si murió, sigue cayendo hasta el suelo
                posicionTop += gravedad;
                fisura.style.top = `${posicionTop}px`;
                fisura.classList.remove('drink', 'afk');
                fisura.classList.add('dead');
                setTimeout(() => {
                    fisura.style.animationPlayState = 'paused';
                }, 800); // Pausa la animación antes de que termine y se ponga de pie en el último frame
            }
        }, 10); // Actualiza cada 10ms
    }, 1000);

    // Evita que la fisura se salga de la pantalla
    fisuraDead = setInterval(() => {
        if (posicionTop >= 410 || posicionTop <= -80) {
            if (!murio) {
                cartelLost.classList.remove('ocultar');
                cartelLost.classList.add('mostrar');
                contadorBirras.textContent = `Agarraste ${contadorVinos} birras 🍻`;
                perdiste();
                fisura.classList.remove('drink', 'afk');
                fisura.classList.add('dead');

                setTimeout(() => {
                    fisura.style.animationPlayState = 'paused';
                }, 750); // Pausa la animación antes de que termine y se ponga de pie en el último frame
                murio = true;
            }
        }
    }, 10); // Revisa cada 10ms que no se salga de los límites
});

// Reinicia el juego al presionar el botón "Reset"
botonReset.addEventListener('click', () => {
    // Reinicia la posición y el estado del juego
    posicionTop = 400;
    fisura.style.top = `${posicionTop}px`;
    fisura.classList.remove('dead', 'drink', 'afk');
    fisura.classList.add('walk');
    cartelLost.classList.remove('mostrar');
    cartelLost.classList.add('ocultar');
    cartelEscape.classList.remove('ocultar');
    cartelEscape.classList.add('mostrar');
    botonJugar.classList.remove('ocultar');
    botonJugar.classList.add('mostrar');
    murio = false;
    fisura.style.animationPlayState = 'running';

    clearInterval(intervaloCaida);
    clearInterval(fisuraDead);
    clearInterval(moverObjetos);
    clearInterval(generaObstaculo);
    clearInterval(generaVinos);
    contadorVinos = 0;
    // Elimina todos los obstáculos existentes
    for (const obstaculo of obstaculos) {
        obstaculo.destroy();
    }
    obstaculos.splice(0, obstaculos.length);
    // Elimina todos los vinos existentes
    for (const vino of vinosArray) {
        vino.destroy();
    }
    vinosArray.splice(0, vinosArray.length);
})

///se detecta la tecla espacio o flecha arriba para saltar///
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        if (!isJumping && !murio) {
            isJumping = true; // Evita múltiples saltos
            fisura.classList.remove('afk');
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

const fisuraRect = fisura.getBoundingClientRect(); // Obtener las coordenadas reales de fisura

const fisuraX = fisuraRect.left + fisuraRect.width / 2; // Centro horizontal de fisura

//////////check colisiones//////////
setInterval(() => {
    const fisuraY = posicionTop + fisuraRect.height - 20; // Centro vertical de fisura
    for (const vino of vinosArray) {
        if (!vino.collected && vino.estaColisionando(fisuraX, fisuraY, radioFisura * 2)) {
            vino.collected = true;
            contadorVinos++;
            console.log(`Vino recogido! Total: ${contadorVinos}`);
        }
    }

    for (const obstaculo of obstaculos) {
        if (obstaculo.estaColisionando(fisuraX, fisuraY, radioFisura)) {
            console.log("Colisión con el obstáculo detectada");
        }
    }
}, 10);

// Crear un elemento para visualizar el hitbox de fisura
const hitboxFisura = document.createElement('div');
hitboxFisura.style.position = 'absolute';
hitboxFisura.style.width = `${radioFisura * 2}px`; // Doble del radio
hitboxFisura.style.height = `${radioFisura * 2}px`; // Doble del radio
hitboxFisura.style.border = '2px dashed blue'; // Borde azul para visualizar el hitbox
hitboxFisura.style.borderRadius = '50%'; // Hacerlo circular
hitboxFisura.style.pointerEvents = 'none'; // Evitar que interfiera con eventos
hitboxFisura.style.zIndex = '999'; // Asegurarse de que esté encima de otros elementos
document.body.appendChild(hitboxFisura);

// Actualizar la posición del hitbox en tiempo real
// Actualizar la posición del hitbox en tiempo real
setInterval(() => {
    const fisuraY = posicionTop + fisuraRect.height - 20; // Centro vertical de fisura
    hitboxFisura.style.left = `${fisuraX - radioFisura}px`; // Centrar el hitbox horizontalmente
    hitboxFisura.style.top = `${fisuraY - radioFisura}px`; // Centrar el hitbox verticalmente
}, 10);

setInterval(() => {
    contador.textContent = `Vinos: ${contadorVinos}`;
}, 10);

function perdiste() {
    // Elimina todos los obstáculos existentes
    clearInterval(intervaloCaida);
    clearInterval(fisuraDead);
    clearInterval(moverObjetos);
    clearInterval(generaObstaculo);
    clearInterval(generaVinos);

    contadorVinos = 0;
    for (const obstaculo of obstaculos) {
        obstaculo.destroy();
    }
    obstaculos.splice(0, obstaculos.length);
    // Elimina todos los vinos existentes
    for (const vino of vinosArray) {
        vino.destroy();
    }
    vinosArray.splice(0, vinosArray.length);
}