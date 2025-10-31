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
        this.celda = 80;
        this.margen = 10;
        this.espacio = (ctx.canvas.width - 2 * this.margen) / this.columnas; // Calcular espacio entre fichas
        this.fichaSeleccionada = null;
        this.cargarEventos();
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
        const tableroWidth = this.columnas * this.celda;
        const tableroHeight = this.filas * this.celda;

        // Calcula el desplazamiento para centrar el tablero
        const offsetX = (this.width - tableroWidth) / 2;
        const offsetY = (this.height - tableroHeight) / 2;
        for (let fila = 0; fila < this.filas; fila++) {
            this.fichas[fila] = [];
            for (let col = 0; col < this.columnas; col++) {
                const x = offsetX + col * this.celda + this.celda / 2; // Centro de la celda en X
                const y = offsetY + fila * this.celda + this.celda / 2; // Centro de la celda en Y
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
        // Calcula el tamaño total del tablero
        const tableroWidth = this.columnas * this.celda;
        const tableroHeight = this.filas * this.celda;
    
        // Calcula el desplazamiento para centrar el tablero
        const offsetX = (this.width - tableroWidth) / 2;
        const offsetY = (this.height - tableroHeight) / 2;
        
        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                let ficha = this.fichas[fila][col];
                const x = offsetX + col * this.celda; // Ajusta la posición X con el desplazamiento
                const y = offsetY + fila * this.celda; // Ajusta la posición Y con el desplazamiento
    
                if (ficha != null) {
                    if (ficha.fichaValida()) {
                        this.ctx.beginPath(); // Empieza una figura desde 0
                        this.ctx.arc(x + this.celda / 2, y + this.celda / 2, ficha.radio, 0,Math.PI * 2); // Dibuja una ficha redonda
                        this.ctx.strokeStyle = "blue";
                        this.ctx.fillStyle = "#E23D14FF"; // Color de la ficha
                        this.ctx.fill();
                        this.ctx.stroke(); // Dibuja el borde
                    }
                }else{
                    // Espacio vacío
                    this.ctx.beginPath(); // Empieza una figura desde 0
                    this.ctx.arc(x + this.celda / 2, y + this.celda / 2, 22, 0,Math.PI * 2); // Dibuja una ficha redonda
                    this.ctx.strokeStyle = "blue";
                    this.ctx.stroke(); // Dibuja el borde
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
                    if(ficha.fichaValida()){
                        console.log("HIZO CLICK DENTRO DE LA FICHA")
                        return;
                    }
                    /* ficha.enMovimiento = true;
                    this.fichaActiva = ficha;
                    this.offsetX = mouseX - ficha.x;
                    this.offsetY = mouseY - ficha.y;
                    this.ctx.canvas.style.cursor = "grabbing";
                    return; // Salir después de encontrar la ficha */
                }
            }
        }
    }

    mouseMove(event){
        
    }

    mouseUp(event){
        console.log("Suelto una ficha en el tablero");
    }
   
}