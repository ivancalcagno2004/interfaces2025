
export class Ficha{
    constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
        this.color = '#E28614FF'; // despues tiene que ser una imagen
        this.esValida = true;
        this.enMovimiento = false;
        this.radio = 22;
        this.posInicialX = posX;
        this.posInicialY = posY;
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

    dibujar(ctx){
        if (this != null) {
            if (this.esValida) {
                ctx.beginPath(); // Empieza una figura desde 0
                ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2); // Dibuja una ficha redonda
                ctx.strokeStyle = "blue";
                ctx.fillStyle = "#E23D14FF"; // Color de la ficha
                ctx.fill();
                ctx.stroke(); // Dibuja el borde
            }
        }else{
            // Espacio vacío
            ctx.beginPath(); // Empieza una figura desde 0
            ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2); // Dibuja una ficha redonda
            ctx.strokeStyle = "blue";
            ctx.stroke(); // Dibuja el borde
        }
    }
    esMovimientoValido(filaOrigen, colOrigen, filaDestino, colDestino) {
    // Verificar que la celda de destino esté vacía
    if (this.fichas[filaDestino][colDestino] !== null) {return false;
    }

    // Verificar que el movimiento sea horizontal o vertical y de dos celdas
    const deltaFila = Math.abs(filaDestino - filaOrigen);
    const deltaCol = Math.abs(colDestino - colOrigen);
    if (!((deltaFila === 2 && deltaCol === 0) || (deltaFila === 0 && deltaCol === 2))) {
        return false;
    }

    // Verificar que haya una ficha en la celda intermedia
    const filaIntermedia = (filaOrigen + filaDestino) / 2;
    const colIntermedia = (colOrigen + colDestino) / 2;
    if (this.fichas[filaIntermedia][colIntermedia] === null) {
        return false;
    }

    return true; // Movimiento válido
}
}