function validarEdad(edad) {
    if (isNaN(edad)) {
        alert("Tu edad, capo! Numeritos!.");
        return false;
    } else {
        return true;
    }
}

let edad = prompt("Ingresa tu edad amiguin!");

function mayoriaEdad() {
    if (edad <= 17) {
        console.log("No podes entrar, purrete!");
    } else {
        console.log("Te esperan adentro, rey");

        let opciones = prompt("¿Qué te gustaría tomar? (1: Cerveza, 2: Gaseosa, 3: Agua)");

        switch (opciones) {
            case "1":
                console.log("Acá tenes tu birra");
                break;
            case "2":
                console.log("Acá tenes tu cocucha, rey");
                break;
            case "3":
                console.log("Jaa, te toca manejar? Tomá tu aguita");
                break;
            default:
                alert("Ah, te gusta hacerte el rebelde")
                break;
        }
    }
}


if (validarEdad(edad)) {
    mayoriaEdad();
}
