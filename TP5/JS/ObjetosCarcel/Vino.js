export class Vino {
    constructor(posX,posY) {
        this.posX = posX;
        this.posY = posY;
        this.radio = 12;
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
    estaColisionando(conX, conY, conRadio) {
        if (this.collected) return false;
        const dx = conX - this.posX;
        const dy = conY - this.posY;
        return dx * dx + dy * dy <= (this.radio + conRadio) * (this.radio + conRadio);
    }
}
