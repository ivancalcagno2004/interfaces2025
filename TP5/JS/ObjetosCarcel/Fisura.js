export class Fisura {

    static instancia = null;

    constructor() {
        if (!Fisura.instancia) { // Verificar si ya existe una instancia
            Fisura.instancia = this; // Asignar la instancia actual (unica)

        }

        return Fisura.instancia;
    }


}