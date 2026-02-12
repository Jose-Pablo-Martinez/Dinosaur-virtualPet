/* Se encarga de inicializar y controlar la lógica del juego. 
   Funciona como un centro de mando */

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Verificar si las dependencias fueron iniciadas
        if (typeof Persistence === 'undefined' || 
            typeof Controller === 'undefined' || 
            typeof elements === 'undefined') {
            throw new Error("Error crítico: Faltan módulos del sistema (Persistence/Controller/View). Revisa el index.html");
        }

        // Verificación del inicio del DOM
        if (!elements.img || !elements.nameDisplay) {
            throw new Error("Error de UI: No se encontraron elementos vitales en el HTML.");
        }

        console.log("Iniciando Sistema Tu mascota carnotaurus...");

        // Inicia en el estado inicial (huevo)
        const loadedState = initState(); 
        
        // Redirige a index.html si no hay partida
        if (!loadedState) {
            console.warn("No hay partida guardada. Redirigiendo a Intro...");
            window.location.href = 'index.html';
            return;
        }

        // Iniciar las vistas
        updateUI(state, isAnimating);
        
        // Iniciar la logica del juego
        startLoops();                 

        // Iniciar controlador
        Controller.init();
        
        console.log("Sistema Carnotaurus Iniciado exitosamente");

    } catch (error) {

        console.error("❌ ERROR FATAL AL INICIAR EL JUEGO:", error);
        
        alert("Ocurrió un error al cargar a tu mascota:\n" + error.message + "\n\nSe intentará reiniciar la partida por seguridad.");
        localStorage.removeItem('carno_save_v3'); window.location.reload(); //Se reinicia la partida
    }
});

        // SOLO EN CASO DE EMERGENCIA: Si el error es por datos corruptos, a veces es mejor limpiar
        // Uncomment the line below if you want auto-reset on crash
        // localStorage.removeItem('carno_save_v3'); window.location.reload();