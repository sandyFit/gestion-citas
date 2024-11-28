document.addEventListener("DOMContentLoaded", () => {

    const utils = window.utils;

    // Crear centros de atención
    const centrosAtencion = [
        new CentroPrimaria("Centro de Atención Primaria"),
        new CentroEspecializada("Centro de Atención Especializada"),
    ];

    // Arreglos para almacenar las entidades
    const disponibilidad = [];
    const citas = [];
    const cumplimiento = [];

    const formDisponibilidad = document.getElementById("formDisponibilidad");
    const formCitas = document.getElementById("formCitas");
    const formCumplimiento = document.getElementById("formCumplimiento");

    const listaDisponibilidad = document.getElementById("listaDisponibilidad");
    const listaCitas = document.getElementById("listaCitas");
    const listaCumplimiento = document.getElementById("cumplimientoList");

    // Manejo de formularios

    formDisponibilidad.addEventListener("submit", (e) => {
        e.preventDefault();
        const medico = document.getElementById("medico").value;
        const fecha = document.getElementById("fecha").value;
        const horario = document.getElementById("horario").value;
        const centroSeleccionado = document.getElementById("centroMedicoDisponibilidad").value;

        // Buscar el centro seleccionado
        const centro = centrosAtencion.find(c => c.nombre === centroSeleccionado);

        if (!centro || !centro.horario) {
            console.error("Centro encontrado:", centro); // Muestra el centro para depuración
            utils.displayAlert("Centro médico no válido o no tiene horario definido.");
            return;
        }


        const disponibilidadObj = new Disponibilidad(medico, fecha, horario, centro);

        if (!disponibilidadObj.esFechaValida()) {
            utils.displayAlert("La fecha debe ser posterior a la fecha actual.");
            return;
        }

        if (!disponibilidadObj.esHorarioValido(centro)) {
            utils.displayAlert(`El horario del médico no está dentro del horario del centro.`);
            return;
        }

        disponibilidad.push(disponibilidadObj);
        utils.displayAlert('Médico registrado con éxito');
        listaDisponibilidad.innerHTML += `<li>
            <strong>Médico:</strong> ${utils.primeraEnMayuscula(medico)}<br>
            <strong>Fecha:</strong> ${fecha}<br>
            <strong>Horario:</strong> ${horario}<br>
            <strong>Centro:</strong> ${centro.nombre}
        </li><br>`;

        formDisponibilidad.reset();
    });

    formCitas.addEventListener("submit", (e) => {
        e.preventDefault();
        const paciente = document.getElementById("paciente").value;
        const tipo = document.getElementById("tipo").value;
        const medico = document.getElementById("medicoCita").value;
        const fecha = document.getElementById("fechaCita").value;
        const hora = document.getElementById("horaCita").value;
        const centroSeleccionado = document.getElementById("centroMedicoCitas").value;

        // Buscar el centro seleccionado
        const centro = centrosAtencion.find((c) => c.nombre === centroSeleccionado);

        const citaObj = new Cita(paciente, tipo, medico, fecha, hora, centro.nombre);

        if (!citaObj.validarFechaCita()) {
            utils.displayAlert("La fecha debe ser posterior a la fecha actual.");
            return;
        }

        const mensajeValidacion = citaObj.esCitaValida(disponibilidad);
        if (mensajeValidacion !== true) {
            utils.displayAlert(mensajeValidacion); // Muestra el mensaje que devuelve la validación
            return;
        }

        const ultimaCita = citas.find((c) => c.paciente === paciente);
        if (citaObj.esCitaDeSeguimiento(ultimaCita)) {
            utils.displayAlert("No es posible agendar otra cita para este paciente en menos de una semana, salvo que sea una urgencia.");
            return;
        }

        citas.push(citaObj);
        utils.displayAlert('Cita registrada con éxito');
        listaCitas.innerHTML += `<li>
            <strong>Tipo de Cita:</strong> ${utils.primeraEnMayuscula(tipo)}<br>
            <strong>Paciente:</strong> ${utils.primeraEnMayuscula(paciente)}<br>
            <strong>Médico:</strong> ${utils.primeraEnMayuscula(medico)}<br>
            <strong>Fecha:</strong> ${fecha}<br>
            <strong>Hora:</strong> ${hora}<br>
            <strong>Centro:</strong> ${centro.nombre}
        </li><br>`;

        formCitas.reset();
    });

    formCumplimiento.addEventListener("submit", (e) => {
        e.preventDefault();
        const paciente = document.getElementById("pacienteCumplimiento").value;
        const motivo = document.getElementById("motivoCumplimiento").value;
        const tratamiento = document.getElementById("tratamiento").value;

        const cumplimientoObj = new Cumplimiento(paciente, motivo, tratamiento);
        cumplimiento.push(cumplimientoObj);

        utils.displayAlert('Cumplimiento e historia registrados con éxito');
        listaCumplimiento.innerHTML += `<li>
            <strong>Paciente:</strong> ${utils.primeraEnMayuscula(paciente)}<br>
            <strong>Motivo:</strong> ${motivo}<br>
            <strong>Tratamiento:</strong> ${tratamiento}
        </li><br>`;

        formCumplimiento.reset();
    });
});
