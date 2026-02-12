/* Logica interna del juego, maneja el comportamiento, estado y reglas */

let state = null;
let mainLoop = null;
let isAnimating = false; 
let mimosTimer = 0; 

function initState() {
    state = Persistence.load();
    if (state) {
        if (typeof state.temperature === 'undefined') state.temperature = 100;
        if (typeof state.incubationProgress === 'undefined') state.incubationProgress = 0;
    }
    return state;
}

// Logica de mensajes por etapas
function getStageMessage(type) {
    // type es "random" del mensaje
    
    // Validamos que exista la etapa en el diccionario global
    if (!STAGE_MESSAGES[state.stage]) return "...";
    const msgs = STAGE_MESSAGES[state.stage][type];
    // Si no hay mensajes (ej. huevo no tiene mensajes de texto), devolvemos algo genérico
    if (!msgs || msgs.length === 0) return "...";

    // Matemática para elegir uno al azar
    const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
    return randomMsg;
}

//Funcion principal
function startLoops() {
    mainLoop = setInterval(() => {
        if (isAnimating) return; 

        // Logica dle STAGE huevo
        if (state.stage === 'egg') {
            if (state.temperature > 0) {
                state.temperature = Math.max(0, state.temperature - CONFIG.tempDecayRate);
            }
            if (state.temperature >= CONFIG.minTempForGrowth) {
                state.incubationProgress += CONFIG.eggGrowthRate;
                if (state.incubationProgress >= 100) playHatchingSequence();
            } else if (state.temperature < 50) {
                if (Math.random() < 0.05) showMessage("¡Soy Yucateco, no oso polar! D:");
            }
        } 
        // Logica de los estados de dinosaurio
        else {
            // Sistema de mimos
            if (state.mimos > 0) {
                const decaySpeed = (state.hunger < CONFIG.minHungerForHappy) ? 2 : 1;
                mimosTimer += decaySpeed;
                if (mimosTimer >= CONFIG.mimosDecayThreshold) {
                    state.mimos -= 1;
                    mimosTimer = 0; 
                }
            }

            // Sistema de felicidad
            let foodPoints = state.hunger >= CONFIG.minHungerForHappy ? 50 : 0; //50% de la felicidad depende de la saciedad
            let mimosPoints = Math.min(state.mimos, CONFIG.maxMimos);
            state.happiness = foodPoints + mimosPoints;

            // Sistema de crecimiento del dinosaurio.
            if (state.stage !== 'adult') {
                if (state.happiness > 50) {
                    state.growth += CONFIG.normalGrowthRate;
                    if (state.growth >= 100) evolve();
                }
            }

            // Sistema de mensajes aelatorios
            if (Math.random() < 0.02) {
                const msg = getStageMessage('random'); //pasamos el random o type a la función para obtener el mensaje
                showMessage(msg);
            }
        }
        updateUI(state, isAnimating);
    }, 1000); //Bucle analiza cada segundo

    // Bucle de Hambre
    setInterval(() => {
        if (!isAnimating && state.stage !== 'egg' && state.hunger > 0) {
            state.hunger -= 1;
            Persistence.save(state);
        }
    }, CONFIG.hungerDecayMs);
}

// ACCIONES POSIBLES EN EL SISTEMA

// Nacimiento dle huevo
function playHatchingSequence() {
    isAnimating = true; 
    showMessage("¡Está naciendoooooo! Preparate");
    elements.img.src = CONFIG.gifHatch;

    setTimeout(() => {
        state.stage = 'baby';
        state.growth = 0;
        state.hunger = 50;
        state.happiness = 100;
        state.mimos = 50; 
        
        Persistence.save(state);
        isAnimating = false; 
        updateUI(state, isAnimating); 
        showEvoModal(state.name, 'Bebé');
        showMessage("¡Hola mamá!");
    }, CONFIG.hatchGifDuration);
}

function evolve() {
    state.growth = 0;
    let stageName = "";
    if (state.stage === 'baby') { state.stage = 'kid'; stageName = "Niño"; }
    else if (state.stage === 'kid') { state.stage = 'juvenile'; stageName = "Joven"; }
    else if (state.stage === 'juvenile') { state.stage = 'adult'; stageName = "Adulto"; }
    
    Persistence.save(state);
    updateUI(state, isAnimating);
    showEvoModal(state.name, stageName);
}

function triggerEggClickAnimation() {
    if (isAnimating || state.stage !== 'egg') return;
    isAnimating = true; 
    const staticSrc = elements.img.src;
    elements.img.src = CONFIG.gifClick;
    showMessage("¡Se esta moviendo!");

    setTimeout(() => {
        if (state.stage === 'egg') elements.img.src = staticSrc;
        isAnimating = false;
    }, CONFIG.clickGifDuration);
}