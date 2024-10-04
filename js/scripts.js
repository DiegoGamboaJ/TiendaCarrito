// Carrito de compras
let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

class Producto {
    constructor(id, name, category, price, description, image) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
        this.image = image;
    }

    // Método para renderizar el producto en HTML
    renderProducto() {
        return `
        <div class="card shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
            <img src="${this.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
                <p class="card-text">Precio: $${this.price}</p>
                <a class="btn btn-primary" href="./products/${this.id}.html">Ver mas..</a>
            </div>
        </div>
        `;
    }

    // Método para renderizar el producto en HTML
    renderDetalleProducto() {
        return `
        <div class="card shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
            <img src="../${this.image}" class="card-img-top" alt="${this.name}">
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">Categoría: ${this.category}</p>
                <p class="card-text">Precio: $${this.price}</p>
                <p class="card-text">Descripcion: $${this.description}</p>
                <button class="btn btn-primary add-to-cart" data-id="${this.id}">Agregar al carrito</button>
            </div>
        </div>
        `;
    }
}

let productos = [
    new Producto(1, "All In One Lenovo", "Tecnologia", 259990, "AIO Lenovo I9 12º generacion, 12 gb Ram, Windows 11", "assets/CSBYTE-imagenes-productos-5.png"),
    new Producto(2, "Lavadora LG", "Electrodomestico", 249990, "Lavadora LG 13 kilos con sensor de peso y centrifugado", "assets/img/portfolio/py.png"),
    new Producto(3, "Microhondas Samsung", "Electrodomestico", 45990, "Microhondas Samsung de alta potencia", "assets/img/portfolio/ia.png"),
    new Producto(4, "Iphone 15", "Celular", 878990, "Apple Iphone 15 con sistema operativo IOS 18, 5G", "assets/img/portfolio/mf.png"),
    new Producto(5, "Notebook Asus", "Tecnologia", 239990, "Notebook asus I5 de 10º generacion, 8 gb de RAM, Sistema operativo Windows 10", "assets/img/portfolio/fl.png"),
    new Producto(6, "Cafetera Nescafe", "Electrodomestico", 31990, "Cafetera dolce gusto, Nescafe", "assets/img/portfolio/ko.png"),
];
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    let content = document.getElementById("content");

    function mostrarProductos(productos) {
        content.innerHTML = ""; // Limpiar el contenedor
        productos.forEach(producto => {
            content.innerHTML += producto.renderProducto();
        });
    }

    mostrarProductos(productos);
}



// Obtener el ID desde la URL
const path = window.location.pathname;
const fileName = path.split('/').pop(); // Obtener el último segmento '1.html'
const id = fileName.replace('.html', ''); // Remover la extensión '.html'

// Buscar el producto por ID
const selectedItem = productos.find(producto => producto.id == id);

// Mostrar el detalle del producto
const productDetail = document.getElementById('product-detail');
if (selectedItem) {
    productDetail.innerHTML = selectedItem.renderDetalleProducto();
} else {
    productDetail.innerHTML = '<p>Producto no encontrado.</p>';
}
// Añadir evento a los botones "Agregar al carrito"
const buttons = document.querySelectorAll(".add-to-cart");
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-id");
        agregarAlCarrito(productId);
    });
});





