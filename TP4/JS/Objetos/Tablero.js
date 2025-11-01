import { Ficha } from "./Ficha.js";
export class Tablero {
    constructor(ctx, width, height, matrizJuego) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.matrizJuego = matrizJuego;
        this.fichas = [[]]; // Matriz de fichas
        this.filas = 7;
        this.columnas = 7;
        this.margen = 10;
        const espacioHorizontal = (ctx.canvas.width - 2 * this.margen) / this.columnas;
        const espacioVertical = (ctx.canvas.height - 2 * this.margen) / this.filas;
        this.espacio = Math.min(espacioHorizontal, espacioVertical);
        this.margenX = (ctx.canvas.width - this.columnas * this.espacio) / 2;
        this.margenY = (ctx.canvas.height - this.filas * this.espacio) / 2;
        this.fichaSeleccionada = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.cargarFondo();
        this.cargarEventos();
        this.inicializarFichas(); // Inicializa las fichas después de cargar el fondo
        this.dibujarTablero(); // Dibuja el tablero después de cargar el fondo
    }
    cargarFondo() {
    this.imagenFondo = new Image(); // Guardar la imagen en this.imagenFondo
    this.imagenFondo.src = '../images/peg/fondo-peg.jpg';
    this.imagenFondo.onload = () => {
        this.dibujarTablero(); // Dibuja el tablero después de cargar el fondo
    };
}

    inicializarFichas() {
        this.fichas = [];
        for (let fila = 0; fila < this.filas; fila++) {
            this.fichas[fila] = [];
            for (let col = 0; col < this.columnas; col++) {
                const x = this.margenX + col * this.espacio + this.espacio / 2; // Calcular posición x centrada
                const y = this.margenY + fila * this.espacio + this.espacio / 2; // Calcular posición y centrada
                if (this.matrizJuego[fila][col] === 1) { // Si hay ficha en la matriz
                    // Crear una nueva ficha en la posición (fila, col)
                    const ficha = new Ficha(x, y);
                    this.fichas[fila][col] = ficha;
                } else if (this.matrizJuego[fila][col] === 0) {
                    this.fichas[fila][col] = null; // No hay ficha
                } else if (this.matrizJuego[fila][col] === 2) {
                    const ficha = new Ficha(x, y);
                    ficha.esValida = false;
                    this.fichas[fila][col] = ficha; // Espacio inválido
                }
            }
        }
    }

    dibujarTablero() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // Dibujar el fondo si está cargado
    if (this.imagenFondo && this.imagenFondo.complete) {
        this.ctx.drawImage(this.imagenFondo, 0, 0, this.width, this.height);
    }
        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                const ficha = this.fichas[fila][col];
                if (ficha !== null) { // Verifica que ficha no sea null
                    ficha.dibujar(this.ctx);
                }
            }
        }
    
    }


    cargarEventos() {
        let canvas = this.ctx.canvas;
        canvas.addEventListener('mousedown', (event) => this.mouseDown(event));
        canvas.addEventListener('mousemove', (event) => this.mouseMove(event));
        canvas.addEventListener('mouseup', (event) => this.mouseUp(event));
    }

    mouseDown(event) {
        const rect = this.ctx.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                let ficha = this.fichas[fila][col];
                if (ficha !== null && ficha.hizoClickEnFicha(mouseX, mouseY)) {
                    if (ficha.esValida) {
                        this.fichaSeleccionada = ficha;
                        this.fichaSeleccionada.enMovimiento = true;
                        this.offsetX = mouseX - ficha.posX;
                        this.offsetY = mouseY - ficha.posY;
                        this.ctx.canvas.style.cursor = "grabbing"; // Cambiar cursor al agarrar //
                        return;
                    }
                }
            }
        }
    }

    mouseMove(event) {
        if (!this.fichaSeleccionada) return;

        const rect = this.ctx.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.fichaSeleccionada.posX = x - this.offsetX;
        this.fichaSeleccionada.posY = y - this.offsetY;
        this.dibujarTablero();
    }

    mouseUp(event) {
        console.log("Suelto una ficha en el tablero");
    }

}