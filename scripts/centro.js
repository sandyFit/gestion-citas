window.Centro = class Centro {
    #nombre;
    #horario;

    constructor(nombre, horario) {
        this.#nombre = nombre;
        this.#horario = horario; // { inicio: "08:00", fin: "18:00" }
    }

    getNombre() {
        return this.#nombre;
    }

    getHorario() {
        // Retorna una copia del objeto para evitar modificaciones externas
        return { ...this.#horario };
    }

    setHorario(inicio, fin) {
        if (!this.#esHoraValida(inicio) || !this.#esHoraValida(fin)) {
            throw new Error("Horario inválido. Use el formato HH:MM.");
        }
        this.#horario = { inicio, fin };
    }

    #esHoraValida(hora) {
        // Valida que la hora esté en formato HH:MM (24 horas)
        return /^([01]\d|2[0-3]):[0-5]\d$/.test(hora);
    }

    getDetalles() {
        return `Centro: ${this.getNombre()} 
            \nHorario: ${this.getHorario().inicio} - ${this.getHorario().fin}`;
    }
};

class CentroPrimaria extends Centro {
    constructor(nombre) {
        super(nombre, { inicio: "08:00", fin: "18:00" });
    }
}

class CentroEspecializada extends Centro {
    constructor(nombre) {
        super(nombre, { inicio: "09:00", fin: "17:00" });
    }
}
