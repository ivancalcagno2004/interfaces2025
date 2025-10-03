"use strict";
const menuHamburguesa = document.querySelector(".hamburguesa");

menuHamburguesa.addEventListener("click", function(){
    const menu = document.querySelector(".menu");
    menu.classList.toggle("mostrar");
});

const signIn = document.querySelectorAll(".sign-in");
signIn.forEach( boton => {
    boton.addEventListener("click", toggleForm);
});

function toggleForm(){
    const formRegistro = document.querySelector(".form_registro");
    const formLogin = document.querySelector(".form_login");
    formRegistro.classList.toggle("animate__fadeInDown");
    formRegistro.classList.toggle("mostrar");
    formRegistro.classList.toggle("ocultar");
    formLogin.classList.toggle("animate__fadeInDown");
    formLogin.classList.toggle("ocultar");
    formLogin.classList.toggle("mostrar");
}

const btnSubmit = document.querySelectorAll(".submit-form");
btnSubmit.forEach( boton => {
    boton.addEventListener("click", function(event){
        event.preventDefault();
        // Se registra o inicia sesión
        window.location.href = "Home.html";
    });
});