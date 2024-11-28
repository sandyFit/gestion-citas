window.Centro = class Centro {
    constructor(nombre, horario) {
        this.nombre = nombre;
        this.horario = horario; // { inicio: "08:00", fin: "18:00" }
    }
}

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
