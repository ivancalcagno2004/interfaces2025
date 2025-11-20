import { Obstaculo } from "./ObjetosCarcel/Obstaculo.js";

let botonJugar = document.querySelector('.play');
let botonReset = document.querySelector('.reset');
let fisura = document.querySelector('.fisura');
let cartelEscape = document.querySelector('.cartelEscape');
let cartelLost = document.querySelector('.cartelLost');

let gravedad = 2; // Velocidad de caída
let velocidadSalto = -20; // Velocidad de salto (negativa para subir)
let posicionTop = 400; // Posición inicial en "top"
let isJumping = false; // Bandera para evitar múltiples saltos
let intervaloCaida; // Intervalo para la gravedad
let fisuraDead; // Intervalo para revisar si la fisura se sale de la pantalla
let murio = false;
let obstaculos = [];
let obstaculo1 = new Obstaculo(1100, 350);

fisura.style.top = `${posicionTop}px`;
fisura.classList.add('walk');

// Inicia el juego al presionar el botón "Jugar"
botonJugar.addEventListener('click', () => {
    fisura.classList.remove('walk');
    fisura.classList.add('drink');
    posicionTop -= 200; // Pequeño salto inicial al comenzar
    fisura.style.animationPlayState = 'running';
    setTimeout(() => {
        // inicia a mover objetos
        setInterval(() => {
            obstaculo1.setPosX(obstaculo1.posX - 5);
        }, 10); // Aquí podrías agregar lógica para mover los obstáculos o crear más
    
        botonJugar.classList.add('ocultar');
        fisura.classList.add('afk');
        cartelEscape.classList.add('ocultar');
    
        // Inicia el bucle de gravedad
        intervaloCaida = setInterval(() => {
            if (!isJumping && !murio) {
                posicionTop += gravedad; // La gravedad hace que baje
                fisura.style.top = `${posicionTop}px`;
            }
            if(murio && posicionTop < 410){ // Si murió, sigue cayendo hasta el suelo
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
        if(posicionTop >= 410 || posicionTop <= -80){
            if (!murio) {   
                fisura.classList.remove('drink', 'afk');
                fisura.classList.add('dead');
                cartelLost.classList.remove('ocultar');
                cartelLost.classList.add('mostrar');
                
                setTimeout(() => {
                    fisura.style.animationPlayState = 'paused';
                }, 750); // Pausa la animación antes de que termine y se ponga de pie en el último frame
                murio = true;
            }
        }
    }, 10); // Revisa cada 10ms que no se salga de los límites
});



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
})

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


