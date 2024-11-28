window.utils = {
    /* Función para validar si la fecha ingresada es válida(posterior a la fecha actual)
        * @param {string} fecha - Fecha en formato ISO(yyyy - mm - dd)
        * @returns {boolean} - Retorna true si la fecha es válida
    */
    esFechaValida: function (fecha) {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaInput = new Date(fecha);
        return fechaInput > hoy;
    },

    /**
         * Función para poner mayúsculas a cada palabra de un nombre completo
         * @param {string} string - El texto a convertir (nombre completo)
         * @returns {string} - El texto con la primera letra de cada palabra en mayúscula y el resto en minúsculas
     */
    primeraEnMayuscula: function (string) {
        return string
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    },

    /**
        * Muestra un mensaje de alerta en la interfaz de usuario.
        * @param {string} message - El mensaje de alerta que se desea mostrar al usuario.
        * Esta función actualiza el contenido de un elemento con la clase '.alert' en el DOM,
        * mostrando el mensaje proporcionado. Luego, el mensaje desaparece automáticamente después de 3 segundos.
        * 
        * @returns {void} - Esta función no retorna ningún valor.
     */
    displayAlert: function (message) {
        const alertText = document.querySelector('.alert');
        alertText.textContent = message;

        // Mostrar la alerta
        alertText.style.display = 'block';

        setTimeout(() => {
            // Ocultar la alerta después de 3 segundos
            alertText.textContent = '';
            alertText.style.display = 'none';
        }, 3000);
    }
};



