# Sistema para Gestionar Citas Médicas

Este sistema permite gestionar las solicitudes de citas médicas en centros de atención primaria y especializada, validando la disponibilidad de los médicos, registrando citas y el cumplimiento de los procedimientos médicos. Está diseñado utilizando principios de Programación Orientada a Objetos (OOP) para mejorar la organización y escalabilidad del código.

## Funcionalidades del Sistema

1. **Registro de Disponibilidad**  
2. **Registro de Citas**  
3. **Registro de Cumplimiento**

---

## Clases y Funcionalidades

### **Clase `Centro` y sus Clases Hijas**

La clase `Centro` representa un centro médico donde se gestionan las citas y la disponibilidad de los médicos. 

#### **Atributos:**
* nombre: El nombre del centro médico.
* horarioAtencion: Un objeto que indica las horas de apertura y cierre del centro.

Existen dos clases hijas: **Centro de Atención Primaria** y **Centro de Atención Especializada**. Estas clases heredan los atributos de la clase `Centro` y extienden sus funcionalidades según las características específicas de cada tipo de centro.

---

### **Clase Disponibilidad**

La clase Disponibilidad maneja la programación de las horas disponibles de un médico en un centro de atención. Antes de registrar una disponibilidad, el sistema realiza las siguientes validaciones:

- **Validación de Fecha**: Verifica que la fecha de disponibilidad sea posterior a la fecha actual.
- **Validación de Horario**: Asegura que el horario ingresado esté dentro del horario de atención del centro seleccionado.

#### Métodos:

- **validarFechaDisponible()**: Valida si la fecha ingresada es posterior a la fecha actual.
- **validarHorarioMedico(centro)**: Verifica si el horario del médico está dentro del horario del centro de atención seleccionado.

---

### **Clase Cita**

La clase Cita gestiona las citas médicas solicitadas por los pacientes. Antes de registrar una cita, el sistema realiza las siguientes validaciones:

- **Validación de Fecha**: Verifica que la fecha de la cita sea posterior a la fecha actual.
- **Validación de Disponibilidad del Médico**: Verifica si el horario de la cita está dentro del horario del médico.
- **Validación de Cita de Seguimiento**: Asegura que las citas de seguimiento no se programen en menos de 7 días después de la última cita.

#### Métodos:

- **validarFechaCita()**: Valida si la fecha de la cita es posterior a la fecha actual.
- **esCitaValida(disponibilidad)**: Verifica si la hora de la cita está dentro del horario del médico registrado.
- **esCitaDeSeguimiento(ultimaCita)**: Verifica si la cita es de seguimiento, asegurando que no se programe en menos de 7 días desde la última cita.

---

### **Clase Cumplimiento**

La clase Cumplimiento gestiona la historia clínica del paciente durante la cita médica, incluyendo detalles como el nombre del paciente, el motivo de consulta y el tratamiento recomendado. El sistema registra esta información para fines administrativos y de seguimiento médico.

#### Métodos:

- **registrarCumplimiento()**: Registra el cumplimiento de la cita con los detalles de la consulta y tratamiento.

---


### **Flujo de Trabajo**

#### **Registro de Disponibilidad**

Cuando un médico registra su disponibilidad, el sistema verifica si el horario del médico se encuentra dentro del horario del centro de atención en que está trabajando.

1. **Registrar la disponibilidad**: Un médico registra su disponibilidad con fecha, horario y el centro donde estará disponible.
2. **Validaciones**:
   - Se valida que la fecha ingresada sea posterior a la fecha actual.
   - Se valida que el horario del médico esté dentro del horario de atención del centro seleccionado (validación realizada por las clases `CentroDeAtencionPrimaria` o `CentroDeAtencionEspecializada`).


#### **Registro de Citas**

Al registrar una cita médica, el sistema valida que la hora esté dentro del horario del centro al que pertenece el médico asignado. La clase `Cita` también podría verificar el tipo de centro.

1. **Registrar la cita**: Un paciente solicita una cita médica.
2. **Validaciones**:
   - Se valida que la fecha de la cita sea posterior a la fecha actual.
   - Se valida que la hora de la cita esté dentro del horario de disponibilidad del médico.
   - Se verifica que las citas de seguimiento no se programen en menos de 7 días desde la última cita.

#### **Registro de Cumplimiento**

El proceso de registro de cumplimiento sigue siendo el mismo, pero ahora, con la adición de las clases de centros, se puede asociar la historia clínica a un tipo de centro específico para mejorar la administración.
