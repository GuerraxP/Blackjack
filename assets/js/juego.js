let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJug = 0,
    puntosComp = 0;

//Referencias del HTML -Variables del HMTL
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");
const puntos = document.querySelectorAll("small");
const divCartasJug = document.querySelector("#jugador-cartas");
const divCartasComp = document.querySelector("#computadora-cartas");

//Crear el deck
const crearDeck = () => {
    for (let i = 2; i <= 10; i++){
        for (let tipo of tipos){
            deck.push( i + tipo );
        }
    }

    for (let tipo of tipos){
        for (let esp of especiales){
            deck.push( esp + tipo );
        }
    }
    deck = _.shuffle(deck);

    return deck;
}

//Barajar Deck
crearDeck();
console.log(deck);

//Pedir una carta.
const pedirCarta = () => {
    if (deck.length === 0) {
        crearDeck();
        // throw "No hay cartas en el deck";
    }
    const carta = deck.pop();
    return carta;
}

//Valores de las cartas
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? (valor === "A") ? valorA : 10 : valor * 1;    
}

const valorA = () => {
    if (puntosJug >= 12) {
        return 1;
    } else {
        return 11;
    } 

}

//Turno Computadora
const turnoComp = (puntosMin) => {
    do {
        const carta = pedirCarta();

        puntosComp = puntosComp + valorCarta(carta);
        puntos[1].innerText = puntosComp;

        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;

        divCartasComp.append(imgCarta);
        imgCarta.classList.add("carta");

        if (puntosMin > 21) {
            break;
        } 
    } while ((puntosComp < puntosMin) && (puntosMin <= 21));

    setTimeout(()=> {
        mensGanador(puntosComp, puntosJug);
    },250);
    
}

//btnDetener
btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComp(puntosJug);
    // mensGanador(puntosComp, puntosJug);
});

//Boton Pedir
btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();

    puntosJug = puntosJug + valorCarta(carta);
    puntos[0].innerText = puntosJug;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;

    divCartasJug.append(imgCarta);
    imgCarta.classList.add("carta");

    if (puntosJug > 21) {
        //alert("Haz Perdido");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComp(puntosJug);
        // mensGanador(puntosComp, puntosJug);
    } else if (puntosJug === 21) {
        //alert("21 Haz ganado!.")
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComp(puntosJug);
        // mensGanador(puntosComp, puntosJug);
    }
});

//Calculo del Ganador
const mensGanador = (puntosComp, puntosJug) => {
    
    if  (puntosComp === puntosJug) {
        alert("Empate");
    }else if ((puntosJug > 21) || (puntosComp > 21)) {
        (puntosJug > 21) ? alert("Haz Perdido") : alert("Haz Ganado");
    }
    else if ((puntosJug <= 21) && (puntosComp <= 21)) {
        (puntosJug > puntosComp) ? alert("Haz Ganado") : alert("Haz Perdido");
    }
}

//Boton Nuevo
btnNuevo.addEventListener("click", () => {
    console.clear();
    deck = [];

    deck = crearDeck();

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    puntos[0].innerText = 0;
    puntos[1].innerText = 0;

    puntosComp = 0;
    puntosJug = 0;

    divCartasComp.innerHTML = "";
    divCartasJug.innerHTML = "";
});

//TODO: BORRAR

