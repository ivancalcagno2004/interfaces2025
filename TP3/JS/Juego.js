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

// Dimensiones del canvas
const width = canvas.width;
const height = canvas.height;

let imagenFondoHTML = new Image();
imagenFondoHTML.src = '../images/blocka/fondo-blocka.jpg';

imagenFondoHTML.onload = function() {
    ctx.filter = 'blur(5px)';
    ctx.drawImage(imagenFondoHTML, 0, 0, width, height);
};

btnJugar.addEventListener('click', () => {
    ctx.filter = 'none';
    btnElegir.classList.remove("ocultar");
    ctx.drawImage(imagenFondoHTML, 0, 0, width, height);
    btnJugar.classList.add("ocultar");
    let imagenHeight = 150;
    let imagenWidth = 150;
    cargarImagenes(imagenHeight, imagenWidth);
});

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
    const posiciones = [
        { x: 25,   y: 225 },
        { x: 225,  y: 225 },
        { x: 425,  y: 225 },
        { x: 625,  y: 225 },
        { x: 825,  y: 225 },
        { x: 1025, y: 225 }
    ];
    const imagenes = [
        '../images/blocka/spiderman.jpg',
        '../images/blocka/superman.jpg',
        '../images/blocka/capitan-america.png',
        '../images/blocka/batman.png',
        '../images/blocka/ironman.png',
        '../images/blocka/thor.png'
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
}

// Llama a la función cuando el usuario presiona el botón elegir
btnElegir.addEventListener('click', elegirSuperheroeRandom);
