"use strict"

const perfil = document.querySelector('.bi-person-circle');
const perfil_box = document.querySelector('.perfil_usuario');

perfil.addEventListener('click', () => {
    perfil_box.classList.toggle("ocultar");
    perfil_box.classList.toggle("mostrar"); 
    perfil_box.classList.add("animate__fadeInDown");
});

///////////////////////////// CONSTANTES Y VARIABLES DEL JUEGO /////////////////////////////
// Configuración del canvas
const canvas = document.getElementById('ejecucion-juego');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
// Dimensiones del canvas
const width = canvas.width;
const height = canvas.height;

const imagenes = [
        '../images/blocka/spiderman.jpg', // 0
        '../images/blocka/superman.jpg', // 1
        '../images/blocka/capitan-america.png', // 2
        '../images/blocka/batman.png',  // 3
        '../images/blocka/ironman.png', // 4
        '../images/blocka/thor.png' // 5
];

// Coordenadas y tamaño de las piezas del puzzle
const piezasPuzzle = [
    { x: 500, y: 170, w: 125, h: 125 }, // Arriba izquierda
    { x: 500 + 125 + 10, y: 170, w: 125, h: 125 }, // Arriba derecha
    { x: 500, y: 170 + 125 + 10, w: 125, h: 125 }, // Abajo izquierda
    { x: 500 + 125 + 10, y: 170 + 125 + 10, w: 125, h: 125 } // Abajo derecha
];

let rotacionesPiezas = []; // Array global para guardar los ángulos de rotación
let gap = 10; // Espacio entre piezas

///////////////////////////////////// ESTADO DEL JUEGO /////////////////////////////////////

// Variables del juego
let nivel = 1;
let perdio = false;
let gano = false;
let record = 0;

// Botones del juego
const btnJugar = document.querySelector('.btn-jugar');
const btnElegir = document.querySelector('.btn-elegir');
const btnVolverMenu = document.querySelector('.btn-volver-menu');
const btnSigNivel = document.querySelector('.btn-sig-nivel');
btnSigNivel.classList.add("ocultar");
btnVolverMenu.classList.add("ocultar");
btnElegir.classList.add("ocultar");

////////////////////////////////////////////////////////////////////////////////////////////////

// Carga y dibuja la imagen de fondo

let imagenFondoHTML = new Image();
imagenFondoHTML.src = '../images/blocka/fondo-blocka.jpg';

imagenFondoHTML.onload = function() {
    ctx.filter = 'blur(5px)';
    ctx.drawImage(imagenFondoHTML, 0, 0, width, height);
};

/////////////////////////////////////// EVENTOS CLICK ///////////////////////////////////////

btnJugar.addEventListener('click', iniciarJuego);
btnVolverMenu.addEventListener('click', iniciarJuego);
btnElegir.addEventListener('click', () => {
    cargarNivel(nivel);
});
btnSigNivel.addEventListener('click', () => {
    nivel++;
    cargarNivel(nivel);
});

// Maneja clicks en el canvas para rotar piezas (obtiene coordenadas del mouse y verifica sobre qué pieza se hizo click)
canvas.addEventListener('mousedown', function(e) {
    // Solo si estamos en el juego
    if (btnElegir.classList.contains("ocultar") && !perdio) {
        const rect = canvas.getBoundingClientRect(); // obtiene la posición del canvas en la pantalla
        const mouseX = e.clientX - rect.left; // coordenada X del mouse dentro del canvas
        const mouseY = e.clientY - rect.top; // coordenada Y del mouse dentro del canvas

        // Busca sobre qué pieza hizo click
        for (let i = 0; i < piezasPuzzle.length; i++) { // por cada pieza
            const p = piezasPuzzle[i]; // pieza actual
            if (
                mouseX >= p.x && mouseX <= p.x + p.w &&
                mouseY >= p.y && mouseY <= p.y + p.h
            ) {
                // Click izquierdo: rota a la izquierda
                if (e.button === 0) { // e.button === 0 es click izquierdo
                    rotacionesPiezas[i] -= Math.PI / 2; // a la pieza i le resto 90 grados (en radianes)
                }
                // Click derecho: rota a la derecha
                if (e.button === 2) {
                    rotacionesPiezas[i] += Math.PI / 2; // a la pieza i le sumo 90 grados (en radianes)
                }
            }
        }
    }
});

// Evita el menú contextual por defecto en el canvas
canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

/////////////////////////////////////// FUNCIONES ///////////////////////////////////////

