let carrito = []
let total = 0


function agregarProducto(nombre, precio){
    let producto = {
        nombre: nombre, 
        precio: precio
    };

carrito.push(producto);
console.log(carrito)

let listaCarrito = document.getElementById("listaCarrito")
let elemento = document.createElement("li");
elemento.innerText = `${nombre} - $${precio}`;
listaCarrito.appendChild(elemento);

total += precio;
let totalCarrito = document.getElementById("totalCarrito");
totalCarrito.innerText = total.toFixed(2);
document.getElementById("totalCarrito").textContent = "Total: $" + total.toFixed(2);
}

function finalizarCompra() {
    let total = document.getElementById("totalCarrito").innerText;
    let fecha = new Date().toLocaleDateString();
    localStorage.setItem("compra", "total: " + total + " - Fecha" + fecha);
    alert("Su pedido fue realizado exitosamente. Gracias por elegirnos!\n\n" + "Total: " + total + "\nFecha: " + fecha);
    location.reload();
}
function cancelarCompra() { 
    location.reload();
}

/* const producto0 = new producto("Expresso", 300)
const producto1 = new producto("Latte", 500)
const producto2 = new producto("Cortado", 400)
const producto3 = new producto("Capuchino", 600)
const producto4 = new producto("Alfajor", 200) */

// Adding products to the carrito array
/* carrito.push(producto0, producto1, producto2, producto3, producto4);

// Displaying all products in the carrito array
console.log(carrito); */



