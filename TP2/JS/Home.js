"use strict";
const tiempo = 5000;
const loading = document.querySelector(".load-container"); // contenedor del loading
const secciones = document.querySelectorAll("section"); // todas las secciones del body

// Ocultar el loading después de 5 segundos y mostrar el contenido del body

setTimeout(() => {
  // después de 5 segundos oculto el loading
  loading.classList.remove("mostrar");
  loading.classList.add("ocultar");
}, tiempo);

secciones.forEach((seccion) => {
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

const leftArrow = document.querySelector('.carrousel-arrow.left');
const rightArrow = document.querySelector('.carrousel-arrow.right');
const cards = document.querySelectorAll('.card');


document.querySelectorAll('.carrousel-container').forEach(container => { // por cada carrousel
    const carrousel = container.querySelector('.carrousel');
    const leftArrow = container.querySelector('.carrousel-arrow.left');
    const rightArrow = container.querySelector('.carrousel-arrow.right');
    const cards = container.querySelectorAll('.card');
    const gap = 16;

    function getScrollAmount() { // función para obtener la cantidad de desplazamiento basada en el ancho de una tarjeta más el espacio
        const card = container.querySelector('.card');
        if (!card) return 0;
        return card.offsetWidth + gap; // ancho de la tarjeta más el espacio
    }

    if (carrousel && leftArrow && rightArrow) { // si existen los elementos
        leftArrow.addEventListener('click', () => { // al hacer click en la flecha izquierda
            cards.forEach(card => {
                card.classList.remove('girar-dere', 'girar-izq');
                void card.offsetWidth;
                card.classList.add('girar-dere'); // skew a las cards a la derecha
            });
            carrousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' }); // desplaza el carrousel a la izquierda
        });

        rightArrow.addEventListener('click', () => { // al hacer click en la flecha derecha
            cards.forEach(card => {
                card.classList.remove('girar-izq', 'girar-dere');
                void card.offsetWidth;
                card.classList.add('girar-izq'); // skew a las cards a la izquierda
            });
            carrousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' }); // desplaza el carrousel a la derecha
        });
    }
});