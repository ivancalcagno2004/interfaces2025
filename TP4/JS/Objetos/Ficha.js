export class Ficha {
    constructor(posX, posY, imagenSrc) {
        this.posX = posX;
        this.posY = posY;
        this.imagen = new Image(); // Crear una instancia de Image
        this.imagen.src = imagenSrc; // Asignar la ruta de la imagen
        this.imagen.onload = () => {
            console.log("Imagen cargada correctamente:", imagenSrc);
        };
        this.imagen.onerror = () => {
            console.error("No se pudo cargar la imagen:", imagenSrc);
        };
        this.esValida = true;
        this.enMovimiento = false;
        this.radio = 22;
        this.posInicialX = posX;
        this.posInicialY = posY;
    }

    hizoClickEnFicha(clickX, clickY) {
        const distanciaX = clickX - this.posX;
        const distanciaY = clickY - this.posY;
        const distanciaAlCentro = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
        return distanciaAlCentro <= this.radio;
    }

    dibujar(ctx) {
        if (this.esValida) {
            // Dibujar el círculo de la ficha como fondo
            ctx.beginPath();
            ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2); // Dibuja un círculo
            ctx.strokeStyle = "blue"; // Borde azul
            ctx.fillStyle = "white"; // Fondo blanco (por si la imagen no carga)
            ctx.fill();
            ctx.stroke();

            // Dibujar la imagen dentro de la ficha
            if (this.imagen.complete) { // Verificar si la imagen ya está cargada
                ctx.drawImage(
                    this.imagen,
                    this.posX - this.radio,
                    this.posY - this.radio,
                    this.radio * 2,
                    this.radio * 2
                );
            }
        } 
        // else {
        //     // Dibujar un espacio vacío (ficha inválida)
        //     ctx.beginPath();
        //     ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2);
        //     ctx.strokeStyle = "gray"; // Borde gris para fichas inválidas
        //     ctx.stroke();
        // }
    }

    esMovimientoValido(filaOrigen, colOrigen, fichas) {
        const movimientos = [
            { df: -2, dc: 0 }, // Arriba
            { df: 2, dc: 0 },  // Abajo
            { df: 0, dc: -2 }, // Izquierda
            { df: 0, dc: 2 }   // Derecha
        ];

        for (const movimiento of movimientos) {
            const nuevaFila = filaOrigen + movimiento.df; // fila destino
            const nuevaColumna = colOrigen + movimiento.dc; // columna destino 

            // Verificar que la nueva posición esté dentro de los límites
            if (nuevaFila >= 0 && nuevaFila < fichas.length &&
                nuevaColumna >= 0 && nuevaColumna < fichas[0].length &&
                fichas[nuevaFila][nuevaColumna] === null) { // La posición destino debe estar vacía

                // Verificar que haya una ficha en el medio para saltar
                const filaIntermedia = filaOrigen + movimiento.df / 2;
                const columnaIntermedia = colOrigen + movimiento.dc / 2;

                if (fichas[filaIntermedia][columnaIntermedia] !== null) {
                    return true; // Movimiento válido
                }
            }
        }

        return false; // Movimiento no válido
    }
}