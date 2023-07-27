const opcionesBebidas = [
    "Cerveza",
    "Gaseosa",
    "Agua"
];

const validarEdad = (edad) => {
    if (isNaN(edad)) {
        alert("Tu edad, capo! Numeritos!.");
        return false;
    } else {
        return true;
    }
}

let edad = prompt("Ingresa tu edad amiguin!");

const verificarCumpleaños = () => {
    const fechaCumpleaños = prompt("¿Cuál es tu fecha de cumpleaños? (Formato: DD/MM)");
    const fechaHoy = new Date();
    const mesCumpleaños = parseInt(fechaCumpleaños.split('/')[1]);
    const mesHoy = fechaHoy.getMonth() + 1;

    if (mesCumpleaños === mesHoy) {
        console.log("¡Feliz cumpleaños! Tienes una entrada gratis.");
    } else {
        console.log("Te esperan adentro, rey");
    }

        let opcionesTexto = opcionesBebidas.map((opcion, index) => `${index + 1}: ${opcion}`).join(', ');
        let opciones = prompt(`¿Qué te gustaría tomar? (${opcionesTexto})`);
        let seleccion = parseInt(opciones);

        if (isNaN(seleccion) || seleccion < 1 || seleccion > opcionesBebidas.length) {
            alert("Ah, te gusta hacerte el rebelde");
        } else {
            console.log(`Acá tenes tu ${opcionesBebidas[seleccion - 1].toLowerCase()}, rey`);
        }
    }


if (validarEdad(edad)) {
    if (edad > 17) {
        verificarCumpleaños();
    } else {
        console.log("No podes entrar, purrete!");
    }
}