/* Para modificar las configuraciones internas del juego,
así como los mensajes predeterminados"*/

const CONFIG = {
    // Tiempos y tasas
    eggGrowthRate: 0.5,
    normalGrowthRate: 0.1, //Tasa de crecimiento lineal (sumando) hasta llegar a 100.
    hungerDecayMs: 45000, 
    tempDecayRate: 0.5,
    
    // Mimos
    mimosDecayThreshold: 15, 
    
    minTempForGrowth: 75,
    minHungerForHappy: 80,
    maxMimos: 50,

    // Animaciones
    clickGifDuration: 2000,
    hatchGifDuration: 4000,

    messageDuration: 6000, // Duración de los mensajes

    // Rutas
    gifClick: './assets/img/egg-gif.gif',
    gifHatch: './assets/img/egg-born.gif'
};

const STAGE_MESSAGES = {
    baby: {
        random: [
            "Goo goo ga ga...", "¡Mami!", "*Bostezo*", "*la juzga*",
            "Si, hace poco era un huevo, pero... ya no", "Zzz..."
        ],
        click: [
            "¡Jijiji!", "¡Cosquillas!", "¡Te amo!", "¡Acariciame!", "¡oye k te paza?!"
        ]
    },
    kid: {
        random: [
            "Juguemos a las escondidas", "*Le muerde por error*",
            "Me gusta Dinosaurio de Disney", "Persiguiendo mariposas...", "¡Rawr! (en chikito)"
        ],
        click: [
            "¡Ola!", "¿Qué necesitas mamá?", "Del 1 al 10 ¿cuánto miedo doy?",
            "*le devuelve el toque con su cabeza*", "Soy de brazos cortos. Si no te picaria de regreso >:D"
        ]
    },
    juvenile: {
        random: [
            "Que bueno que no soy Therian...", "*suspiro*",
            "Ya te puedo ganar a las vencidas... aun con estos bracitos",
            "Observando el territorio...", "Mmm... tengo antojo."
        ],
        click: [
            "Si te me quedas viendo se vuelve... incomodo", "Estoy bien, mamá.",
            "¿Esto es gracioso para ti?", "Ve a picar a tu abuela", "Grrr..."
        ]
    },
    adult: {
        random: [
            "Ooh, yo se lo que les gusta a las mujeres", "ROAAAR.",
            "Si alguna vez te enamoras de una mujer, asegúrate de que tenga agallas",
            "Recuerdo cuando era un huevo...", "Todo en orden por aquí Mamá."
        ],
        click: [
            "Naci por mi madre, morire en batalla por ella", "Estoy aquí para ti.",
            "Mi señora.", "Grrr... (de cariño)", "POZOLE!!!"
        ]
    }
};