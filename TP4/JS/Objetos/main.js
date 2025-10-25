"use strict"

import { Auto } from "./Auto.js";
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

const juego = new Juego();

const tablero = new Tablero(ctx, width, height);
tablero.cargarFondo();
tablero.dibujar();