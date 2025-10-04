"use strict";
const loading = document.querySelector(".load-container");
const body = document.querySelectorAll("section");

setTimeout(() => {
    loading.classList.remove("mostrar");
    loading.classList.add("ocultar");
}, 5000);

body.forEach(seccion => {
    seccion.classList.add("ocultar");
    
    setTimeout(() => {
        seccion.classList.remove("ocultar");
        seccion.classList.add("mostrar");
    }, 5000)
});