function agregarAlCarrito(id) {
    const producto = productos.find(producto => producto.id == id);
    const productoEnCarrito = carrito.find(item => item.producto.id == id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarCarritoIcon();
}

function eliminarDelCarrito(id) {
    const productoEnCarrito = carrito.find(item => item.id == id);

    if (productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad -= 1;
    } else {
        carrito = carrito.filter(producto => producto.id != id);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarritoIcon() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        let totalProductos = 0;
        carrito.forEach(item => {
            totalProductos += item.cantidad;
        });
        cartCount.textContent = totalProductos;
    }
}
window.onload = function () {
    actualizarCarritoIcon();
};

console.log(JSON.parse(localStorage.getItem("carrito")));

if (window.location.pathname.endsWith('carrito.html') || window.location.pathname === '/') {
    let container = document.getElementById("product-detail");

    function mostrarCarrito(carrito) {
        container.innerHTML = "";
        if (carrito.length === 0) {
            // Si el carrito está vacío, mostramos un mensaje
            container.innerHTML = `<h4>El carrito está vacío.</h4>`;
        } else {
            let totalpay = 0; // Inicializa el total
            carrito.forEach((item, index) => {
                const itemTotal = item.producto.price * item.cantidad; // Calcula el total del item
                totalpay += itemTotal; // Suma al total general
                container.innerHTML += `
        <div class="card shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
            <img src="./${item.producto.image}" class="card-img-top" alt="${item.producto.name}">
            <div class="card-body">
                <h5 class="card-title">${item.producto.name}</h5>
                <p class="card-text">Cantidad: ${item.cantidad}</p>
                <p class="card-text">Categoría: ${item.producto.category}</p>
                <p class="card-text">Precio: $${item.producto.price}</p>
                <p class="card-text">Descripcion: ${item.producto.description}</p>
                <button class="btn btn-primary" onclick="agregarCantidad(${index})">+</button>
                <button class="btn btn-primary" onclick="eliminarCantidad(${index})">-</button>
            </div>
        </div>
        `;
            });
            // Agrega el total general al final
            container.innerHTML += `
         <div class="totalPay">
            <h4>Total a Pagar: $${totalpay.toLocaleString()}</h4>
            <form id="orderForm">
                 <div class="form-group">
                    <label for="inputName">Nombres</label>
                    <input type="text" class="form-control" id="inputName" placeholder="Pedro Jesus" required>
                 </div>
                 <div class="form-group">
                    <label for="inputLast">Apellidos</label>
                    <input type="text" class="form-control" id="inputLast" placeholder="Arellano Vargas" required>
                 </div>
                 <div class="form-group">
                    <label for="inputDireccion">Direccion</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="Direccion, Ciudad, Pais" required>
                 </div>
                 <div class="form-group">
                    <label for="inputEmail">Correo</label>
                    <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Ingrese correo" required>
                 </div>
                 <div class="form-group">
                    <label for="inputPay">Metodo de pago</label>
                    <select class="custom-select custom-select-sm form-select" name="payOption" required>
                        <option value="" disabled selected>Seleccione una opción</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="webpay">WebPay</option>
                        <option value="transferencia">Transferencia</option>
                    </select>
                 </div>
                 <br>
                 <button id="submitBtn" class="btn btn-primary" href="../success.html">Realizar pedido</button>
            </form>
         </div>
     `;

        }
    }

    mostrarCarrito(carrito);

}
// Función para aumentar la cantidad de un producto en el carrito
function agregarCantidad(index) {
    carrito[index].cantidad++;  // Aumentar la cantidad del producto
    localStorage.setItem('carrito', JSON.stringify(carrito));  // Actualizar el carrito en localStorage
    mostrarCarrito(carrito);  // Actualizar la visualización del carrito
}

// Función para disminuir la cantidad de un producto en el carrito
function eliminarCantidad(index) {
    if (carrito[index].cantidad > 1) {  // Asegurarse de que la cantidad no sea menor a 1
        carrito[index].cantidad--;  // Reducir la cantidad del producto
        localStorage.setItem('carrito', JSON.stringify(carrito));  // Actualizar el carrito en localStorage
        mostrarCarrito(carrito);  // Actualizar la visualización del carrito
    }
}

// Añadir el evento de submit al formulario
document.getElementById('orderForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario hasta que se verifique

    // Verificar si el formulario es válido
    if (this.checkValidity()) {

        localStorage.removeItem("carrito");
        carrito = [];
        // Redirigir a success.html
        window.location.href = 'success.html';
    } else {
        // Si el formulario no es válido, se puede mostrar un mensaje o realizar otra acción
        this.reportValidity(); // Muestra los mensajes de error
    }
});