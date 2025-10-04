"use strict";

const menuHamburguesa = document.querySelector(".hamburguesa");
menuHamburguesa.addEventListener("click", function(){
    const menu = document.querySelector(".menu_hamburguesa");
    menu.classList.toggle("ocultar");
    menu.classList.toggle("animate__fadeInLeft");
    
});