document.addEventListener('DOMContentLoaded', () => {
    // Analiza si hay datos guardados. Si sí se redirecciona a principal-room.html
    if (Persistence.load()) {
        window.location.href = 'principal-room.html';
        return;
    }

    // Crear el carnotaurus
    document.getElementById('btn-start').addEventListener('click', () => {
        const name = document.getElementById('name-input').value;
        if (!name) return alert("¡Ponle un nombre a tu carnotaurus!");

        // Manejo de la persistencia
        const newState = Persistence.createState(name);
        Persistence.save(newState);
        
        window.location.href = 'principal-room.html';
    });
});