import { Tablero } from "./Tablero.js";
export class Juego {
    constructor(ctx, width, height, matrizJuego) {
        this.matrizJuego = matrizJuego;
        console.log(this.matrizJuego);
        this.tablero = new Tablero(ctx, width, height, matrizJuego);
        this.tablero.cargarFondo();
    }
}