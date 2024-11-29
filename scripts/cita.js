window.Cita = class Cita {
    #paciente;
    #tipo;
    #medico;
    #fecha;
    #hora;
    #centro;

    constructor(paciente, tipo, medico, fecha, hora, centro) {
        if (!paciente || !tipo || !medico || !fecha || !hora || !centro) {
            throw new Error("Todos los parámetros (paciente, tipo, medico, fecha, hora, centro) son obligatorios.");
        }

        this.#paciente = paciente;
        this.#tipo = tipo;
        this.#medico = medico;
        this.#fecha = fecha;
        this.#hora = hora;
        this.#centro = centro;
    }

    // Métodos getter para acceder a las propiedades privadas
    getPaciente() {
        return this.#paciente;
    }

    getTipo() {
        return this.#tipo;
    }

    getMedico() {
        return this.#medico;
    }

    getFecha() {
        return this.#fecha;
    }

    getHora() {
        return this.#hora;
    }

    getCentro() {
        return this.#centro;
    }

    getDetalles() {
        return `Paciente: ${this.getPaciente()} 
            \nTipo de cita: ${this.getTipo()} 
            \nMédico: ${this.getMedico()} 
            \nFecha: ${this.getFecha()} 
            \nHora: ${this.getHora()} 
            \nCentro: ${this.getCentro().getNombre()}`;
    }


    // Validación de la fecha
    validarFechaCita() {
        return window.utils.esFechaValida(this.getFecha());
    }

    // Convertir hora en formato "HH:MM" a minutos
    convertirHoraAMinutos(hora) {
        const [horaCita, minutoCita] = hora.split(":").map(Number);
        return horaCita * 60 + minutoCita;
    }


    // Calcular el rango de tiempo de la cita (inicio, fin)
    calcularRangoDeTiempo() {
        const inicio = this.convertirHoraAMinutos(this.getHora());
        const fin = inicio + this.duracion;
        return { inicio, fin };
    }

    // Verificar si la cita está dentro de la disponibilidad del médico
    esCitaValida(disponibilidad) {
        const [horaCita, minutoCita] = this.getHora().split(":").map(Number);

        // Buscar la disponibilidad del médico para la fecha y hora específicas
        const medicoDisponibilidad = disponibilidad.find((d) => {
            const fechaDisponibilidad = new Date(d.getFecha());
            const fechaCita = new Date(this.getFecha());

            return (
                d.getMedico() === this.getMedico() &&
                fechaDisponibilidad.toDateString() === fechaCita.toDateString()
            );
        });

        // Validar si se encontró la disponibilidad
        if (!medicoDisponibilidad) {
            return "El médico no está disponible en la fecha seleccionada.";
        }

        // Validar si el horario está definido
        if (!medicoDisponibilidad.getHorario()) {
            return "No se encontró un horario definido para la disponibilidad del médico.";
        }

        // Desglosamos las horas del horario del médico
        const [horaInicioMedico, minutoInicioMedico] = medicoDisponibilidad.getHorario().split("-")[0].split(":").map(Number);
        const [horaFinMedico, minutoFinMedico] = medicoDisponibilidad.getHorario().split("-")[1].split(":").map(Number);

        console.log("Horario del médico:", medicoDisponibilidad.getHorario());

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
        return ultimaCita && this.getTipo() !== "urgencia" && new Date(this.getFecha())
            - new Date(ultimaCita.fecha) < 7 * 24 * 60 * 60 * 1000;
    }
};
