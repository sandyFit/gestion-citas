window.Cita = class Cita {
    constructor(paciente, tipo, medico, fecha, hora, centro) {
        this.paciente = paciente;
        this.tipo = tipo;
        this.medico = medico;
        this.fecha = fecha;
        this.hora = hora;
        this.centro = centro; // Centro es el objeto completo
        this.duracion = centro.tiempoPromedioAtencion; // Usando la propiedad del centro
    }

    validarFechaCita() {
        return window.utils.esFechaValida(this.fecha);
    }

    convertirHoraAMinutos(hora) {
        const [horaCita, minutoCita] = hora.split(":").map(Number);
        return horaCita * 60 + minutoCita;
    }

    calcularRangoDeTiempo() {
        const inicio = this.convertirHoraAMinutos(this.hora);
        const fin = inicio + this.duracion;
        return { inicio, fin };
    }

    esCitaValida(disponibilidad) {
        const [horaCita, minutoCita] = this.hora.split(":").map(Number);
        // Buscar la disponibilidad del médico para la fecha y hora específicas
        const medicoDisponibilidad = disponibilidad.find((d) =>
            d.medico === this.medico && d.fecha === this.fecha
        );

        // Si no hay disponibilidad para el médico en esa fecha
        if (!medicoDisponibilidad) {
            return "El médico no está disponible en la fecha seleccionada.";
        }

        // Desglosamos las horas del horario del médico
        const [horaInicioMedico, minutoInicioMedico] = medicoDisponibilidad.horario.split("-")[0].split(":").map(Number);
        const [horaFinMedico, minutoFinMedico] = medicoDisponibilidad.horario.split("-")[1].split(":").map(Number);

        // Convertimos las horas de la cita y los horarios de disponibilidad del médico a minutos
        const tiempoCita = horaCita * 60 + minutoCita;
        const tiempoInicioMedico = horaInicioMedico * 60 + minutoInicioMedico;
        const tiempoFinMedico = horaFinMedico * 60 + minutoFinMedico;

        // Verificamos que la hora de la cita esté dentro del horario de disponibilidad
        if (tiempoCita < tiempoInicioMedico || tiempoCita > tiempoFinMedico) {
            return "La hora seleccionada está fuera del horario del médico.";
        }

        // Si la fecha y la hora son correctas, la cita es válida
        return true;
    }




    esCitaDeSeguimiento(ultimaCita) {
        return ultimaCita && this.tipo !== "urgencia" && new Date(this.fecha) - new Date(ultimaCita.fecha) < 7 * 24 * 60 * 60 * 1000;
    }
};
