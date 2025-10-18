"use strict"

const perfil = document.querySelector('.bi-person-circle');
const perfil_box = document.querySelector('.perfil_usuario');
const btnJugar = document.querySelector('.btn-jugar');
const btnElegir = document.querySelector('.btn-elegir');
btnElegir.classList.add("ocultar");

perfil.addEventListener('click', () => {
    perfil_box.classList.toggle("ocultar");
    perfil_box.classList.toggle("mostrar"); 
    perfil_box.classList.add("animate__fadeInDown");
});

// Configuración del canvas
const canvas = document.getElementById('ejecucion-juego');
const ctx = canvas.getContext('2d');

const imagenes = [
        '../images/blocka/spiderman.jpg', // 0
        '../images/blocka/superman.jpg', // 1
        '../images/blocka/capitan-america.png', // 2
        '../images/blocka/batman.png',  // 3
        '../images/blocka/ironman.png', // 4
        '../images/blocka/thor.png' // 5
    ];

// Evita el menú contextual por defecto en el canvas
canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Coordenadas y tamaño de las piezas del puzzle
const piezasPuzzle = [
    { x: 500, y: 170, w: 125, h: 125 }, // Arriba izquierda
    { x: 500 + 125 + 10, y: 170, w: 125, h: 125 }, // Arriba derecha
    { x: 500, y: 170 + 125 + 10, w: 125, h: 125 }, // Abajo izquierda
    { x: 500 + 125 + 10, y: 170 + 125 + 10, w: 125, h: 125 } // Abajo derecha
];

// Maneja clicks en el canvas
canvas.addEventListener('mousedown', function(e) {
    // Solo si estamos en el juego
    if (btnElegir.classList.contains("ocultar") && !perdio) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Busca sobre qué pieza hizo click
        for (let i = 0; i < piezasPuzzle.length; i++) {
            const p = piezasPuzzle[i];
            if (
                mouseX >= p.x && mouseX <= p.x + p.w &&
                mouseY >= p.y && mouseY <= p.y + p.h
            ) {
                // Click izquierdo: rota a la izquierda
                if (e.button === 0) { // e.button === 0 es click izquierdo
                    rotacionesPiezas[i] += Math.PI / 2;
                }
                // Click derecho: rota a la derecha
                if (e.button === 2) {
                    rotacionesPiezas[i] -= Math.PI / 2;
                }
            }
        }
    }
});

// Dimensiones del canvas
const width = canvas.width;
const height = canvas.height;

let imagenFondoHTML = new Image();
imagenFondoHTML.src = '../images/blocka/fondo-blocka.jpg';

imagenFondoHTML.onload = function() {
    ctx.filter = 'blur(5px)';
    ctx.drawImage(imagenFondoHTML, 0, 0, width, height);
};

let nivel = 1;
let perdio = false;

function cargarNivel(nivel) {
    if(!perdio) {
        let elegido = elegirSuperheroeRandom();
        setTimeout(() => {
            crearMenuJuego(imagenes[elegido], nivel);
        }, 2000); // espera a que se dibujen las imágenes
    }
    // Lógica para cuando se pierde
}

btnJugar.addEventListener('click', iniciarJuego);

function iniciarJuego() {
    ctx.filter = 'none';
    btnElegir.classList.remove("ocultar");
    ctx.drawImage(imagenFondoHTML, 0, 0, width, height);
    btnJugar.classList.add("ocultar");
    let imagenHeight = 150;
    let imagenWidth = 150;

    cargarImagenes(imagenHeight, imagenWidth);
}

