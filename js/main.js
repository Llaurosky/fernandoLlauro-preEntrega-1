const opcionesBebidas = [
    { nombre: "Cerveza", precio: 800 },
    { nombre: "Champagne", precio: 3500 },
    { nombre: "Semen de pitufo", precio: 1200 },
    { nombre: "Agua", precio: 600 }
];

let edad;
let mesa = {
    cantidadPersonas: 0,
    bebidas: []
};

const validarEdad = (edad) => {
    if (isNaN(edad)) {
        alert("Tu edad, capo! Numeritos!.");
        return false;
    } else {
        return true;
    }
}

const verificarEdad = () => {
    edad = parseInt(document.getElementById("edad").value);
    if (validarEdad(edad)) {
        if (edad > 17) {
            document.getElementById("mesaVipSection");
        } else {
            alert("No podes entrar, purrete!");
        }
    }
}

const elegirMesa = () => {
    mesa.cantidadPersonas = parseInt(document.getElementById("cantidadPersonas").value);
    if (!isNaN(mesa.cantidadPersonas) && mesa.cantidadPersonas > 0) {
        if (mesa.cantidadPersonas < 4) {
            alert("Lo siento, no es posible reservar una mesa para menos de 4 personas.");
        } else if (mesa.cantidadPersonas > 15) {
            let opcionEnanos = confirm("¡Excelente! También tenemos la opción de enanos para grupos grandes. ¿Quieres considerar esta opción?");
            if (opcionEnanos) {
                alert("Perfecto, te ofrecemos la opción de enanos para hacer tu experiencia aún más especial.");
            }
            document.getElementById("opcionesBebidasSection");
        } else {
            document.getElementById("opcionesBebidasSection");
        }
    } else {
        alert("Ingresa una cantidad válida de personas.");
    }
}

const agregarBebida = () => {
    let bebidaSeleccionada = document.getElementById("bebidasSelect").value;
    let bebidaEncontrada = opcionesBebidas.find((opcion) => opcion.nombre === bebidaSeleccionada);

    if (bebidaEncontrada) {
        mesa.bebidas.push(bebidaEncontrada);
        alert(`Has agregado ${bebidaSeleccionada} a tu mesa.`);
    } else {
        alert("Bebida inválida.");
    }
}

const quitarBebida = () => {
    let bebidaSeleccionada = document.getElementById("bebidasSelect").value;
    let index = mesa.bebidas.findIndex((opcion) => opcion.nombre === bebidaSeleccionada);

    if (index !== -1) {
        mesa.bebidas.splice(index, 1);
        alert(`Has quitado ${bebidaSeleccionada} de tu mesa.`);
    } else {
        alert("No se encontró esa bebida en tu mesa.");
    }
}

const mostrarCarrito = () => {
    let carritoHTML = mesa.bebidas.map(bebida => bebida.nombre).join(', ');
    document.getElementById("bebidaGuardada").textContent = carritoHTML;
    document.getElementById("pedidoGuardado");
}

const calcularTotal = () => {
    let total = 0;
    mesa.bebidas.forEach(bebida => {
        total += bebida.precio;
    });
    return total;
}

const guardarEnLocalStorage = () => {
    localStorage.setItem("mesa", JSON.stringify(mesa));
}

const cargarDesdeLocalStorage = () => {
    const datosGuardados = localStorage.getItem("mesa");
    if (datosGuardados) {
        mesa = JSON.parse(datosGuardados);
        mostrarCarrito();
    }
}

const confirmarPedido = () => {
    let total = calcularTotal();
    mostrarCarrito();
    alert(`El total de tu mesa es: $${total}`);
    guardarEnLocalStorage();
}

// Event listeners
document.getElementById("ingresarBtn").addEventListener("click", verificarEdad);
document.getElementById("elegirMesaBtn").addEventListener("click", elegirMesa);
document.getElementById("agregarBebidaBtn").addEventListener("click", agregarBebida);
document.getElementById("quitarBebidaBtn").addEventListener("click", quitarBebida);
document.getElementById("mostrarCarritoBtn").addEventListener("click", mostrarCarrito);
document.getElementById("calcularTotalBtn").addEventListener("click", confirmarPedido);

cargarDesdeLocalStorage();