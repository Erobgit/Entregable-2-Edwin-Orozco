// Carrito
document.addEventListener('DOMContentLoaded', () => {
    
    
    // Base de datos simulada
    const baseDeDatos = [
        { id: 1, nombre: 'Bomba MARUYAMA MS655', precio: 1500000, imagen: './IMG/Maruyama.jpg' }, 
        { id: 2, nombre: 'Plantas electricas PERKINS', precio: 30000000, imagen: './IMG/Planta electrica grande.jpg' },
        { id: 3, nombre: 'Tableros electricos con transferencia automatica', precio: 5500000, imagen: './IMG/Tablero electrico por dentro.jpg' },
        { id: 4, nombre: 'Plantas agua CULLIGAN industrial', precio: 150000000, imagen: './IMG/Planta culligan.png' }
    ];

    // Variables del carrito
    let carrito = [];
    const divisa = ' cop';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    // Función para renderizar productos
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Crear la tarjeta
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4', 'mb-4');

            // Cuerpo de la tarjeta
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');

            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            miNodoImagen.setAttribute('alt', info.nombre);

            // Título
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title', 'mt-2');
            miNodoTitle.textContent = info.nombre;

            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;

            // Botón de añadir al carrito
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary', 'mt-2');
            miNodoBoton.textContent = 'Agregar';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);

            // Insertamos elementos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    // Función para añadir producto al carrito
    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'));
        renderizarCarrito();
    }

    // Función para renderizar el carrito
    function renderizarCarrito() {
        DOMcarrito.textContent = '';

        const carritoSinDuplicados = [...new Set(carrito)];

        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.find((producto) => producto.id === parseInt(item));

            const numeroUnidadesItem = carrito.reduce((total, itemId) => 
                itemId === item ? total += 1 : total, 0
            );

            // Crear el item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem.nombre} - ${miItem.precio}${divisa}`;

            // Botón para eliminar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'btn-sm');
            miBoton.textContent = 'Eliminar';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);

            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });

        // Actualizar el total
        DOMtotal.textContent = calcularTotal();
    }

    // Función para borrar un producto del carrito
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => carritoId !== id);
        renderizarCarrito();
    }

    // Función para calcular el total del carrito
    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.find((producto) => producto.id === parseInt(item));
            return total + miItem.precio;
        }, 0).toFixed(2);
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicializar
    renderizarProductos();
    renderizarCarrito();
});
// Referencia al botón
const botonEnviarPedido = document.getElementById('enviar-pedido');

botonEnviarPedido.addEventListener('click', () => {
    const contenidoPedido = generarContenidoPedido();
    document.getElementById('mensajePedido').value = contenidoPedido;
    document.getElementById('formularioPedido').submit();
});

function generarContenidoPedido() {
    return "Pedido generado automáticamente:\n- Producto 1 x2\n- Producto 2 x1\nTotal: $100.000";
}

