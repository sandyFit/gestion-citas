window.Disponibilidad = class Disponibilidad {
    #medico;
    #fecha;
    #horario;
    #centro;

    constructor(medico, fecha, horario, centro) {
        if (!medico || !fecha || !horario || !centro) {
            throw new Error("Todos los parámetros (medico, fecha, horario, centro) son obligatorios.");
        }

        this.#medico = medico;
        this.#fecha = fecha;
        this.#horario = horario;
        this.#centro = centro;
    }

    // Métodos getter para acceder a las propiedades privadas
    getMedico() {
        return this.#medico;
    }

    getFecha() {
        return this.#fecha;
    }

    getHorario() {
        return this.#horario;
    }

    getCentro() {
        return this.#centro;
    }

    // Validar estructura del horario (formato HH:MM-HH:MM)
    #esHorarioEstructuraValida(horario) {
        const regexHorario = /^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$/;
        return regexHorario.test(horario);
    }

    esFechaValida() {
        return window.utils.esFechaValida(this.getFecha());
    }

    // Validar que el horario esté dentro del horario del centro
    esHorarioValido() {
        const [horaInicio, minutoInicio] = this.getHorario().split("-")[0].split(":").map(Number);
        const [horaFin, minutoFin] = this.getHorario().split("-")[1].split(":").map(Number);
        const [horaInicioCentro, minutoInicioCentro] = this.getCentro().getHorario().inicio.split(":").map(Number);
        const [horaFinCentro, minutoFinCentro] = this.getCentro().getHorario().fin.split(":").map(Number);

        const tiempoInicio = horaInicio * 60 + minutoInicio;
        const tiempoFin = horaFin * 60 + minutoFin;

        const tiempoInicioCentro = horaInicioCentro * 60 + minutoInicioCentro;
        const tiempoFinCentro = horaFinCentro * 60 + minutoFinCentro;

        if (tiempoInicio < tiempoInicioCentro || tiempoFin > tiempoFinCentro) {
            window.utils.displayAlert(
                `El horario (${this.getHorario()}) está fuera del horario permitido por el centro 
                    (${this.getCentro().getHorario().inicio} - ${this.getCentro().getHorario().fin}).`
            );
            return false;
        }

        return true;
    }

    // Método para imprimir los detalles
    getDetalles() {
        return `Médico: ${this.getMedico()} 
            \nFecha: ${this.getFecha()} 
            \nHorario: ${this.getHorario()} 
            \nCentro: ${this.getCentro().getNombre()}`;
    }
};

