"use strict";

const signIn = document.querySelectorAll(".sign-in"); // tomo el texto "Iniciar Sesión" y "Registrarse"
signIn.forEach( boton => {
    boton.addEventListener("click", toggleForm);  // al hacer click en cualquiera de los dos textos, se ejecuta la función toggleForm
});

function toggleForm(){ // función que alterna entre los formularios de registro e inicio de sesión
    const formRegistro = document.querySelector(".form_registro");
    const formLogin = document.querySelector(".form_login");
    formRegistro.classList.toggle("animate__fadeInDown");
    formRegistro.classList.toggle("mostrar");
    formRegistro.classList.toggle("ocultar");
    formLogin.classList.toggle("animate__fadeInDown");
    formLogin.classList.toggle("ocultar");
    formLogin.classList.toggle("mostrar");
}

const btnSubmit = document.querySelectorAll(".submit-form"); // tomo los botones de enviar de ambos formularios
btnSubmit.forEach( boton => { // por cada boton
    boton.addEventListener("click", function(event){
        event.preventDefault(); // previene el comportamiento por defecto del botón (recargar la página)
        // Se registra o inicia sesión
        window.location.href = "Home.html"; // redirige a Home.html
    });
});