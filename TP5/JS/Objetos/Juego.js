import { Tablero } from "./Tablero.js";
export class Juego {
    constructor(ctx, width, height, matrizJuego) {
        this.matrizJuego = matrizJuego;
        this.tablero = new Tablero(ctx, width, height, matrizJuego);
        this.jugadorGano = false;
        this.jugadorPerdio = false;
        this.intervaloPerdio = null;
        this.intervaloGano = null;
    }

    gano(){
        this.intervaloGano = setInterval(() => {
            if(this.tablero.verificarGano()){
                this.jugadorGano = true;
                clearInterval(this.intervaloGano);
            }
        }, 1000);
    }

    iniciar(){
        this.tablero.iniciarJuego();
        this.perdio();
        this.gano();
    }

    reset(){
        this.tablero.resetearJuego();
        this.jugadorPerdio = false;
        this.jugadorGano = false;
        clearInterval(this.intervaloPerdio);
    }
    
    perdio(){
        this.intervaloPerdio = setInterval(() => {
            if(this.tablero.verificarPerdio()){
                this.jugadorPerdio = true;
                clearInterval(this.intervaloPerdio);
            }   
        }, 1000);
    }
}