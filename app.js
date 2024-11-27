document.addEventListener("DOMContentLoaded", () => {
    const disponibilidad = [];
    const citas = [];
    const historiaClinica = [];

    const formDisponibilidad = document.getElementById("formDisponibilidad");
    const formCitas = document.getElementById("formCitas");
    const formCumplimiento = document.getElementById("formCumplimiento");

    const listaDisponibilidad = document.getElementById("listaDisponibilidad");
    const listaCitas = document.getElementById("listaCitas");
    const historiaClinicaLista = document.getElementById("historiaClinica");

    const centrosAtencion = [
        {
            nombre: "Centro de Atención Primaria",
            horario: { inicio: "08:00", fin: "16:00" },
            tiempoAtencion: 30, // Minutos
        },
        {
            nombre: "Centro de Atención Especializada",
            horario: { inicio: "09:00", fin: "15:00" },
            tiempoAtencion: 45, 
        },
    ];

    /**
     * Función para validar si la fecha ingresada es válida (posterior a la fecha actual)
     * @param {string} fecha - Fecha en formato ISO (yyyy-mm-dd)
     * @returns {boolean} - Retorna true si la fecha es válida
     */
    function esFechaValida(fecha) {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaInput = new Date(fecha);
        return fechaInput > hoy;
    }

    /**
     * Valida si una hora está dentro del horario de atención de un centro.
     * @param {string} hora - Hora de la cita (HH:mm).
     * @param {Object} horario - Horario del centro { inicio: "HH:mm", fin: "HH:mm" }.
     * @returns {boolean} - Retorna true si la hora está dentro del horario permitido.
     */
    function esHoraValida(hora, horario) {
        const [horaCita, minutoCita] = hora.split(":").map(Number);
        const [horaInicio, minutoInicio] = horario.inicio.split(":").map(Number);
        const [horaFin, minutoFin] = horario.fin.split(":").map(Number);

        const tiempoCita = horaCita * 60 + minutoCita;
        const tiempoInicio = horaInicio * 60 + minutoInicio;
        const tiempoFin = horaFin * 60 + minutoFin;

        return tiempoCita >= tiempoInicio && tiempoCita <= tiempoFin;
    }

    formDisponibilidad.addEventListener("submit", (e) => {
        e.preventDefault();
        const medico = document.getElementById("medico").value;
        const fecha = document.getElementById("fecha").value;
        const horario = document.getElementById("horario").value;
        const centroSeleccionado = document.getElementById("centroMedicoDisponibilidad").value;

        if (!esFechaValida(fecha)) {
            alert("La fecha debe ser posterior a la fecha actual.");
            return;
        }

        // Buscar el centro de atención seleccionado
        const centro = centrosAtencion.find(c => c.nombre === centroSeleccionado);

        // Validar si el horario ingresado está dentro del horario del centro de atención
        const [horaInicioMedico, minutoInicioMedico] = horario.split("-")[0].split(":").map(Number);
        const [horaFinMedico, minutoFinMedico] = horario.split("-")[1].split(":").map(Number);

        const [horaInicioCentro, minutoInicioCentro] = centro.horario.inicio.split(":").map(Number);
        const [horaFinCentro, minutoFinCentro] = centro.horario.fin.split(":").map(Number);

        const tiempoInicioMedico = horaInicioMedico * 60 + minutoInicioMedico;
        const tiempoFinMedico = horaFinMedico * 60 + minutoFinMedico;

        const tiempoInicioCentro = horaInicioCentro * 60 + minutoInicioCentro;
        const tiempoFinCentro = horaFinCentro * 60 + minutoFinCentro;

        if (tiempoInicioMedico < tiempoInicioCentro || tiempoFinMedico > tiempoFinCentro) {
            alert(`El horario del médico no está dentro del horario del centro 
                (${centro.horario.inicio} - ${centro.horario.fin}).`);
            return;
        }

        // Si pasa la validación, agregar la disponibilidad
        disponibilidad.push({ medico, fecha, horario });
        listaDisponibilidad.innerHTML += `<li>
        Médico: ${medico}<br>
        Fecha: ${fecha}<br>
        Horario: ${horario}
    </li>`;
        formDisponibilidad.reset();
    });


    formCitas.addEventListener("submit", (e) => {
        e.preventDefault();
        const paciente = document.getElementById("paciente").value;
        const motivo = document.getElementById("motivo").value;
        const tipo = document.getElementById("tipo").value;
        const medico = document.getElementById("medicoCita").value;
        const fecha = document.getElementById("fechaCita").value;
        const hora = document.getElementById("horaCita").value;
        const centroSeleccionado = document.getElementById("centroMedicoCitas").value;

        const centro = centrosAtencion.find((c) => c.nombre === centroSeleccionado);

        if (!esFechaValida(fecha)) {
            alert("La fecha debe ser posterior a la fecha actual.");
            return;
        }

        // Validar si la hora está dentro del horario del centro
        if (!esHoraValida(hora, centro.horario)) {
            alert(`La hora seleccionada está fuera del horario permitido (${centro.horario.inicio} 
                - ${centro.horario.fin}).`);
            return;
        }

        // Verificar si el médico está disponible
        const estaDisponible = disponibilidad.some((d) => d.medico === medico && d.fecha === fecha);

        if (!estaDisponible) {
            alert(`El médico ${medico} no está disponible el día ${fecha}.`);
            return;
        }

        // Verificar si el paciente ya tiene una cita programada en menos de 7 días
        const ultimaCita = citas.find((c) => c.paciente === paciente);
        if (
            ultimaCita &&
            tipo !== "urgencia" &&
            new Date(fecha) - new Date(ultimaCita.fecha) < 7 * 24 * 60 * 60 * 1000
        ) {
            alert(`No es posible agendar otra cita para este paciente en menos de una semana, 
                salvo que sea una urgencia.`);
            return;
        }

        citas.push({ paciente, motivo, tipo, medico, fecha, hora, centro: centro.nombre });
        listaCitas.innerHTML += `<li>
            Cita (${tipo})<br>
            Paciente: ${paciente}<br>
            Médico: ${medico}<br>
            Fecha: ${fecha}<br>
            Hora: ${hora}<br>
            Centro: ${centro.nombre}
        </li>`;
        formCitas.reset();
    });


    formCumplimiento.addEventListener("submit", (e) => {
        e.preventDefault();
        const paciente = document.getElementById("pacienteCumplimiento").value;
        const motivo = document.getElementById("motivoCumplimiento").value;
        const tratamiento = document.getElementById("tratamiento").value;

        historiaClinica.push({ paciente, motivo, tratamiento });
        historiaClinicaLista.innerHTML += `<li>
        Paciente: ${paciente}<br>
        Motivo: ${motivo}<br>
        Tratamiento: ${tratamiento}
    </li>`;
        formCumplimiento.reset();
    });
});