function iniciarJuego() {
    btnVolverMenu.classList.add("ocultar");
    btnSigNivel.classList.add("ocultar");
    btnJugar.classList.add("ocultar");
    perdio = false;
    gano = false;
    nivel = 1;
    btnElegir.classList.remove("ocultar");

    ctx.filter = 'none';
    ctx.drawImage(imagenFondoHTML, 0, 0, width, height);
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

function cargarNivel(nivel) { // carga el nivel seleccionado (es irrelevante pasar el nivel acá ya que es una variable global, pero lo dejo para futuras mejoras)
    // Oculta botones
    btnSigNivel.classList.add("ocultar");
    btnVolverMenu.classList.add("ocultar");

    if(!perdio) {
        let elegido = elegirSuperheroeRandom();
        setTimeout(() => {
            crearMenuJuego(imagenes[elegido], nivel); // carga el menú del juego con la imagen elegida (gris)
        }, 4000); //muetra cargando nivel por 4 segundos
    }
    // Lógica para cuando se pierde
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

    ctx.save();
    ctx.font = "48px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Cargando nivel...", 610, 500);
    ctx.restore();

    return elegido;
}

function crearMenuJuego(juegoElegido, nivel) {
    // Dibuja cuadrado gris y se reinicia el canvas (para que no queden los superhéroes seleccionados detrás)
    cargarCanvasNivel();

    // Oculta el botón elegir
    btnElegir.classList.add("ocultar");

    // Crea el contador regresivo
    ctx.font = "28px Arial";
    ctx.fillStyle = "#fff";
    
    let carga = 0;
    let filtroActual;
    
    // Configura el juego según el nivel
    if (nivel === 1) {
        carga = 59; // 60 segundos
        filtroActual = filtroGris;
    } else if (nivel === 2) {
        carga = 40; // 40 segundos
        filtroActual = filtroBrillo30;
    } else if (nivel === 3) {
        carga = 20; // 20 segundos
        filtroActual = filtroNegativo;
    }

    ctx.fillText("0 : " + carga, 770, 120);
    
    // Dibuja la imagen del juego elegido
    let imagenJuego = new Image();
    imagenJuego.src = juegoElegido; // <img src="juegoElegido">

    // Genera ángulos aleatorios para cada pieza (en radianes)
    rotacionesPiezas = [
        Math.floor(Math.random() * 4) * (Math.PI / 2), // Arriba izquierda
        Math.floor(Math.random() * 4) * (Math.PI / 2), // Arriba derecha
        Math.floor(Math.random() * 4) * (Math.PI / 2), // Abajo izquierda
        Math.floor(Math.random() * 4) * (Math.PI / 2) // Abajo derecha
    ];

    partirImagen(imagenJuego, 500, 170, 250, 250, filtroActual);
    // Inicia el contador
    contador(carga, imagenJuego, rotacionesPiezas, filtroActual);
}

function partirImagen(imagenOriginal, posX, posY, height, width, filtroActual) {
    // Usá el tamaño destino de las piezas, NO el de la imagen original
    let piezaWidth = width / 2;
    let piezaHeight = height / 2;

    const destinos = [
        { dx: posX, dy: posY },
        { dx: posX + piezaWidth + gap, dy: posY },
        { dx: posX, dy: posY + piezaHeight + gap },
        { dx: posX + piezaWidth + gap, dy: posY + piezaHeight + gap }
    ];

    for (let i = 0; i < 4; i++) {
        // Canvas temporal para la pieza
        const auxCanvas = document.createElement('canvas');
        auxCanvas.width = piezaWidth;
        auxCanvas.height = piezaHeight;
        const auxCtx = auxCanvas.getContext('2d');

        // Dibuja la pieza recortada en el canvas temporal
        auxCtx.drawImage(
            imagenOriginal,
            (i % 2) * (imagenOriginal.width / 2), Math.floor(i / 2) * (imagenOriginal.height / 2),
            imagenOriginal.width / 2, imagenOriginal.height / 2,
            0, 0, piezaWidth, piezaHeight
        );

        // Aplica el filtro SOLO a la pieza
        if(!gano){
            let imageData = auxCtx.getImageData(0, 0, piezaWidth, piezaHeight);
            let data = imageData.data;
            let w = imageData.width;
            let h = imageData.height;
            let r, g, b, a, index;
            for(let x = 0; x < w; x++){
                for(let y = 0; y < h; y++){
                    index = (x + y * w) * 4;
                    r = data[index + 0];
                    g = data[index + 1];
                    b = data[index + 2];
                    a = data[index + 3];
                    filtroActual(r, g, b, a, data, index); // filtroActual es una función pasada como parámetro
                }
            }
            auxCtx.putImageData(imageData, 0, 0);
        }

        // Dibuja la pieza filtrada y rotada en el canvas principal
        ctx.save();
        let centroX = destinos[i].dx + piezaWidth / 2; 
        let centroY = destinos[i].dy + piezaHeight / 2;
        ctx.translate(centroX, centroY); // Mantiene la pieza en el mismo lugar al rotar
        ctx.rotate(rotacionesPiezas[i]);//rota la imagen
        ctx.drawImage(auxCanvas, -piezaWidth / 2, -piezaHeight / 2, piezaWidth, piezaHeight);
        ctx.restore();
    }
}

