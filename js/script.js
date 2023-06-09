const contenedorProductos = document.getElementById('ContenedorProductos');

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        ActualizarCarrito()
    }
})

// fetch('/data.json')
//    .then( (res) => res.json())
//   .then( (data) => {
//
//        data.forEach((producto)=>{
//            const div = document.createElement('div');
//            div.classList.add('producto');
//            div.innerHTML = `
//            <img src= alt= "">
//            <button id="agregar" class="btnCardProd">Agregar al carrito</button>
//            `
//        
//            contenedorProductos.appendChild(div);
//        
//           const boton = document.getElementById(`agregar`)
//        
//            boton.addEventListener('click', () => {
//                AgregarAlCarrito(producto.id)
//            })
//        
//        })
//    })

stockProductos.forEach((producto)=>{
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
        <img src=${producto.img} alt= "">
        <button id="agregar${producto.id}" class="btnCardProd">Agregar al carrito</button>
         `
            
        contenedorProductos.appendChild(div);
            
        const boton = document.getElementById(`agregar${producto.id}`)
           
        boton.addEventListener('click', () => {
            AgregarAlCarrito(producto.id)
            Toastify({
                text: "Producto Agregado correctamente",
                gravity: "bottom",
                backgroundColor:"#232f3e",
                duration: 3000         
              }).showToast();
         })
            
    })



const AgregarAlCarrito = (prodId) => {
    const Existe = carrito.some (prod => prod.id === prodId)

    if (Existe){
        const producto = carrito.map (prod =>{
            if(prod.id === prodId){
                prod.cantidad++
            }
        })
    }else{
        const prodCarrito = stockProductos.find((prod)=> prod.id === prodId)
        carrito.push(prodCarrito)
    }
    ActualizarCarrito()
}


const ActualizarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}