function cargarImagenes(imagenHeight, imagenWidth) {
    let imagenSpidermanHTML = new Image();
    imagenSpidermanHTML.src = '../images/blocka/spiderman.jpg';

    imagenSpidermanHTML.onload = function() {
        ctx.drawImage(imagenSpidermanHTML, 25, 225, imagenWidth, imagenHeight);
    }

    let imagenSupermanHTML = new Image();
    imagenSupermanHTML.src = '../images/blocka/superman.jpg';

    imagenSupermanHTML.onload = function() {
        ctx.drawImage(imagenSupermanHTML, 225, 225, imagenWidth, imagenHeight);
    }

    let imagenCapitanAmericaHTML = new Image();
    imagenCapitanAmericaHTML.src = '../images/blocka/capitan-america.png';

    imagenCapitanAmericaHTML.onload = function() {
        ctx.drawImage(imagenCapitanAmericaHTML, 425, 225, imagenWidth, imagenHeight);
    }

    let imagenBatmanHTML = new Image();
    imagenBatmanHTML.src = '../images/blocka/batman.png';

    imagenBatmanHTML.onload = function() {
        ctx.drawImage(imagenBatmanHTML, 625, 225, imagenWidth, imagenHeight);
    }

    let imagenIronmanHTML = new Image();
    imagenIronmanHTML.src = '../images/blocka/ironman.png';

    imagenIronmanHTML.onload = function() {
        ctx.drawImage(imagenIronmanHTML, 825, 225, imagenWidth, imagenHeight);
    }

    let imagenThorHTML = new Image();
    imagenThorHTML.src = '../images/blocka/thor.png';
    imagenThorHTML.onload = function() {
        ctx.drawImage(imagenThorHTML, 1025, 225, imagenWidth, imagenHeight);
    }
}

function elegirSuperheroeRandom() {
    btnElegir.classList.add("ocultar");
    const posiciones = [
        { x: 25,   y: 225 },
        { x: 225,  y: 225 },
        { x: 425,  y: 225 },
        { x: 625,  y: 225 },
        { x: 825,  y: 225 },
        { x: 1025, y: 225 }
    ];
    
    const imagenWidth = 150;
    const imagenHeight = 150;

    // Elige un índice random
    let elegido = Math.floor(Math.random() * imagenes.length);

    // Dibuja fondo (reinicia el canvas)
    ctx.drawImage(imagenFondoHTML, 0, 0, width, height);
    // Dibuja todas las imágenes
    imagenes.forEach((src, i) => {
        const img = new Image();
        img.src = src;
        img.onload = function() {
            ctx.drawImage(img, posiciones[i].x, posiciones[i].y, imagenWidth, imagenHeight);
            // Si es la elegida, dibuja borde
            if (i === elegido) {
                ctx.save();
                ctx.strokeStyle = "#AB08F3";
                ctx.lineWidth = 8;
                ctx.shadowColor = "#AB08F3";
                ctx.shadowBlur = 16;
                ctx.beginPath();
                ctx.roundRect(posiciones[i].x - 6, posiciones[i].y - 6, imagenWidth + 12, imagenHeight + 12, 24);
                ctx.stroke();
                ctx.restore();
            }
        }
    });

    return elegido;
}

btnElegir.addEventListener('click', () => {
    if (btnElegir.textContent === "Siguiente Nivel") {
        nivel++;
    }
    cargarNivel(nivel);
});

let rotacionesPiezas = []; // Array global para guardar los ángulos de rotación


