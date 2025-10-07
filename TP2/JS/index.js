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

const btnSubmitRegistro = document.querySelector(".submit-form-register"); // tomo los botones de enviar de ambos formularios
const btnSubmitLogin = document.querySelector(".submit-form-login"); // tomo los botones de enviar de ambos formularios
const alertBox = document.querySelector(".alert");
const contenedorMensaje = alertBox.querySelector("p");
let mensaje= "";

btnSubmitRegistro.addEventListener("click", function(event){
    event.preventDefault(); // previene el comportamiento por defecto del botón (recargar la página)
    if(validarFormRegistro()){ // si el formulario es válido
        mensaje = "Registro exitoso. Redirigiendo a la página de inicio...";
        contenedorMensaje.innerHTML = mensaje;
        alertBox.classList.remove("ocultar");
        alertBox.classList.add("mostrar", "animate__fadeInDown");
        setTimeout(() => {
            window.location.href = "Home.html"; // redirige a Home.html
        }, 3000);
    }else{
        mensaje = "Por favor, complete todos los campos obligatorios.";
        contenedorMensaje.innerHTML = mensaje;
        alertBox.classList.remove("ocultar");
        alertBox.classList.add("mostrar", "animate__shakeX");
        setTimeout(() => {
            alertBox.classList.add("ocultar");
            alertBox.classList.remove("mostrar", "animate__shakeX");
        }, 5000); // oculta la alerta después de 5 segundos
    }
});

btnSubmitLogin.addEventListener("click", function(event){
    event.preventDefault(); // previene el comportamiento por defecto del botón (recargar la página)
    if(validarFormLogin()){ // si el formulario es válido
        mensaje = "Logueado correctamente. Redirigiendo a la página de inicio...";
        contenedorMensaje.innerHTML = mensaje;
        alertBox.classList.remove("ocultar");
        alertBox.classList.add("mostrar", "animate__fadeInDown");
        setTimeout(() => {
            window.location.href = "Home.html"; // redirige a Home.html
        }, 3000);
    }else{
        mensaje = "Por favor, complete todos los campos obligatorios.";
        contenedorMensaje.innerHTML = mensaje;
        alertBox.classList.remove("ocultar");
        alertBox.classList.add("mostrar", "animate__shakeX");
        setTimeout(() => {
            alertBox.classList.add("ocultar");
            alertBox.classList.remove("mostrar", "animate__shakeX");
        }, 5000); // oculta la alerta después de 5 segundos
    }
});

// Validación de formularios
const inputsRegistro = document.querySelectorAll("input.required-input-register"); // selecciona todos los inputs que tienen la clase 'required-input'
const inputsLogin = document.querySelectorAll("input.required-input-login"); 

function validarFormRegistro(){
    let valid = true;
    inputsRegistro.forEach(input => {
        // busca label por for="{id}" o usa fallback
        let label = document.querySelector(`label[for="${input.id}"]`);
        
        if (input.value.trim() === "") {
            valid = false;
            input.classList.add("input-error");
            label.classList.add("label-error");
        } else {
            input.classList.remove("input-error");
            label.classList.remove("label-error");
        }
    });
    return valid;
}

function validarFormLogin(){
    let valid = true;
    inputsLogin.forEach(input => {
        // busca label por for="{id}" o usa fallback
        let label = document.querySelector(`label[for="${input.id}"]`);
        
        if (input.value.trim() === "") {
            valid = false;
            input.classList.add("input-error");
            label.classList.add("label-error");
        } else {
            input.classList.remove("input-error");
            label.classList.remove("label-error");
        }
    });
    return valid;
}
