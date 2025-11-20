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
        let distanciaY = Math.floor(Math.random() * (800 - 650 + 1)) + 650;
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
}