function crearMenuJuego(juegoElegido, nivel) {
    // Dibuja cuadrado gris y se reinicia el canvas (para que no queden los superhéroes seleccionados detrás)
    ctx.drawImage(imagenFondoHTML, 0, 0, width, height);
    ctx.save();
    ctx.fillStyle = '#182632';
    ctx.beginPath();
    ctx.roundRect(200, 50, 800, 500, 32);
    ctx.fill();
    ctx.restore();

    // Oculta el botón elegir
    btnElegir.classList.add("ocultar");

    // Crea el contador regresivo
    ctx.font = "28px Arial";
    ctx.fillStyle = "#fff";
    
    let carga = 0;
    
    // Configura el juego según el nivel
    if (nivel === 1) {
        carga = 59; // 60 segundos
    } else if (nivel === 2) {
        carga = 40; // 40 segundos
    } else if (nivel === 3) {
        carga = 20; // 20 segundos
    }
    ctx.fillText("0 : " + carga, 770, 120);
    
    // Dibuja la imagen del juego elegido
    let imagenJuego = new Image();
    imagenJuego.src = juegoElegido;
    //ctx.drawImage(imagenJuego, 500, 170, 250, 250);

    // Genera ángulos aleatorios para cada pieza (en radianes)
    rotacionesPiezas = [
        Math.floor(Math.random() * 4) * (Math.PI / 2), // Arriba izquierda
        Math.floor(Math.random() * 4) * (Math.PI / 2), // Arriba derecha
        Math.floor(Math.random() * 4) * (Math.PI / 2), // Abajo izquierda
        Math.floor(Math.random() * 4) * (Math.PI / 2) // Abajo derecha
    ];

    partirImagen(imagenJuego, 500, 170, 250, 250);
    // Inicia el contador
    contador(carga, imagenJuego, rotacionesPiezas);
}
let gano = false;
let record = 0;
function contador(carga, imagenJuego, rotacionesPiezas) {
    // Actualiza el contador cada segundo
    const intervalo = setInterval(() => {
        if (carga > 0) { // Mientras haya tiempo
            carga--;
            // Redibuja fondo y cuadrado gris
            ctx.drawImage(imagenFondoHTML, 0, 0, width, height);
            ctx.save();
            ctx.fillStyle = '#182632';
            ctx.beginPath();
            ctx.roundRect(200, 50, 800, 500, 32);
            ctx.fill();
            ctx.restore();
            ctx.font = "28px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("0 : " + carga, 770, 120);
            partirImagen(imagenJuego, 500, 170, 250, 250);
            if(!gano){ // Si no ganó aún
                // Verifica si todas las piezas están en la posición correcta (sin rotación)
                gano = rotacionesPiezas.every(angle => angle % (2 * Math.PI) === 0); // For each angle, comprueba si es múltiplo de 2π
            }else{ // Si ya ganó
                clearInterval(intervalo);
                // Muestra mensaje de victoria
                ctx.drawImage(imagenFondoHTML, 0, 0, width, height);
                ctx.save();
                ctx.fillStyle = '#182632';
                ctx.beginPath();
                ctx.roundRect(200, 50, 800, 500, 32);
                ctx.fill();
                ctx.restore();
                ctx.font = "28px Arial";
                ctx.fillStyle = "#fff";
                ctx.fillText("¡GANASTE CON UN TIEMPO DE 0 : " + carga + "!", 350, 300);

                // Boton de siguiente nivel o menu principal
                //llamar a cargarNivel con el siguiente nivel
                if(nivel < 3){
                    gano = false; // Reinicia la variable para el próximo nivel
                    btnElegir.classList.remove("ocultar");
                    btnElegir.textContent = "Siguiente Nivel";
                }else{
                    btnElegir.classList.remove("ocultar");
                    btnElegir.textContent = "Volver al Menú Principal";
                    nivel = 1; // Reinicia el nivel para la próxima vez
                }
            }

            // texto de nivel
            ctx.font = "48px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("Nivel " + nivel, 550, 120);

        } else { // Se terminó el tiempo
            clearInterval(intervalo);
            perdio = true;
            // Muestra mensaje de fin de juego
            ctx.drawImage(imagenFondoHTML, 0, 0, width, height);
            ctx.save();
            ctx.fillStyle = '#182632';
            ctx.beginPath();
            ctx.roundRect(200, 50, 800, 500, 32);
            ctx.fill();
            ctx.restore();
            ctx.font = "48px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("¡Tiempo terminado! Perdiste", 350, 300);
            btnElegir.classList.remove("ocultar");
            btnElegir.textContent = "Volver al Menú Principal";
            nivel = 1; // Reinicia el nivel para la próxima vez
        }
    }, 1000);
}

function partirImagen(imagenOriginal, posX, posY, height, width) {
    let imagenPartida = new Image();
    imagenPartida.src = imagenOriginal.src;

    let piezaWidth = imagenPartida.width / 2;
    let piezaHeight = imagenPartida.height / 2;

    // Coordenadas de destino de cada pieza
    const destinos = [
        { dx: posX, dy: posY },
        { dx: posX + width / 2 + 10, dy: posY },
        { dx: posX, dy: posY + height / 2 + 10 },
        { dx: posX + width / 2 + 10, dy: posY + height / 2 + 10 }
    ];

    // Dibuja cada pieza rotada
    for (let i = 0; i < 4; i++) {
        ctx.save();
        // Centro de la pieza destino
        let centroX = destinos[i].dx + (width / 4);
        let centroY = destinos[i].dy + (height / 4);
        ctx.translate(centroX, centroY);
        ctx.rotate(rotacionesPiezas[i]);

        // Dibuja la pieza centrada en (0,0)
        ctx.drawImage(imagenPartida, (i % 2) * piezaWidth, 
            Math.floor(i / 2) * piezaHeight, 
            piezaWidth, piezaHeight,
            -width / 4, -height / 4, 
            width / 2, height / 2
        );
        ctx.restore();
    }

}
