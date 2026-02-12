document.addEventListener('DOMContentLoaded', () => {
    // Cargar estado
    let state = Persistence.load();
    
    if (!state) {
        window.location.href = 'index.html';
        return;
    }

    // Elementos DOM (Objetos que representan cada etiqueta)
    const nameDisplay = document.querySelector('.pet-name-display');
    const dinoImg = document.getElementById('dino-kitchen'); //Para modificar la imagen del dinosaurio
    const msg = document.getElementById('kitchen-msg');
    const hungerBar = document.getElementById('kitchen-hunger-bar'); // barra de comida en kitchen.html

    // Render inicial
    if(nameDisplay) nameDisplay.textContent = state.name;
    
    dinoImg.src = Persistence.getImgSrc(state.stage);
    dinoImg.className = `pixel-art ${Persistence.getSizeClass(state.stage)}`;
    
    // Inicia la barra de hambre del estando original
    if(hungerBar) hungerBar.value = state.hunger;

    // Sistema de Drag and Drop

    // Remitente
    document.querySelectorAll('.food-item').forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('val', item.dataset.val); //Lee el valor de cada comida
            e.dataTransfer.setData('icon', item.textContent);
        });
    });

    // Destinatario
    dinoImg.addEventListener('dragover', e => { 
        e.preventDefault();  //Los navegadores de normal no permiten soltar objetos en imagenes, le digo que no haga lo normal.
        dinoImg.style.transform = "scale(1.1)"; //Animación
    });
    
    dinoImg.addEventListener('dragleave', e => { //Cuando se aleja la comida
        dinoImg.style.transform = "scale(1)"; 
    });
    
    dinoImg.addEventListener('drop', e => { //Soltando la comida
        e.preventDefault();
        dinoImg.style.transform = "scale(1)";
        
        const val = parseInt(e.dataTransfer.getData('val'));
        const icon = e.dataTransfer.getData('icon');

        if (state.hunger >= 100) {
            msg.textContent = "¡Lele pancha ...";
        } else {
            // Sumar saciedad y felicidadad
            state.hunger = Math.min(100, state.hunger + val);
            state.happiness = Math.min(100, state.happiness + 5);

            msg.textContent = `¡Mochate! >:D`;
            
            // Actualiza barra de saciedad
            if(hungerBar) hungerBar.value = state.hunger;
            Persistence.save(state);
        }
    });

    document.getElementById('btn-back').addEventListener('click', () => {
        window.location.href = 'principal-room.html';
    });
});