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
    
    crearElemento(){
/*         this.vino.className = 'vino';
        this.vino.style.position = 'absolute';
        this.vino.style.width = `${this.radio * 2}px`;
        this.vino.style.height = `${this.radio * 2}px`;
        this.vino.style.left = `${this.posX - this.radio}px`;
        this.vino.style.top = `${this.posY - this.radio}px`;
        this.vino.style.pointerEvents = 'none'; */
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

    // colision circular simple: conX, conY centro del jugador y conRadio su radio
    // estaColisionando(conX, conY, conRadio) {
    //     let vinoHitBox = this.vino.getBoundingClientRect();
    //     if (this.collected) return false;
    //     const dx = conX - this.posX;
    //     const dy = conY - this.posY;
    //     return dx * dx + dy * dy <= (this.radio + conRadio) * (this.radio + conRadio);
    // }

        estaColisionando(conX, conY, conRadio = 0) {
            if (this.collected) return false;
    
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
            return distSq <= radioTotal * radioTotal;
        }
        
}
