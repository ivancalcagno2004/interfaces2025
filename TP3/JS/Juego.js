"use strict"

const perfil = document.querySelector('.bi-person-circle');
const perfil_box = document.querySelector('.perfil_usuario');
const btnJugar = document.querySelector('.btn-jugar');

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

let imagenHTML = new Image();
imagenHTML.src = '../images/blocka/fondo-blocka.jpg';

imagenHTML.onload = function() {
    ctx.drawImage(imagenHTML, 0, 0, width, height);
};