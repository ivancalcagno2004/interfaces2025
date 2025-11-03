import { Ficha } from "./Ficha.js";
export class Tablero {
    constructor(ctx, width, height, matrizJuego) {
        this.imagenFondo = null;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.matrizJuego = matrizJuego;
        this.juegoTerminado = false;
        this.fichas = [[]]; // Matriz de fichas
        this.filas = 7;
        this.columnas = 7;
        this.margen = 10;
        const espacioHorizontal = (ctx.canvas.width - 2 * this.margen) / this.columnas;
        const espacioVertical = (ctx.canvas.height - 2 * this.margen) / this.filas;
        this.espacio = Math.min(espacioHorizontal, espacioVertical);
        this.margenX = (ctx.canvas.width - this.columnas * this.espacio) / 2;
        this.margenY = (ctx.canvas.height - this.filas * this.espacio) / 2;
        this.fichaSeleccionada = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.tiempoRestante = 0;
        this.cargarFondo();
        this.cargarEventos();
        this.inicializarFichas(); // Inicializa las fichas después de cargar el fondo
    }

    cargarMenu(){
        this.ctx.save();
        this.ctx.fillStyle = '#182632';
        this.ctx.beginPath();
        this.ctx.roundRect(200, 50, 800, 500, 32);
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.font = "48px Arial";
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText("Bienvenido a Peg Solitaire", 325, 200);
      
    }

    iniciarJuego(){
        this.dibujarTablero();
        this.initContador(3, 15); // Inicia el contador con 2 minutos y 0 segundos
        this.dibujarCuadricula();
    }

    cargarFondo() {
        this.imagenFondo = new Image(); // Guardar la imagen en this.imagenFondo
        this.imagenFondo.src = '../images/peg/fondo-peg.jpg';
        this.imagenFondo.onload = () => {
            this.ctx.drawImage(this.imagenFondo, 0, 0, this.width, this.height);
            //this.dibujarTablero(); // Dibuja el tablero después de cargar el fondo
            //this.cargarMenu();
        };
    }

    inicializarFichas() {
        this.fichas = [];
        const imagenSrc = "../images/peg/ficha_spiderman.png"; // Ruta de la imagen de las fichas
        for (let fila = 0; fila < this.filas; fila++) {
            this.fichas[fila] = [];
            for (let col = 0; col < this.columnas; col++) {
                const x = this.margenX + col * this.espacio + this.espacio / 2; // Calcular posición x centrada
                const y = this.margenY + fila * this.espacio + this.espacio / 2; // Calcular posición y centrada
                if (this.matrizJuego[fila][col] === 1) { // Si hay ficha en la matriz
                    // Crear una nueva ficha con la imagen
                    const ficha = new Ficha(x, y, imagenSrc);
                    this.fichas[fila][col] = ficha;
                } else if (this.matrizJuego[fila][col] === 0) {
                    this.fichas[fila][col] = null; // No hay ficha
                } else if (this.matrizJuego[fila][col] === 2) {
                    const ficha = new Ficha(x, y, imagenSrc);
                    ficha.esValida = false;
                    this.fichas[fila][col] = ficha; // Espacio inválido
                }
            }
        }
    }

