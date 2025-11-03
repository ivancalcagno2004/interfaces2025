"use strict"
import { Juego } from "./Juego.js";

const perfil = document.querySelector('.bi-person-circle');
const perfil_box = document.querySelector('.perfil_usuario');
const btn_jugar = document.querySelector('.btn-jugar');
const btn_comenzar = document.querySelector('.btn-comenzar');
const btn_volver_menu = document.querySelector('.btn-volver-menu');
btn_comenzar.classList.add("ocultar");
btn_volver_menu.classList.add("ocultar");


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

btn_jugar.addEventListener('click', () => {
    btn_jugar.classList.add("ocultar")
    juego.tablero.cargarMenu();
    btn_comenzar.classList.remove("ocultar");
});

btn_comenzar.addEventListener('click', () => {
    btn_comenzar.classList.add("ocultar");
    juego.iniciar();
    btn_volver_menu.classList.remove("ocultar");
});

btn_volver_menu.addEventListener('click', () => {
    btn_volver_menu.classList.add("ocultar");
    btn_comenzar.classList.remove("ocultar");
    juego.tablero.cargarFondo();
    juego.tablero.cargarMenu();

});