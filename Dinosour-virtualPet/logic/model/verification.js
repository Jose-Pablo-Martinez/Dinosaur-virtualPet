const Verification = {
    // Verifica que quieres borrar la partida
    confirmReset (callback) {
        const userConfirmed = confirm("¿ESTÁS SEGURO? \n\nEsto borrará a"
            + " tu mascota para siempre y tendrás que empezar desde el huevo." 
            + " Esta acción no se puede deshacer.");
        
        if (userConfirmed) {
            callback(); // Ejecuta la función de reseteo si dice que sí
        }
    }
};

/*Call back es una función que le pase para que se ejecute después
si el usuario confirmo, en este caso se confirma en el if*/