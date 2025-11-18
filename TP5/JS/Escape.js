let botonJugar = document.querySelector('.btn-jugar');
let fisura = document.querySelector('.fisura');

let gravedad = 2; // Velocidad de caída
let velocidadSalto = -20; // Velocidad de salto (negativa para subir)
let posicionTop = 200; // Posición inicial en "top"
let isJumping = false; // Bandera para evitar múltiples saltos
let intervaloCaida; // Intervalo para la gravedad
let murio = false;

// Inicia el juego al presionar el botón "Jugar"
botonJugar.addEventListener('click', () => {
    botonJugar.classList.add('ocultar');
    fisura.classList.add('run');

    // Inicia el bucle de gravedad
    intervaloCaida = setInterval(() => {
        if (!isJumping && !murio) {
            posicionTop += gravedad; // La gravedad hace que baje
            fisura.style.top = `${posicionTop}px`;
        }
    }, 10); // Actualiza cada 10ms
});

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        if (!isJumping && !murio) {
            isJumping = true; // Evita múltiples saltos
            fisura.classList.remove('afk');
            fisura.classList.add('jump');

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
                fisura.classList.remove('jump');
                fisura.classList.add('afk');
            }, 800); // Cambia a 'afk' después de completar el salto
        }
    }
});

// Evita que la fisura se salga de la pantalla
setInterval(() => {
    if(posicionTop >= 410 || posicionTop <= -80){
        fisura.classList.remove('jump', 'afk');
        fisura.classList.add('dead');
        setTimeout(() => {
            fisura.style.animationPlayState = 'paused';
        }, 750); // Pausa la animación antes de que termine y se ponga de pie en el último frame
        murio = true;
    }
}, 10); // Revisa cada 10ms que no se salga de los límites