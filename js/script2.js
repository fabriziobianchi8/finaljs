const contenedorCarrito = document.getElementById('ContenedorCarrito');
const contenedorResumen = document.getElementById('ResumenCompra');
const precioTotal = document.getElementById('PrecioTotal')
const botonFinalizar = document.getElementById('btnFinalizar')

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        ActualizarCarrito()
    }
})

botonFinalizar.addEventListener('click', () => {
    Swal.fire({
        icon: 'success',
        title: 'Compra finalizada',
        text: 'Gracias por elegirnos!!!',
        confirmButtonColor: '#232f3e',
        confirmButtonText: 'Volver',      
      })
    carrito.length = 0
    ActualizarCarrito()
})

const eliminarDelCarrito = (prodId) => {
    const prodCarrito = carrito.find((prod)=> prod.id === prodId)
    const indice = carrito.indexOf(prodCarrito)
    carrito.splice(indice, 1)
    ActualizarCarrito()
    Toastify({
        text: "Producto eliminado correctamente",
        gravity: "bottom",
        backgroundColor:"#232f3e",
        duration: 3000
        
    
      }).showToast();
    
}

const RestarProducto = (prodId) => {
    const prodCarrito = carrito.find((prod)=> prod.id === prodId)
    if(prodCarrito.cantidad > 1){
        prodCarrito.cantidad--
    }
    ActualizarCarrito()
}

const SumarProducto = (prodId) => {
    const prodCarrito = carrito.find((prod)=> prod.id === prodId)
    prodCarrito.cantidad++
    ActualizarCarrito()
}

const ActualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    contenedorResumen.innerHTML = ""
    
    carrito.forEach((prod) => {
        const div = document.createElement('div');
        div.className = ('productoEnCarrito')
        div.innerHTML = `  
        <div class="ImgProdCart">
        <img src=${prod.img} alt= "">
        </div>
        <div class="InfoProdCart">
        <h2>${prod.nombre}</h2>
        <p>Precio: $${prod.precio}</p>
        <p>Talle: ${prod.talle}</p>

        
        <div class="CantProd">
        <div class="ControlCantidad">
        <button onclick="RestarProducto(${prod.id})" id="restar${prod.id}" class="btnQty">-</button>
        <p id="cantProd">${prod.cantidad}</p>
        <button onclick="SumarProducto(${prod.id})" id="sumar${prod.id}" class="btnQty">+</button>
        </div>
        <button onclick="eliminarDelCarrito(${prod.id})" class="BtnEliminar"><img src="Assets/trash.png" alt=""></button>
        </div>
        `
        contenedorCarrito.appendChild(div)

        const div2 = document.createElement('div');
        div2.className = ('Resumen')
        div2.innerHTML = `  
        <p>${prod.nombre} $${prod.precio} (x${prod.cantidad})</p>
        `
        contenedorResumen.appendChild(div2)

        precioTotal.innerText = carrito.reduce((acc, prod) => acc + (prod.cantidad * prod.precio), 0)



    })
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

