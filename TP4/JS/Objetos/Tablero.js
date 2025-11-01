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
        this.fichaSeleccionada = null;
        this.cargarEventos();
        this.offsetX = 0;
        this.offsetY = 0;
    }

    cargarFondo() {
        const imagenFondo = new Image(); //<img>
        imagenFondo.src = '../images/peg/fondo-peg.jpg';
        imagenFondo.onload = () => {
            this.ctx.drawImage(imagenFondo, 0, 0, this.width, this.height);
            this.inicializarFichas(); // Inicializa las fichas después de cargar el fondo
            console.log(this.fichas);
            this.dibujarTablero(); // Dibuja el tablero después de cargar el fondo
        }
    }

    inicializarFichas() {
        this.fichas = [];
        for (let fila = 0; fila < this.filas; fila++) {
            this.fichas[fila] = [];
            for (let col = 0; col < this.columnas; col++) {
                const x = this.margen + col * this.espacio + this.espacio / 2; // Calcular posición x centrada
                const y = this.margen + fila * this.espacio + this.espacio / 2; // Calcular posición y centrada
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
        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                const ficha = this.fichas[fila][col];
                if (ficha !== null) { // Verifica que ficha no sea null
                    ficha.dibujar(this.ctx);
                }
            }
        }
    }


    cargarEventos(){
        let canvas = this.ctx.canvas;
        canvas.addEventListener('mousedown', (event) => this.mouseDown(event));
        canvas.addEventListener('mousemove', (event) => this.mouseMove(event));
        canvas.addEventListener('mouseup', (event) => this.mouseUp(event));
    }

    mouseDown(event){
        const rect = this.ctx.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                let ficha = this.fichas[fila][col];
                if (ficha !== null && ficha.hizoClickEnFicha(mouseX, mouseY)) {
                    if(ficha.esValida){
                        this.fichaSeleccionada = ficha;
                        this.fichaSeleccionada.enMovimiento = true;
                        this.offsetX = mouseX - ficha.posX;
                        this.offsetY = mouseY - ficha.posY;
                        this.ctx.canvas.style.cursor = "grabbing";
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

    mouseUp(event){
        console.log("Suelto una ficha en el tablero");
    }
   
}