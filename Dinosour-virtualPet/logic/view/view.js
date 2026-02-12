/* Se encarga del apartado visual del programa, aqui se buscan los elementos
visuales, se refresca la pantalla y se maneja mostrar mensajes y modals
de HTML*/

// Definimos los elementos visuales
const elements = {
    nameDisplay: document.querySelector('.pet-name-display'),
    img: document.getElementById('dino-pet'),
    bubble: document.getElementById('dino-thoughts'),
    
    stats: {
        temp: document.getElementById('stat-temp'),
        hunger: document.getElementById('stat-hunger'),
        happiness: document.getElementById('stat-happiness')
    },
    bars: {
        temp: document.getElementById('temp-bar'),
        hunger: document.getElementById('hunger-bar'),
        happiness: document.getElementById('happiness-bar'),
        growth: document.getElementById('growth-bar')
    },
    btns: {
        warm: document.getElementById('btn-warm'),
        pet: document.getElementById('btn-pet'),
        save: document.getElementById('btn-save'),
        reset: document.getElementById('btn-reset'),
        kitchen: document.getElementById('btn-go-kitchen')
    },
    modal: {
        dialog: document.getElementById('evolution-modal'),
        message: document.getElementById('evo-message')
    }
};

let messageTimer = null;

// Función para refrescar toda la pantalla
function updateUI(state, isAnimating) {
    if(elements.nameDisplay) elements.nameDisplay.textContent = state.name;

    if (!isAnimating) {
        elements.img.src = Persistence.getImgSrc(state.stage);
        elements.img.className = `pixel-art ${Persistence.getSizeClass(state.stage)}`;
    }

    if (state.stage === 'egg') {
        elements.stats.temp.classList.remove('hidden');
        elements.stats.hunger.classList.add('hidden');
        elements.stats.happiness.classList.add('hidden');
        
        elements.btns.warm.classList.remove('hidden');
        elements.btns.kitchen.classList.add('is-disabled');

        elements.bars.temp.value = state.temperature;
        elements.bars.growth.value = Math.floor(state.incubationProgress);
    } else {
        elements.stats.temp.classList.add('hidden');
        elements.stats.hunger.classList.remove('hidden');
        elements.stats.happiness.classList.remove('hidden');
        
        elements.btns.warm.classList.add('hidden');
        elements.btns.kitchen.classList.remove('is-disabled');

        elements.bars.hunger.value = state.hunger;
        elements.bars.happiness.value = state.happiness;
        elements.bars.growth.value = Math.floor(state.growth);
    }
}

//Muestra un mensaje y el tiempo en que lo muestra
function showMessage(text) {
    // Ponemos el texto
    elements.bubble.textContent = text;
    
    // SI ya había una cuenta regresiva pendiente, se cancela.
    // evita que el mensaje anterior borre al nuevo antes de tiempo.
    if (messageTimer) {
        clearTimeout(messageTimer);
    }

    // Iniciamos una nueva cuenta regresiva usando la config
    messageTimer = setTimeout(() => {
        elements.bubble.textContent = "...";
        messageTimer = null; // Se limpia la variable
    }, CONFIG.messageDuration); 
}
// Muestra un modal en el juego
function showEvoModal(name, stageName) {
    if (elements.modal.dialog && elements.modal.message) {
        elements.modal.message.innerHTML = `FELICIDADES <strong>${name}</strong><br>ha pasado a la etapa<br><strong>${stageName}</strong>`;
        elements.modal.dialog.showModal();
    }
}