function contador(carga, imagenJuego, rotacionesPiezas, filtroActual) {
    // Actualiza el contador cada segundo
    const intervalo = setInterval(() => {
        if (carga > 0) { // Mientras haya tiempo
            carga--;
            // Redibuja fondo y cuadrado gris
            cargarCanvasNivel();
            ctx.font = "28px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("0 : " + carga, 770, 120);
            partirImagen(imagenJuego, 500, 170, 250, 250, filtroActual);
            if(!gano){ // Si no ganó aún
                // Verifica si todas las piezas están en la posición correcta (sin rotación)
                gano = rotacionesPiezas.every(angle => angle % (2 * Math.PI) === 0); // For each angle, comprueba si es múltiplo de 2π
                cargarTextoNivel();
            }else{ // Si ya ganó
                clearInterval(intervalo);
                // Muestra mensaje de victoria
                cargarTextoNivel();
                setTimeout(() => { // Espera 2 segundo antes de mostrar el mensaje (para que el jugador vea la imagen sin filtro)
                    cargarCanvasNivel();
                    ctx.font = "28px Arial";
                    ctx.fillStyle = "#fff";
                    ctx.fillText("¡GANASTE CON UN TIEMPO DE 0 : " + carga + "!", 350, 300);
    
                    // Muestra boton de siguiente nivel o menu principal
                    if(nivel < 3){
                        gano = false; // Reinicia la variable para el próximo nivel
                        btnVolverMenu.classList.remove("ocultar");
                        btnSigNivel.classList.remove("ocultar");
                        cargarTextoNivel();
                    }else{
                        btnVolverMenu.classList.remove("ocultar");
                        cargarCanvasNivel();
                        ctx.font = "28px Arial";
                        ctx.fillStyle = "#fff";
                        ctx.fillText("¡GANASTE TODO EL JUEGO!", 400, 300);
                        ctx.fillText("Tu tiempo sobrante: 0 : " + carga, 420, 350);
                        nivel = 1;
                    }
                }, 2000);//ganas y te muestra dos segundos la imagen sin filtro
            }
        } else { // Se terminó el tiempo
            clearInterval(intervalo);
            perdio = true;
            // Muestra mensaje de fin de juego
            cargarCanvasNivel();
            ctx.font = "48px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("¡Tiempo terminado! Perdiste", 350, 300);
            btnVolverMenu.classList.remove("ocultar");
            nivel = 1; // Reinicia el nivel para la próxima vez
        }
    }, 1000);//ciontador cada un segundo
}

function cargarCanvasNivel(){
    ctx.drawImage(imagenFondoHTML, 0, 0, width, height);
    ctx.save();
    ctx.fillStyle = '#182632';
    ctx.beginPath();
    ctx.roundRect(200, 50, 800, 500, 32);
    ctx.fill();
    ctx.restore();
}

function cargarTextoNivel(){
    ctx.font = "48px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Nivel " + nivel, 550, 120);
}

///////////////////////////////////// FILTROS /////////////////////////////////////

function filtroGris(r, g, b, a, data, index){
    var gris = 0.299 * r + 0.587 * g + 0.114 * b; // Calcular el valor de gris promedio
    data[index + 0] = gris;
    data[index + 1] = gris;
    data[index + 2] = gris;
    data[index + 3] = a; // Mantener la opacidad original
}

function filtroBrillo30(r, g, b, a, data, index){
    data[index + 0] = Math.min(r + 30, 255); // Incrementar el canal rojo
    data[index + 1] = Math.min(g + 30, 255); // Incrementar el canal verde
    data[index + 2] = Math.min(b + 30, 255); // Incrementar el canal azul
    data[index + 3] = a; // Mantener la opacidad original
}

function filtroNegativo(r, g, b, a, data, index){
    data[index + 0] = 255 - r; // Invertir el canal rojo
    data[index + 1] = 255 - g; // Invertir el canal verde
    data[index + 2] = 255 - b; // Invertir el canal azul
    data[index + 3] = a; // Mantener la opacidad original
}