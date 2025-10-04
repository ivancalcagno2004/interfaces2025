"use strict";
const tiempo = 5000;
const loading = document.querySelector(".load-container"); // contenedor del loading
const body = document.querySelectorAll("section"); // todas las secciones del body

// Ocultar el loading después de 5 segundos y mostrar el contenido del body

setTimeout(() => {
  // después de 5 segundos oculto el loading
  loading.classList.remove("mostrar");
  loading.classList.add("ocultar");
}, tiempo);

body.forEach((seccion) => {
  seccion.classList.add("ocultar"); // oculto todas las secciones del body al cargar la página

  setTimeout(() => {
    // después de 5 segundos muestro todas las secciones del body
    seccion.classList.remove("ocultar");
    seccion.classList.add("mostrar");
  }, tiempo);   
});

const porcentaje = document.querySelector(".porcentaje"); // duracion total 5 segundos
let carga = 0;
const tiempo_carga = setInterval(() => {
  if (carga < 100) {
    carga++;
    porcentaje.innerHTML = `${carga}%`;
  } else {
    clearInterval(tiempo_carga);
  }
}, tiempo / 100); // actualiza el porcentaje cada 50 ms (5000 ms / 100)

setTimeout(() => {
  loading.classList.remove("mostrar");
  loading.classList.add("ocultar");
}, tiempo);

body.forEach((seccion) => {
  seccion.classList.add("ocultar");

  setTimeout(() => {
    seccion.classList.remove("ocultar");
    seccion.classList.add("mostrar");
  }, tiempo);
});
