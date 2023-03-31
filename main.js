let carrito = []
let total = 0

modoOscuro.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  if(document.body.classList.contains("dark")){
    localStorage.setItem("modo", "dark")
  } else{
    localStorage.setItem("modo", "light");
  }
})


function agregarProducto(nombre, precio) {
  let producto = {
      nombre: nombre, 
      precio: precio
  };
  
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  carrito.push(producto);
  console.log(carrito);

  let listaCarrito = document.getElementById("listaCarrito");
  let elemento = document.createElement("li");
  elemento.innerText = `${nombre} - $${precio}`;
  listaCarrito.appendChild(elemento);

  let total = parseFloat(localStorage.getItem('total')) || 0;
  total += precio;
  
  localStorage.setItem('carrito', JSON.stringify(carrito));
  localStorage.setItem('total', total.toFixed(2));
  
  let totalCarrito = document.getElementById("totalCarrito");
  totalCarrito.innerText = "Total: $" + total.toFixed(2);
}





function finalizarCompra() {
    let total = document.getElementById("totalCarrito").innerText;
    let fecha = new Date().toLocaleDateString();
    let codeLength = 5;
    let codigo = Math.random().toString(36).substr(2, codeLength);
    let compras = JSON.parse(localStorage.getItem("compras")) || [];
      compras.push({ total: total, fecha: fecha, codigo: codigo });
      localStorage.setItem("compras", JSON.stringify(compras));
    console.log(codigo); 
    localStorage.setItem("compra", "total: " + total + " - Fecha" + fecha + " - Código: " + codigo);
    //alert("Su pedido fue realizado exitosamente. Gracias por elegirnos!\n\n" + "Total: " + total + "\nFecha: " + fecha);
    swal.fire({
      title: 'Su pedido fue realizado exitosamente',
      text: "Podes retirar tu orden en nuestra sucursal mas cercana con el codigo " + codigo + ', Gracias por elegirnos!' ,
      color: '#cd853f',
      icon: 'success',
      confirmButtonColor: '#cd853f',
      confirmButtonText: 'Ok',
      
        
    }).then((result) => { 
      if (result.isConfirmed) {
        location.reload();
      }
    })
    
  
}
function historialCompras() {
  let compras = JSON.parse(localStorage.getItem("compras")) || [];

  if (compras.length === 0) {
      swal.fire({
        title: 'No hay compras realizadas',
        text: ' ',
        color: '#cd853f',
        icon: 'warning',
        confirmButtonColor: '#cd853f',
        confirmButtonText: 'Ok'
      });
      return;
  }

  let comprasTexto = compras
      .map((compra, index) => {
          return `Compra ${index + 1}:\nTotal: ${compra.total}\nFecha: ${compra.fecha} Código: ${compra.codigo}`;
      })
      .join("\n\n");

      swal.fire({
        title: 'Historial de Compras',
        html: comprasTexto,
        color: '#cd853f',
        icon: 'info',
        confirmButtonColor: '#cd853f',
        confirmButtonText: 'Ok',
        showCancelButton: true,
        cancelButtonText: 'Eliminar Historial',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          
          localStorage.clear();
          
          Swal.fire({
            title: 'Historial Eliminado',
            text: 'El historial de compras ha sido eliminado',
            color: '#cd853f',
            icon: 'success',
            confirmButtonColor: '#cd853f',
            confirmButtonText: 'Ok'
          });
        }
      });
      
}


let vaciar = document.getElementById("vaciar");
vaciar.addEventListener("click", vaciarResp);

function vaciarResp() {
  console.log("Vaciar carrito");
  while (listaCarrito.firstChild) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }

  total = 0;
  totalCarrito.textContent = "Total: $" + total.toFixed(2);

  localStorage.removeItem("carrito");
  localStorage.removeItem("total");

  listaCarrito.innerHTML = "";
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



