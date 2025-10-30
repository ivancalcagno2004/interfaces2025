"use strict"
import { Juego } from "./Juego.js";
import { Tablero } from "./Tablero.js";

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
const ctx = canvas.getContext('2d');
// Dimensiones del canvas
const width = canvas.width;
const height = canvas.height;

let matrizJuego = [ // 2: espacio invalido // 1: hay ficha // 0: espacio vacio
    [2, 2, 1, 1, 1, 2, 2],
    [2, 2, 1, 1, 1, 2, 2],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [2, 2, 1, 1, 1, 2, 2],
    [2, 2, 1, 1, 1, 2, 2],
];

const juego = new Juego(ctx, width, height, matrizJuego);
