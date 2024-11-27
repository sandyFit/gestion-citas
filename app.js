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
            horario: { inicio: "08:00", fin: "18:00" },
        },
        {
            nombre: "Centro de Atención Especializada",
            horario: { inicio: "09:00", fin: "17:00" },
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
     * Función para poner mayúsculas a cada palabra de un nombre completo
     * @param {string} string - El texto a convertir (nombre completo)
     * @returns {string} - El texto con la primera letra de cada palabra en mayúscula y el resto en minúsculas
     */
    function primeraEnMayuscula(string) {
        return string
            .split(" ")  // Divide el string en partes por los espacios
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitaliza cada palabra
            .join(" ");  // Une las partes nuevamente en un solo string
    }


    formDisponibilidad.addEventListener("submit", (e) => {
        e.preventDefault();
        const medico = document.getElementById("medico").value;
        const fecha = document.getElementById("fecha").value;
        const horario = document.getElementById("horario").value;
        const centroSeleccionado = document.getElementById("centroMedicoDisponibilidad").value;

        const centro = centrosAtencion.find(c => c.nombre === centroSeleccionado);

        if (!esFechaValida(fecha)) {
            alert("La fecha debe ser posterior a la fecha actual.");
            return;
        }

        // === VALIDAR HORARIO DE ACUERDO AL CENTRO DE ATENCIÓN ===
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

        disponibilidad.push({ medico, fecha, horario, centro: centro.nombre });
        listaDisponibilidad.innerHTML += `<li>
            Médico: ${primeraEnMayuscula(medico)}<br>
            Fecha: ${fecha}<br>
            Horario: ${horario}<br>
            Centro: ${centro.nombre}
            </li><br>`;
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

        // === VERIFICAR SI LA HORA DE LA CITA ESTÁ DENTRO DEL HORARIO DEL MÉDICO ===
        const [horaCita, minutoCita] = hora.split(":").map(Number);
        const medicoDisponibilidad = disponibilidad.find((d) => d.medico === medico && d.fecha === fecha);

        if (!medicoDisponibilidad) {
            alert(`El médico ${medico} no está disponible el día ${fecha}.`);
            return;
        }

        const [horaInicioMedico, minutoInicioMedico] = medicoDisponibilidad.horario.split("-")[0].split(":").map(Number);
        const [horaFinMedico, minutoFinMedico] = medicoDisponibilidad.horario.split("-")[1].split(":").map(Number);

        const tiempoCita = horaCita * 60 + minutoCita;
        const tiempoInicioMedico = horaInicioMedico * 60 + minutoInicioMedico;
        const tiempoFinMedico = horaFinMedico * 60 + minutoFinMedico;

        if (tiempoCita < tiempoInicioMedico || tiempoCita > tiempoFinMedico) {
            alert(`La hora seleccionada está fuera del horario del médico.`);
            return;
        }

        // === VERIFICAR CITA DE SEGUIMIENTO > 7 DIAS ===
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
            Tipo de Cita — <strong>${primeraEnMayuscula(tipo)}</strong><br>
            Paciente: ${primeraEnMayuscula(paciente)}<br>
            Médico: ${primeraEnMayuscula(medico)}<br>
            Fecha: ${fecha}<br>
            Hora: ${hora}<br>
            Centro: ${centro.nombre}
        </li><br>`;

        formCitas.reset();
    });



    formCumplimiento.addEventListener("submit", (e) => {
        e.preventDefault();
        const paciente = document.getElementById("pacienteCumplimiento").value;
        const motivo = document.getElementById("motivoCumplimiento").value;
        const tratamiento = document.getElementById("tratamiento").value;

        historiaClinica.push({ paciente, motivo, tratamiento });
        historiaClinicaLista.innerHTML += `<li>
        Paciente: ${primeraEnMayuscula(paciente)}<br>
        Motivo: ${motivo}<br>
        Tratamiento: ${tratamiento}
    </li><br>`;
        formCumplimiento.reset();
    });
});
