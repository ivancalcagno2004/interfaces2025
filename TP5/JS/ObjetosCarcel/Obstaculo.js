export class Obstaculo {
    constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
        this.elementoAbajo = document.createElement('div');
        this.elementoArriba = document.createElement('div');
        document.querySelector('.contenedor-parallax').appendChild(this.elementoArriba);
        document.querySelector('.contenedor-parallax').appendChild(this.elementoAbajo);

        this.height = this.elementoAbajo.getBoundingClientRect().height;

        this.elementoAbajo.classList.add('obstaculo');
        this.elementoArriba.classList.add('obstaculo');
        
        this.configAltura(); // Configura la altura inicial de los obstáculos
    } 

    destroy(){
        document.querySelector('.contenedor-parallax').removeChild(this.elementoAbajo);
        document.querySelector('.contenedor-parallax').removeChild(this.elementoArriba);
    }

    setPosX(nuevaPosX){
        this.posX = nuevaPosX;
        this.elementoAbajo.style.left = this.posX + 'px';
        this.elementoArriba.style.left = this.posX + 'px';
    }

    configAltura() {
        let random = Math.floor(Math.random() * (500 - 300 + 1)) + 300; // Altura aleatoria entre 300 y 500
        this.posY = random;
        
        let distanciaY = Math.floor(Math.random() * (900 - 800 + 1)) + 800; // Distancia aleatoria entre 800 y 900
        // Establecer las posiciones iniciales
        this.elementoAbajo.style.left = this.posX + 'px';
        this.elementoAbajo.style.top = this.posY + 'px';
        this.elementoArriba.style.left = this.posX + 'px';
        this.elementoArriba.style.top = (this.posY - distanciaY) + 'px';
    
        // Obtener la posición del borde inferior del pincho de arriba
        let bordeInferiorArriba = this.elementoArriba.getBoundingClientRect().bottom;

        // Verificar si el borde inferior del pincho de arriba está fuera de la pantalla
        if (bordeInferiorArriba < 200) {
            // Ajustar la posición del pincho de arriba para que no se pase
            let ajuste = 200 - bordeInferiorArriba; // Cantidad a ajustar
            this.elementoArriba.style.top = (this.posY - distanciaY + ajuste) + 'px';
        }
    }

    estaColisionando(conX, conY, conRadio) { // verifica si el fisura choca contra el obstáculo
        const rectAbajo = this.elementoAbajo.getBoundingClientRect(); // Rectángulo del obstáculo inferior
        const rectArriba = this.elementoArriba.getBoundingClientRect(); // Rectángulo del obstáculo superior
    
        // Verificar colisión con el obstáculo inferior
        const colisionAbajo = conX + conRadio > rectAbajo.left &&
                              conX - conRadio < rectAbajo.right &&
                              conY + conRadio > rectAbajo.top &&
                              conY - conRadio < rectAbajo.bottom;
    
        // Verificar colisión con el obstáculo superior
        const colisionArriba = conX + conRadio > rectArriba.left &&
                               conX - conRadio < rectArriba.right &&
                               conY + conRadio > rectArriba.top &&
                               conY - conRadio < rectArriba.bottom;
    
        return colisionAbajo || colisionArriba; // Retorna true si colisiona con cualquiera de los dos
    }
}