document.addEventListener('DOMContentLoaded', () => {
    // Cargar el estado de la persistencia
    let state = Persistence.load();
    
    if (!state) {
        window.location.href = 'index.html';
        return;
    }

    // Elementos DOM
    const nameDisplay = document.querySelector('.pet-name-display');
    const dinoImg = document.getElementById('dino-kitchen'); 
    const msg = document.getElementById('kitchen-msg');
    const hungerBar = document.getElementById('kitchen-hunger-bar'); 

    // Render inicial
    if(nameDisplay) nameDisplay.textContent = state.name;
    
    dinoImg.src = Persistence.getImgSrc(state.stage);
    dinoImg.className = `pixel-art ${Persistence.getSizeClass(state.stage)}`;
    
    if(hungerBar) hungerBar.value = state.hunger;

    // Logica para la alimentación (Touch y mouse)
        function feedDino(foodValue) {
        if (state.hunger >= 100) {
            msg.textContent = "¡Estoy llenísimo! 🤢";
            dinoImg.style.transform = "scale(1) rotate(0deg)";
        } else {
            // Convertir a número
            const val = Number.parseInt(foodValue);
            
            // Sumar saciedad y felicidad
            state.hunger = Math.min(100, state.hunger + val);
            state.happiness = Math.min(100, state.happiness + 5); // Comer da felicidad

            msg.textContent = "¡Ñam ñam! Qué rico 🍖";
            
            dinoImg.style.transform = "scale(1.2)";
            setTimeout(() => dinoImg.style.transform = "scale(1)", 300);

            // Actualiza barra y guarda
            if(hungerBar) hungerBar.value = state.hunger;
            Persistence.save(state);
        }
    }

    // Drag an drop (Para PC) ---
    document.querySelectorAll('.food-item').forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('val', item.dataset.val);
        });
        
        // Touch events (Para Celular) ---
        // Se llama a la función para cada comida
        setupMobileTouch(item, dinoImg, feedDino);
    });

    // Zona de destino (Solo PC)
    dinoImg.addEventListener('dragover', e => { 
        e.preventDefault(); 
        dinoImg.style.transform = "scale(1.1)";
    });
    
    dinoImg.addEventListener('dragleave', e => { 
        dinoImg.style.transform = "scale(1)"; 
    });
    
    dinoImg.addEventListener('drop', e => { 
        e.preventDefault();
        dinoImg.style.transform = "scale(1)";
        const val = e.dataTransfer.getData('val');
        feedDino(val);
    });

    // Botón Volver
    document.getElementById('btn-back').addEventListener('click', () => {
        window.location.href = 'principal-room.html';
    });
});

// Simulación del drag an drop en celular
function setupMobileTouch(item, dinoImg, callbackFeed) {
    let originPos // Recuerda donde esta la comida

    item.addEventListener('touchstart', (e) => {
        // Evitar scroll mientras arrastramos
        e.preventDefault();
        
        // Guardamos posición original
        const rect = item.getBoundingClientRect();
        originPos = { left: rect.left, top: rect.top };

        // Preparar el elemento para moverse libremente
        item.style.position = 'fixed'; 
        item.style.zIndex = '1000';
        item.style.transition = 'none'; // Sin animación para que siga al dedo rápido
        //Permite que el navegador vea a travez del objeto comida
        item.style.pointerEvents = 'none';

        // Colocarlo bajo el dedo inmediatamente
        const touch = e.touches[0];
        moveItemTo(item, touch.clientX, touch.clientY);
    }, { passive: false });

    item.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Esto evita que la pantalla se mueva
        const touch = e.touches[0];
        moveItemTo(item, touch.clientX, touch.clientY);
        
        // Feedback de si estamos sobre el dino
        const elementUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);
        if (elementUnderFinger === dinoImg) {
            dinoImg.style.transform = "scale(1.1)"; // Animación del dino
        } else {
            dinoImg.style.transform = "scale(1)";
        }
    }, { passive: false });

    item.addEventListener('touchend', (e) => {
        // ¿Dónde soltamos el dedo?
        const touch = e.changedTouches[0];
        const elementUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);

        // ¿Soltamos sobre el dino?
        if (elementUnderFinger === dinoImg) {
            callbackFeed(item.dataset.val); // ALIMENTAR
        }

        // Resetear la comida (volver al estante de opciones)
        item.style.position = '';
        item.style.zIndex = '';
        item.style.left = '';
        item.style.top = '';
        item.style.transform = '';
        dinoImg.style.transform = "scale(1)";
    });
}

// Ayudante para mover el div
function moveItemTo(element, x, y) {
    // Centrar el elemento en el dedo (asumiendo 60px de ancho)
    element.style.left = (x - 30) + 'px';
    element.style.top = (y - 30) + 'px';
}