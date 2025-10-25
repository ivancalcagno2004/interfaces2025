export class Tablero{
    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    cargarFondo(){
        const imagenFondo = new Image(); //<img>
        imagenFondo.src = '../images/peg/fondo-peg.jpg';
        imagenFondo.onload = () => {
            this.ctx.drawImage(imagenFondo, 0, 0, this.width, this.height);
            this.dibujar(); // Dibuja el tablero después de cargar el fondo
        }
    }

    dibujar() {
                
        // Calcula el tamaño y posición del cuadrado
        const celdaSize = Math.min(this.width, this.height) / 3;
        const centroX = (this.width - celdaSize) / 2;
        const centroY = (this.height - celdaSize) / 2;
    
        this.ctx.save();
        this.ctx.strokeStyle = "#333";
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle = "#888888FF";
    
        // Dibuja el cuadrado centrado
        this.ctx.fillRect(centroX, centroY, celdaSize, celdaSize);
        this.ctx.strokeRect(centroX, centroY, celdaSize, celdaSize);
    
        this.ctx.restore();
    }
}