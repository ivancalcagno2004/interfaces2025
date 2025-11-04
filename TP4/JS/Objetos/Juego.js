import { Tablero } from "./Tablero.js";
export class Juego {
    constructor(ctx, width, height, matrizJuego) {
        this.matrizJuego = matrizJuego;
        console.log(this.matrizJuego);
        this.tablero = new Tablero(ctx, width, height, matrizJuego);
        this.jugadorGano = false;
        this.jugadorPerdio = false;
        this.intervalo = null;
    }

    gano(){
     
    }

    iniciar(){
        this.tablero.iniciarJuego();
        this.perdio();
    }

    reset(){
        this.tablero.resetearJuego();
        this.jugadorPerdio = false;
        this.jugadorGano = false;
        clearInterval(this.intervalo);
    }
    
    perdio(){
        this.intervalo = setInterval(() => {
            if(this.tablero.verificarPerdio()){
                this.jugadorPerdio = true;
                this.tablero.mostrarMensajePerdio();
                clearInterval(this.intervalo);
            }   

        }, 1000);
    }
}