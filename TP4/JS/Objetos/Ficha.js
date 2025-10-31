
export class Ficha{
    constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
        this.color = '#E28614FF'; // despues tiene que ser una imagen
        this.esValida = true;
        this.radio = 22;
        this.posInicialX = posX;
        this.posInicialY = posY;
    }

    fichaValida() {
        return this.esValida; // Devuelve si la ficha es válida
    }

    hizoClickEnFicha(clickX, clickY) {
        // Calcula la distancia entre el punto del clic y el centro de la ficha
        const distanciaX = clickX - this.posX; // Diferencia en el eje X
        const distanciaY = clickY - this.posY; // Diferencia en el eje Y
    
        // Calcula la distancia euclidiana desde el clic hasta el centro de la ficha
        const distanciaAlCentro = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
    
        // Devuelve true si el clic está dentro del radio de la ficha
        return distanciaAlCentro <= this.radio;
    }
}