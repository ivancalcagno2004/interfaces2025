
export class Ficha{
    constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
        this.color = '#E28614FF'; // despues tiene que ser una imagen
        this.esValida = true;
    }
    fichaValida(){
        return this.esValida;
    }
}