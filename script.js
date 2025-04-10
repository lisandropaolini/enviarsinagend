document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los elementos del DOM
    const telefonoInput = document.getElementById('telefono');
    const mensajeInput = document.getElementById('mensaje');
    const abrirChatBtn = document.getElementById('abrirChatBtn');
    const errorMsgDiv = document.getElementById('error-msg');

    // Añadir evento al botón
    abrirChatBtn.addEventListener('click', () => {
        // Obtener y limpiar el número de teléfono
        let numero = telefonoInput.value.trim();
        // Eliminar espacios, guiones, paréntesis
        numero = numero.replace(/[\s\-()]/g, '');

        // Obtener el mensaje
        const mensaje = mensajeInput.value.trim();

        // Limpiar mensaje de error anterior
        errorMsgDiv.textContent = '';
        errorMsgDiv.style.display = 'none';

        // Validar que el número no esté vacío y sea razonable (solo dígitos)
        if (!numero) {
            errorMsgDiv.textContent = 'Por favor, ingresa un número de teléfono.';
            errorMsgDiv.style.display = 'block';
            return; // Detener ejecución si no hay número
        }
        if (!/^\d+$/.test(numero)) {
            errorMsgDiv.textContent = 'El número de teléfono solo debe contener dígitos.';
            errorMsgDiv.style.display = 'block';
            return; // Detener si contiene caracteres no numéricos
        }


        // Construir la URL base de wa.me
        let url = `https://wa.me/${numero}`;

        // Si hay un mensaje, añadirlo a la URL codificado
        if (mensaje) {
            // encodeURIComponent asegura que caracteres especiales como espacios, &, ?, etc.
            // se conviertan correctamente para la URL.
            url += `?text=${encodeURIComponent(mensaje)}`;
        }

        // Abrir la URL en una nueva pestaña (_blank)
        // o en la misma ventana (quitar '_blank')
        console.log("Abriendo URL:", url); // Para depuración en la consola
        window.open(url, '_blank');

    });

    // Opcional: Permitir enviar presionando Enter en el campo de teléfono (si no hay mensaje)
    // o en el textarea (si se presiona Enter con Ctrl/Cmd)
    telefonoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita cualquier comportamiento por defecto de Enter
             if (!mensajeInput.value.trim()){ // Si no hay mensaje, abre el chat
                abrirChatBtn.click();
             } else {
                 mensajeInput.focus(); // Si hay mensaje, mueve el foco al textarea
             }
        }
    });

     mensajeInput.addEventListener('keypress', function(event) {
        // Permitir enviar con Ctrl+Enter o Cmd+Enter desde el textarea
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
             event.preventDefault();
             abrirChatBtn.click();
        }
    });

});