    dibujarCuadricula() {
        if (this.juegoTerminado) return;
        const tiempoActual = Date.now();
        const parpadeo = Math.floor(tiempoActual / 500) % 2 === 0; // Alterna cada 500ms

        for (let i = 0; i < this.filas; i++) { // Recorrer filas
            for (let j = 0; j < this.columnas; j++) { // Recorrer columnas
                const x = this.margenX + j * this.espacio; // Esquina superior izquierda en X
                const y = this.margenY + i * this.espacio; // Esquina superior izquierda en Y

                // Dibuja un rectángulo para cada celda
                if (this.fichas[i][j] !== null && this.fichas[i][j] !== undefined && this.fichas[i][j].esValida) {
                    this.ctx.beginPath();
                    this.ctx.rect(x, y, this.espacio, this.espacio);
                    this.ctx.strokeStyle = "#000"; // Color del borde de la cuadrícula
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                } else if (this.fichas[i][j] === null && this.movimientoValido(i, j)) {
                    this.ctx.beginPath();
                    this.ctx.rect(x, y, this.espacio, this.espacio);

                    if (parpadeo === true) {
                        this.ctx.strokeStyle = "red"; // Color del borde de la cuadrícula
                    } else {
                        this.ctx.strokeStyle = "#000"; // Color del borde de la cuadrícula
                    }

                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                } else if (!this.movimientoValido(i, j) && this.fichas[i][j] === null) {
                    this.ctx.beginPath();
                    this.ctx.rect(x, y, this.espacio, this.espacio);
                    this.ctx.strokeStyle = "#000"; // Color del borde de la cuadrícula
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
                
            }
        }
        requestAnimationFrame(() => this.dibujarCuadricula());
    }

    dibujarTablero() {
        if (this.juegoTerminado) return;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // Dibujar el fondo si está cargado
        if (this.imagenFondo && this.imagenFondo.complete) {
            this.ctx.drawImage(this.imagenFondo, 0, 0, this.width, this.height);
        }
        this.dibujarCuadricula();
        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                const ficha = this.fichas[fila][col];
                if (ficha !== null && ficha !== undefined) { // Verifica que ficha no sea null
                    ficha.dibujar(this.ctx);
                }
            }
        }
    }

    movimientoValido(filaDestino, colDestino) {
        const movimientos = [
            { df: -2, dc: 0 }, // Arriba
            { df: 2, dc: 0 },  // Abajo
            { df: 0, dc: -2 }, // Izquierda
            { df: 0, dc: 2 }   // Derecha
        ];

        for (let movimiento of movimientos) {
            const filaOrigen = filaDestino + movimiento.df;
            const colOrigen = colDestino + movimiento.dc;

            // Verificar que la celda de origen esté dentro de los límites y tenga una ficha
            if (filaOrigen >= 0 && filaOrigen < this.filas &&
                colOrigen >= 0 && colOrigen < this.columnas &&
                this.fichas[filaOrigen][colOrigen] !== null &&
                this.fichas[filaOrigen][colOrigen].esValida) {

                // Verificar que la celda intermedia tenga una ficha
                const filaIntermedia = filaDestino + movimiento.df / 2;
                const colIntermedia = colDestino + movimiento.dc / 2;

                if (this.fichas[filaIntermedia][colIntermedia] !== null &&
                    this.fichas[filaIntermedia][colIntermedia].esValida) {
                    return true; // Movimiento válido
                }
            }
        }

        return false; // No hay movimientos válidos hacia esta celda
    }


    cargarEventos() {
        let canvas = this.ctx.canvas;
        canvas.addEventListener('mousedown', (event) => this.mouseDown(event));
        canvas.addEventListener('mousemove', (event) => this.mouseMove(event));
        canvas.addEventListener('mouseup', (event) => this.mouseUp(event));
    }

    mouseDown(event) {
        const rect = this.ctx.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                let ficha = this.fichas[fila][col];
                if (ficha !== null && ficha.hizoClickEnFicha(mouseX, mouseY)) {
                    if (ficha.esValida) {
                        this.fichaSeleccionada = ficha;
                        this.fichaSeleccionada.enMovimiento = true;
                        this.offsetX = mouseX - ficha.posX;
                        this.offsetY = mouseY - ficha.posY;
                        this.ctx.canvas.style.cursor = "grabbing"; // Cambiar cursor al agarrar //
                        return;
                    }
                }
            }
        }
    }

    mouseMove(event) {
        if (!this.fichaSeleccionada) return;

        const rect = this.ctx.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.fichaSeleccionada.posX = x - this.offsetX;
        this.fichaSeleccionada.posY = y - this.offsetY;
        this.dibujarTablero();
        this.dibujarContador(Math.floor(this.tiempoRestante / 60), this.tiempoRestante % 60); // Redibuja el contador
    }

    mouseUp(event) {
        if (!this.fichaSeleccionada) return;

        // Calcular la celda donde se soltó la ficha
        const colDestino = Math.floor((this.fichaSeleccionada.posX - this.margenX) / this.espacio);
        const filaDestino = Math.floor((this.fichaSeleccionada.posY - this.margenY) / this.espacio);

        // Calcular la celda de origen de la ficha seleccionada
        const colOrigen = Math.floor((this.fichaSeleccionada.posInicialX - this.margenX) / this.espacio);
        const filaOrigen = Math.floor((this.fichaSeleccionada.posInicialY - this.margenY) / this.espacio);

        console.log({
            filaOrigen,
            colOrigen,
            filaDestino,
            colDestino
        });

        // Verificar si el movimiento es válido
        if (this.fichaSeleccionada.esMovimientoValido(filaOrigen, colOrigen, this.fichas) && this.fichas[filaDestino][colDestino] !== this.fichas[filaOrigen][colOrigen]) {
            // Ajustar la posición de la ficha activa a la posición perfecta
            this.fichaSeleccionada.posX = this.margenX + colDestino * this.espacio + this.espacio / 2;
            this.fichaSeleccionada.posY = this.margenY + filaDestino * this.espacio + this.espacio / 2;

            // Mover la ficha en la matriz
            this.fichas[filaOrigen][colOrigen] = null; // Liberar la posición inicial
            this.fichas[filaDestino][colDestino] = this.fichaSeleccionada; // Colocar la ficha en la nueva posición

            // Actualizar la posición inicial de la ficha
            this.fichaSeleccionada.posInicialX = this.fichaSeleccionada.posX;
            this.fichaSeleccionada.posInicialY = this.fichaSeleccionada.posY;

            // Eliminar la ficha intermedia
            const filaIntermedia = (filaOrigen + filaDestino) / 2;
            const colIntermedia = (colOrigen + colDestino) / 2;
            this.fichas[filaIntermedia][colIntermedia] = null; // Vaciar la celda intermedia
        } else {
            // Si el movimiento no es válido, devolver la ficha a su posición original
            this.fichaSeleccionada.posX = this.fichaSeleccionada.posInicialX;
            this.fichaSeleccionada.posY = this.fichaSeleccionada.posInicialY;
        }

        console.log(this.fichas);
        // Finalizar el movimiento
        this.fichaSeleccionada.enMovimiento = false;
        this.fichaSeleccionada = null;
        this.ctx.canvas.style.cursor = "default"; // Restaurar el cursor
        this.dibujarTablero(); // Redibujar el tablero
        this.dibujarContador(Math.floor(this.tiempoRestante / 60), this.tiempoRestante % 60); // Redibuja el contador
    }
    
    initContador(minutos, segundos) {
        this.tiempoRestante = minutos * 60 + segundos;
    
        this.contador(minutos, segundos);
    }

    contador(minutos, segundos) {
        if (this.tiempoRestante <= 0) {
            this.ctx.clearRect(845, 30, 280, 50); // Limpia el área del texto con un margen
            this.mostrarMensajePerdio();
            return; // Detener la recursión si el tiempo se agota
        }

        this.dibujarContador(minutos, segundos);

        // Reducir el tiempo restante
        this.tiempoRestante--;
        minutos = Math.floor(this.tiempoRestante / 60); // Actualizar minutos
        segundos = this.tiempoRestante % 60; // Actualizar segundos

        // Llamada recursiva después de 1 segundo
        setTimeout(() => this.contador(minutos, segundos), 1000);
    }

    dibujarContador(minutos, segundos) {
        let correctoFormato = "";
        if (segundos < 10){
            correctoFormato = "0";
        }

        // Limpia el área exacta del contador
        const texto = "Tiempo restante: " + minutos + ":" + correctoFormato + segundos;
        
        this.ctx.clearRect(845, 30, 280, 50); // Limpia el área del texto con un margen

        // Dibuja el texto actualizado
        this.ctx.font = "28px Arial";
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText(texto, 850, 60);
    }

    verificarPerdio() {
        // Si el tiempo se acabó, perdió
        if (this.tiempoRestante <= 0) return true;

        // Recorre todas las fichas; si alguna tiene un movimiento válido, no perdió
        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                const ficha = this.fichas[fila][col];
                if (ficha !== null && ficha !== undefined && ficha.esValida !== false) {
                    // ficha.esMovimientoValido(fila, col, this.fichas) debe devolver true si hay algún movimiento desde aquí
                    if (ficha.esMovimientoValido(fila, col, this.fichas)) {
                        return false; // Hay al menos un movimiento posible -> no perdió
                    }
                }
            }
        }

        // No hay movimientos posibles y el tiempo no se ha acabado -> perdió
        return true;
    }

        
    mostrarMensajePerdio(){
        this.juegoTerminado = true;
        this.ctx.clearRect(200, 50, 800, 500); // Limpia el área del mensaje
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.roundRect(200, 50, 800, 500, 32);
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.font = "48px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.fillText("Perdiste! Intentalo de nuevo", 325, 200);
    }
}