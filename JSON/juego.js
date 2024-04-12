document.addEventListener("DOMContentLoaded", cargarCartas);

function cargarCartas() {
    fetch("..JSON/data.json")
        .then(response => response.json())
        .then(data => inicializarCartas(data))
        .catch(error => console.error("Error al cargar las cartas:", error));
}

function inicializarCartas(cartas) {
    localStorage.setItem("cartas", JSON.stringify(cartas));
    cartas.forEach(carta => crearBotonCarta(carta.numero, carta.nombre, carta.cantidad));
}

document.getElementById('formularioCartas').addEventListener('submit', evento => {
    evento.preventDefault();
    const numero = document.getElementById("idCarta").value;
    const nombre = document.getElementById("nombreCarta").value;
    manejarCarta(numero, nombre);
});

function manejarCarta(numero, nombre) {
    let cartas = JSON.parse(localStorage.getItem("cartas")) || [];
    let carta = cartas.find(c => c.numero === numero);

    if (carta) {
        carta.cantidad++;
    } else {
        cartas.push({ numero, nombre, cantidad: 1 });
        crearBotonCarta(numero, nombre, 1);
    }
    localStorage.setItem("cartas", JSON.stringify(cartas));
    actualizarTabla();
}

function crearBotonCarta(numero, nombre, cantidad) {
    const seccion = document.getElementById("cartasActivas");
    const boton = document.createElement("button");
    boton.textContent = `${nombre} (${cantidad})`;
    boton.classList.add("card-button");
    boton.onclick = () => manejarCarta(numero, nombre);
    seccion.appendChild(boton);
}

function actualizarTabla() {
    const cartas = JSON.parse(localStorage.getItem("cartas"));
    const tbody = document.getElementById("detalleCartas");
    tbody.innerHTML = "";
    cartas.sort((a, b) => b.cantidad - a.cantidad);
    cartas.forEach(carta => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${carta.numero}</td><td>${carta.nombre}</td><td>${carta.cantidad}</td>`;
        tbody.appendChild(fila);
    });
}
