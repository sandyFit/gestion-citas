window.Disponibilidad = class Disponibilidad {
    constructor(medico, fecha, horario, centro) {
        this.medico = medico;
        this.fecha = fecha;
        this.horario = horario;
        this.centro = centro;
    }

    esFechaValida() {
        return window.utils.esFechaValida(this.fecha);
    }

    esHorarioValido() {
        if (!this.centro || !this.centro.horario) {
            console.error("El centro o el horario del centro no están definidos.");
            return false;
        }

        const [horaInicio, minutoInicio] = this.horario.split("-")[0].split(":").map(Number);
        const [horaFin, minutoFin] = this.horario.split("-")[1].split(":").map(Number);
        const [horaInicioCentro, minutoInicioCentro] = this.centro.horario.inicio.split(":").map(Number);
        const [horaFinCentro, minutoFinCentro] = this.centro.horario.fin.split(":").map(Number);

        const tiempoInicio = horaInicio * 60 + minutoInicio;
        const tiempoFin = horaFin * 60 + minutoFin;

        const tiempoInicioCentro = horaInicioCentro * 60 + minutoInicioCentro;
        const tiempoFinCentro = horaFinCentro * 60 + minutoFinCentro;

        return tiempoInicio >= tiempoInicioCentro && tiempoFin <= tiempoFinCentro;
    }

};
