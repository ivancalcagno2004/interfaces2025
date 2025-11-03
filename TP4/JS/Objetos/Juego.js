import { Tablero } from "./Tablero.js";
export class Juego {
    constructor(ctx, width, height, matrizJuego) {
        this.matrizJuego = matrizJuego;
        console.log(this.matrizJuego);
        this.tablero = new Tablero(ctx, width, height, matrizJuego);
        this.gano = false;
        this.jugadorPerdio = false;
    }

    gano(){
     
    }

    iniciar(){
        this.tablero.iniciarJuego();
        this.perdio();
    }
    
    perdio(){
        setInterval(() => {
            if(this.tablero.verificarPerdio()){
                this.jugadorPerdio = true;
                this.tablero.mostrarMensajePerdio();
            }   

        }, 1000);
    }
}