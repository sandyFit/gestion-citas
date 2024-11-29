window.Cumplimiento = class Cumplimiento {
    // Propiedades privadas para garantizar la integridad de los datos médicos del paciente
    #paciente;
    #motivo;
    #tratamiento;

    constructor(paciente, motivo, tratamiento) {
        if (!paciente || !motivo || !tratamiento) {
            throw new Error("Todos los campos son obligatorios.");
        }
        this.#paciente = paciente;
        this.#motivo = motivo;
        this.#tratamiento = tratamiento;
    }

    // Métodos para obtener los valores privados
    getPaciente() {
        return this.#paciente;
    }

    getMotivo() {
        return this.#motivo;
    }

    getTratamiento() {
        return this.#tratamiento;
    }

    // Método para obtener los detalles del cumplimiento
    obtenerDetalles() {
        return `Paciente: ${this.getPaciente()} 
            \nMotivo: ${this.getMotivo()} 
            \nTratamiento: ${this.getTratamiento()}`;
    }
};

 