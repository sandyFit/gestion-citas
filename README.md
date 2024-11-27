# Sistema para gestionar citas médicas

### Tanto los centros de atención primaria como los de atención especializada en salud, diariamente registran las solicitudes de pacientes que buscan atención médica a través del mecanismo de solicitud de cita.
## Funcionalidades del Sistema:
1. Registro de disponibilidad.
2. Registro de citas.
3. Registro de cumplimiento.

### <strong> Registro de disponibilidad </strong>
### El sistema hace las siguientes validaciones antes the registrar la disponibilidad del médico:
- Valida si la fecha ingresada es posterior a la fecha actual.
- Valida si el horario del médico está dentro del horario del centro de atención seleccionado.

### <strong> Registro de citas </strong>
### El sistema valida si la hora de la cita está dentro del horario disponible del médico: Antes de registrar una cita, debemos asegurarnos de que la hora de la cita esté dentro del horario en que el médico está disponible.
- Valida si la fecha ingresada es posterior a la fecha actual.
- Valida si la hora de la cita está dentro del horario del médico seleccionado.
- Valida que las citas de seguimiento del paciente no sean programadas en menos de 7 días.

### <strong> Registro de cumplimiento </strong>
### Incluye una breve historia clínica del pacinte con  su nombre, motivo de consulta y respectivo tratamiento.
