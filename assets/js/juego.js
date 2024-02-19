const mymodule = (()=> {
    "use strict"

    const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];
    
    let deck = [];
    
    let ptsJgdrs = [0,0];
    
    //Referencias del HTML -Variables del HMTL
    const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo"),
        puntos = document.querySelectorAll("small"),
        divCartasJgdrs = document.querySelectorAll(".divCartas");

    //Crear el deck
    const crearDeck = () => {

        deck = [];

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
        return _.shuffle(deck);
    }

    //Esta funcion inicia el Juego.
    const inicializarJuego = (numJgds = 2) => {
        //Barajar Deck
        deck = crearDeck();
        // console.log(deck);
        ptsJgdrs = [];
        for (let i = 0; i < numJgds; i++){
            ptsJgdrs.push(0);
        }
        // console.log({ ptsJgdrs });
        // deck = [];
        // deck = crearDeck();

        btnPedir.disabled = false;
        btnDetener.disabled = false;

        puntos.forEach(elem => elem.innerText = 0);
        divCartasJgdrs.forEach(elem => elem.innerHTML = "");
        // puntos[0].innerText = 0;
        // puntos[1].innerText = 0;

        // puntosComp = 0;
        // puntosJug = 0;

        // divCartasJgdrs[0].innerHTML = "";
        // divCartasJgdrs[divCartasJgdrs.length - 1].innerHTML = "";
    }


    //Pedir una carta.
    const pedirCarta = () => {
        // if (deck.length === 0) {
        //     // throw "No hay cartas en el deck";
        // }
        return deck.pop();
    }

    //Valores de las cartas
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? (valor === "A") ? 11 : 10 : valor * 1;    
    }

    // const valorA = (puntosJug,puntosComp) => {
    //     if (puntosJug >= 12) {
    //         return 1;
    //     } else {
    //         return 11;
    //     } 

    //     if (puntosComp >= 12) {
    //         return 1;
    //     } else {
    //         return 11;
    //     } 
    // }

    const acumPuntos = (carta, turno) => {
        ptsJgdrs[turno] = ptsJgdrs[turno] + valorCarta(carta);
        puntos[turno].innerText = ptsJgdrs[turno];
        return ptsJgdrs[turno];
    }
    
    const crearCarta = (carta,turno) => {
        const imgCarta = document.createElement("img");
        imgCarta.src = `/assets/cartas/${carta}.png`;

        // divCartasComp.append(imgCarta);
        divCartasJgdrs[turno].append(imgCarta);
        imgCarta.classList.add("carta");
    }

    //Turno Computadora
    const turnoComp = (puntosMin) => {
        let puntosComp = 0;

        do {
            const carta = pedirCarta();
            puntosComp = acumPuntos(carta, ptsJgdrs.length - 1);
            // puntosComp = puntosComp + valorCarta(carta);
            // puntos[1].innerText = puntosComp;
            crearCarta(carta, ptsJgdrs.length - 1);            
            // const imgCarta = document.createElement("img");
            // imgCarta.src = `/assets/cartas/${carta}.png`;

            // divCartasComp.append(imgCarta);
            // imgCarta.classList.add("carta");

            // if (puntosMin > 21) {
            //     break;
            // } 
        } while ((puntosComp < puntosMin) && (puntosMin <= 21));

        setTimeout(()=> {
            mensGanador(puntosComp, puntosMin);
        },350);
        
    }

    //btnDetener
    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComp(ptsJgdrs[0]);
        // mensGanador(puntosComp, puntosJug);
    });

    //Boton Pedir
    btnPedir.addEventListener("click", () => {
        const carta = pedirCarta();
        const puntosJug = acumPuntos(carta, 0);
        // puntosJug = puntosJug + valorCarta(carta);
        // puntos[0].innerText = puntosJug;
        crearCarta(carta, 0);
        // const imgCarta = document.createElement("img");
        // imgCarta.src = `/assets/cartas/${carta}.png`;

        // divCartasJug.append(imgCarta);
        // imgCarta.classList.add("carta");

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

        // const [puntosJug, puntosComp] = ptsJgdrs;
        
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
        inicializarJuego();

    });

    return {
        nuevoJuego: inicializarJuego
    
    };
})();

//TODO: BORRAR

