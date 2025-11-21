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
        
        this.configAltura();
    } 

    getPosElemento(){
        console.log(this.elementoAbajo.getBoundingClientRect());
    }

    setPosX(nuevaPosX){
        this.posX = nuevaPosX;
        this.elementoAbajo.style.left = this.posX + 'px';
        this.elementoArriba.style.left = this.posX + 'px';
    }

    configAltura() {
        let random = Math.floor(Math.random() * 300) + 200; // altura aleatoria entre 200 y 500
        this.posY = random;
        //entre 650 y 800
        let distanciaY = Math.floor(Math.random() * (900 - 750 + 1)) + 750;
        // Establecer las posiciones iniciales
        this.elementoAbajo.style.left = this.posX + 'px';
        this.elementoAbajo.style.top = this.posY + 'px';
        this.elementoArriba.style.left = this.posX + 'px';
        this.elementoArriba.style.top = (this.posY - distanciaY) + 'px';
    
        // Obtener la posición del borde inferior del pincho de arriba
        let bordeInferiorArriba = this.elementoArriba.getBoundingClientRect().bottom;
        //console.log('Borde inferior del pincho de arriba: ' + bordeInferiorArriba);
        // Verificar si el borde inferior del pincho de arriba está fuera de la pantalla
        if (bordeInferiorArriba < 200) {
            console.log('El pincho de arriba se pasa fuera de la pantalla ' + bordeInferiorArriba);
            // Ajustar la posición del pincho de arriba para que no se pase
            let ajuste = 200 - bordeInferiorArriba; // Cantidad a ajustar
            this.elementoArriba.style.top = (this.posY - distanciaY + ajuste) + 'px';
        }

    }

    estaColisionando(conX, conY, conRadio) {
        const rectAbajo = this.elementoAbajo.getBoundingClientRect(); // Rectángulo del obstáculo inferior
        const rectArriba = this.elementoArriba.getBoundingClientRect(); // Rectángulo del obstáculo superior
    
        // Ajustar el hitbox para reducir el área de colisión
        const margenHorizontal = 10; // Reducir el ancho del hitbox
        const margenVertical = 10; // Reducir la altura del hitbox
    
        const hitboxAbajo = {
            left: rectAbajo.left + margenHorizontal,
            right: rectAbajo.right - margenHorizontal,
            top: rectAbajo.top + margenVertical,
            bottom: rectAbajo.bottom - margenVertical,
        };
    
        const hitboxArriba = {
            left: rectArriba.left + margenHorizontal,
            right: rectArriba.right - margenHorizontal,
            top: rectArriba.top + margenVertical,
            bottom: rectArriba.bottom - margenVertical,
        };
    
        // Verificar colisión con el obstáculo inferior
        const colisionAbajo = conX + conRadio > hitboxAbajo.left &&
                              conX - conRadio < hitboxAbajo.right &&
                              conY + conRadio > hitboxAbajo.top &&
                              conY - conRadio < hitboxAbajo.bottom;
    
        // Verificar colisión con el obstáculo superior
        const colisionArriba = conX + conRadio > hitboxArriba.left &&
                               conX - conRadio < hitboxArriba.right &&
                               conY + conRadio > hitboxArriba.top &&
                               conY - conRadio < hitboxArriba.bottom;
    
        return colisionAbajo || colisionArriba; // Retorna true si colisiona con cualquiera de los dos
    }
}