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
        console.log("Tu edad, capo! Numeritos!.");
        return false;
    } else {
        return true;
    }
}

const verificarEdad = () => {
    edad = parseInt(document.getElementById("edad").value);
    if (validarEdad(edad)) {
        if (edad > 17) {
            document.getElementById("elegirMesaBtn").removeAttribute("disabled");
            document.getElementById("agregarBebidaBtn").removeAttribute("disabled");
            document.getElementById("quitarBebidaBtn").removeAttribute("disabled");
            document.getElementById("mostrarCarritoBtn").removeAttribute("disabled");
            document.getElementById("calcularTotalBtn").removeAttribute("disabled");

            document.getElementById("mesaVipSection");
        } else {
            Swal.fire (
                'Que haces acá?',
                'No podes entrar, purrete! Anda a ver videitos',
                'warning'
            ).then(() => {
                window.location.href = "https://www.youtubekids.com/?hl=es";
            });
        }
    }
}

const elegirMesa = () => {
    mesa.cantidadPersonas = parseInt(document.getElementById("cantidadPersonas").value);
    if (!isNaN(mesa.cantidadPersonas) && mesa.cantidadPersonas > 0) {
        if (mesa.cantidadPersonas < 4) {
            console.log("Lo siento, no es posible reservar una mesa para menos de 4 personas.");
        } else if (mesa.cantidadPersonas > 15) {
            let opcionEnanos = confirm("¡Excelente! También tenemos la opción de enanos para grupos grandes. ¿Quieres considerar esta opción?");
            if (opcionEnanos) {
                console.log("Perfecto, te ofrecemos la opción de enanos para hacer tu experiencia aún más especial.");
            }
            document.getElementById("opcionesBebidasSection");
        } else {
            document.getElementById("opcionesBebidasSection");
        }
    } else {
        console.log("Ingresa una cantidad válida de personas.");
    }
}

const agregarBebida = () => {
    let bebidaSeleccionada = document.getElementById("bebidas").value;
    let bebidaEncontrada = opcionesBebidas.find((opcion) => opcion.nombre === bebidaSeleccionada);

    if (bebidaEncontrada) {
        mesa.bebidas.push(bebidaEncontrada);
        console.log(`Has agregado ${bebidaSeleccionada} a tu mesa.`);
        guardarEnLocalStorage(); 
        mostrarCarrito(); 
    } else {
        console.log("Bebida inválida.");
    }
}

const quitarBebida = () => {
    let bebidaSeleccionada = document.getElementById("bebidas").value;
    let index = mesa.bebidas.findIndex((opcion) => opcion.nombre === bebidaSeleccionada);

    if (index !== -1) {
        mesa.bebidas.splice(index, 1);
        console.log(`Has quitado ${bebidaSeleccionada} de tu mesa.`);
        guardarEnLocalStorage(); 
        mostrarCarrito(); 
    } else {
        console.log("No se encontró esa bebida en tu mesa.");
    }
}

const mostrarCarrito = () => {
    let carritoHTML = mesa.bebidas.map(bebida => `${bebida.nombre} - ${bebida.precio}`).join('<br>');
    document.getElementById("bebidaGuardada").innerHTML = carritoHTML;
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
    console.log(`El total de tu mesa es: $${total}`);
    guardarEnLocalStorage();
    
    setTimeout(() => {
        fetch("https://dolarapi.com/v1/dolares/blue")
            .then(response => response.json())
            .then(data => {
                const precioDolar = data.oficial;
                Swal.fire({
                    title: "Campeón, está todo carísimo",
                    html: `El precio del dólar oficial es: $${precioDolar}`,
                    icon: "info",
                });
            })
            .catch(error => {
                console.error("Error al obtener el precio del dólar:", error);
            });
    }, 5000); 
}


// Event listeners
document.getElementById("ingresarBtn").addEventListener("click", verificarEdad);
document.getElementById("elegirMesaBtn").addEventListener("click", elegirMesa);
document.getElementById("agregarBebidaBtn").addEventListener("click", agregarBebida);
document.getElementById("quitarBebidaBtn").addEventListener("click", quitarBebida);
document.getElementById("mostrarCarritoBtn").addEventListener("click", mostrarCarrito);
document.getElementById("calcularTotalBtn").addEventListener("click", confirmarPedido);

cargarDesdeLocalStorage();