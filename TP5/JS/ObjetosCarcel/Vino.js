export class Vino {
    constructor(posX,posY) {
        this.posX = posX;
        this.posY = posY;
        this.radio = 32;
        this.collected = false;
        this.especial = false; // especial = false ES BIRRA, especial = true ES WHISKY
        this.vino = document.createElement('div');
        document.querySelector('.contenedor-parallax').appendChild(this.vino);

        this.vino.classList.add('vino');

        // Determinar si es especial con una probabilidad del 20%
        const probabilidad = Math.random();

        if (probabilidad < 0.2) {
            this.vino.style.backgroundImage = "url('../images/powers/Whiskey.png')";
            this.especial = true; // 20% de probabilidad de ser especial
        }else{
            this.vino.style.backgroundImage = "url('../images/powers/Beer.png')";
        }
    }
    
    setPosX(nuevaPosX){
        this.posX = nuevaPosX;
        this.vino.style.left = this.posX + 'px';
    }

    destroy(){
        document.querySelector('.contenedor-parallax').removeChild(this.vino);
    }

    // actualizar posición visual (si el juego mueve vinos)
    dibujar() {
        if (this.collected) {
            this.vino.style.display = 'none';
            return;
        }
        this.vino.style.left = `${this.posX - this.radio}px`;
        this.vino.style.top = `${this.posY - this.radio}px`;
    }

    estaColisionando(conX, conY, conRadio = 0) { // verifica si un vino choca contra el fisura
        if (this.collected) return false; // Si ya fue recogido, no colisiona

        // obtener medidas real del elemento vino (toma en cuenta CSS 64x64)
        const vinoRect = this.vino.getBoundingClientRect();
        const vinoCenterX = vinoRect.left + vinoRect.width / 2;
        const vinoCenterY = vinoRect.top + vinoRect.height / 2;
        const vinoRadius = Math.max(vinoRect.width, vinoRect.height) / 2;

        // distancia entre centros
        const dx = conX - vinoCenterX;
        const dy = conY - vinoCenterY;
        const distSq = dx * dx + dy * dy;

        const radioTotal = vinoRadius + conRadio;
        return distSq <= radioTotal * radioTotal; // colisiona si la distancia es menor o igual al radio total
    }
        
}
