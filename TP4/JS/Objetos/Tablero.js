import { Ficha } from "./Ficha.js";
export class Tablero{
    constructor(ctx, width, height, matrizJuego){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.matrizJuego = matrizJuego;
        this.fichas = [[]]; // Matriz de fichas
        this.filas = 7;
        this.columnas = 7;
    }

    cargarFondo(){
        const imagenFondo = new Image(); //<img>
        imagenFondo.src = '../images/peg/fondo-peg.jpg';
        imagenFondo.onload = () => {
            this.ctx.drawImage(imagenFondo, 0, 0, this.width, this.height);
            this.dibujar(); // Dibuja el tablero después de cargar el fondo
        }
    }
    
    dibujar() {
        // Calcula el tamaño y posición del cuadrado
        const celdaSize = Math.min(this.width, this.height) / 3;
        const centroX = (this.width - celdaSize) / 2;
        const centroY = (this.height - celdaSize) / 2;
        
        this.ctx.save();
        this.ctx.strokeStyle = "#333";
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle = "#888888FF";
        
        // Dibuja el cuadrado centrado
        this.ctx.fillRect(centroX, centroY, celdaSize, celdaSize);
        this.ctx.strokeRect(centroX, centroY, celdaSize, celdaSize);
    
        this.ctx.restore();
    }

    inicializarFichas(){
        for(let fila = 0; fila < this.filas; fila++){
            this.fichas[fila] = [];
            for(let col = 0; col < this.columnas; col++){
                if(this.matrizJuego[fila][col] === 1){ // Si hay ficha en la matriz
                    // Crear una nueva ficha en la posición (fila, col)
                    const ficha = new Ficha(col, fila);
                    this.fichas[fila][col] = ficha;
                } else if(this.matrizJuego[fila][col] === 0){
                    this.fichas[fila][col] = null; // No hay ficha
                } else if(this.matrizJuego[fila][col] === 2){
                    const ficha = new Ficha(col, fila);
                    ficha.esValida = false;
                    this.fichas[fila][col] = ficha; // Espacio inválido
                }
            }
        }
    }

    dibujarFichas(){
        
    }
}