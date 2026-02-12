/* Manejo y control de los eventos. Conecta al usuario con la lógica */

const Controller = {
    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        // Click en la mascota
        elements.img.addEventListener('click', () => {
            
            // Si es un huevo
            if (state.stage === 'egg') {
                triggerEggClickAnimation(); // Esta función está en game.js
            } 
            // Si es un dinosaurio
            else if (!isAnimating) {
                const msg = getStageMessage('click'); //Pasa un mensaje de click
                showMessage(msg); //Muestra el mensaje
                
                // Efecto visual (esto sí puede ir aquí o en view.js)
                elements.img.style.transform = "scale(1.05) rotate(2deg)";
                setTimeout(() => elements.img.style.transform = "scale(1) rotate(0deg)", 200);
            }
        });

        // Funcionamiento del boton calentar
        elements.btns.warm.addEventListener('click', () => {
            if (isAnimating || state.stage !== 'egg') return;
            
            state.temperature = Math.min(100, state.temperature + 10);
            
            if (state.temperature > 90) showMessage("¡No puede hacer tanto CALOOOOR!");
            else showMessage("Gracias mamá. Justo lo que necesitaba");
            
            updateUI(state, isAnimating);
            
            elements.img.style.filter = "brightness(1.2) sepia(1) hue-rotate(-50deg)";
            setTimeout(() => elements.img.style.filter = "none", 300);
        });

        // Funcionamiento del botón de mimos
        elements.btns.pet.addEventListener('click', () => {
            if (isAnimating) return;

            if (state.stage === 'egg') {
                triggerEggClickAnimation();
            } else {
                if (state.mimos < CONFIG.maxMimos) {
                    state.mimos += 5;
                    showMessage("¡Te amo mamá! ❤️");
                } else {
                    showMessage("¡Fue un ataque de amor! ❤️");
                }
                elements.img.style.transform = "scale(1.1)";
                setTimeout(() => elements.img.style.transform = "scale(1)", 200);
                updateUI(state, isAnimating); 
            }
        });

        // Funcionamiento del boton de cocina
        elements.btns.kitchen.addEventListener('click', (e) => {
            e.preventDefault();
            if (isAnimating || state.stage === 'egg') {
                showMessage("¡Espera a que nazca, no quieras comer huevos con tocino!");
                return;
            }
            Persistence.save(state);
            window.location.href = 'kitchen.html';
        });

        // Guardar progreso
        elements.btns.save.addEventListener('click', () => {
            Persistence.save(state);
            alert("¡Progreso Guardado!");
        });

        // Resetear
        elements.btns.reset.addEventListener('click', () => {
            Verification.confirmReset(() => {
                localStorage.removeItem('carno_save_v3'); //Elimina el codigo de seguridad de la memoria del dispositivo
                location.reload();
            });
        });
    }
};