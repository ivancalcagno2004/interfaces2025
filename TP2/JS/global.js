"use strict";
const sections = document.querySelectorAll("section");
const footer = document.querySelector("footer");
const menuHamburguesa = document.querySelector(".hamburguesa");
menuHamburguesa.addEventListener("click", function(){
    const menu = document.querySelector(".menu_hamburguesa");
    menu.classList.toggle("ocultar");
    menu.classList.toggle("animate__fadeInLeft");
    footer.classList.toggle("ocultar");
    
    secciones.forEach((seccion) => {
        seccion.classList.toggle("opacar");
    });
});