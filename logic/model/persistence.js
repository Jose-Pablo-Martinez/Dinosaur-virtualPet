const SAVE_KEY = 'carno_save_v3'; // Versión del código de seguridad

const Persistence = {
    
    // Cargar
    load() {
        const data = localStorage.getItem(SAVE_KEY); //Busca en la memoria del navegador
        return data ? JSON.parse(data) : null;  //Devuelve un JSON (persistencia) o null
    },

    // Guardar
    save(state) {
        state.lastLogin = Date.now();
        localStorage.setItem(SAVE_KEY, JSON.stringify(state)); 
    },

    //Crear STAGE Inicial
    createState(name) {
        return {
            name: name,
            stage: 'egg', 
            hunger: 100,
            happiness: 100,
            mimos: 0,
            growth: 0,

            // Valores del huevo
            temperature: 80,    
            incubationProgress: 0, 
            lastLogin: Date.now()
        };
    },
    
    getImgSrc(stage) {
        const images = {
            'egg': './assets/img/egg-carno.png',
            'baby': './assets/img/baby-carno.png',
            'kid': './assets/img/kid-carno.png',
            'juvenile': './assets/img/juve-carno.png',
            'adult': './assets/img/adult-carno.png'
        };
        return images[stage] || images['baby'];
    },

    // Obtener la clase CSS para las imagenes
    getSizeClass(stage) {
        const sizes = {
            'egg': 'stage-egg',
            'baby': 'stage-baby',
            'kid': 'stage-kid',
            'juvenile': 'stage-juve',
            'adult': 'stage-adult'
        };
        return sizes[stage] || 'stage-baby';
    }
};