"use strict"
const menuHamburguesa = document.querySelector(".hamburguesa");

menuHamburguesa.addEventListener("click", function(){
    const menu = document.querySelector(".menu");
    menu.classList.toggle("mostrar");
});