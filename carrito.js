class Producto {

    constructor(imagen, nombreProducto, precio) {
        this.imagen = imagen;
        this.nombreProducto = nombreProducto;
        this.precio = precio;
    }

}

//clase tienda
class Tienda {

    constructor() {
        this.productos = [];
    }

    crearProductos() {
        this.productos.push(new Producto("pan.png", "Pan", 2.05));
        this.productos.push(new Producto("leche.png", "Leche", 0.95));
        this.productos.push(new Producto("chocolate.png", "Chocolate", 1.15));
        this.productos.push(new Producto("platano.png", "Platano", 1.30));
        this.productos.push(new Producto("salmon.png", "Salmon", 11.20));
        this.productos.push(new Producto("huevos.png", "Huevos", 1.75));
        this.productos.push(new Producto("salchichas.png", "Salchichas", 2.30));
        this.productos.push(new Producto("refresco.png", "Refresco", 1.45));
        this.productos.push(new Producto("queso.png", "Queso", 5.85));
        this.productos.push(new Producto("cereales.png", "Cereales", 1.85));
    }

    mostrarProductos() {
        const lista = document.getElementById("productList"); // Obtiene el elemento del DOM donde se mostrará la lista.
        lista.innerHTML = ""; // Limpia la lista actual antes de mostrar la nueva.
        var counter = 0;
        //recorre cada producto
        this.productos.forEach(prod => {
            const item = document.createElement("div"); // Crea un nuevo div
            item.className = "item";
            item.id = "item" + counter;
            // Estructura de cada div de producto
            item.innerHTML = `<h3><img src="img/${prod.imagen}"></img> 
            <br> ${prod.nombreProducto}</h3><p><b> · Precio:</b>  ${prod.precio} €</p>
            <button type="button" class="carrito" onclick="addItem(${counter})">
            <img src="img/carrito.png" alt="Carrito de la compra" style="width: 30px; height: 30px;">
            </button>`;

            lista.appendChild(item); // Añade el div a la lista en el DOM.
            counter++;
        });

    }

}


//instancio la tienda
const miTienda = new Tienda();

//creo y muestro la lista de productos
miTienda.crearProductos();
miTienda.mostrarProductos();

// Función para iniciar sesión
function login() {
    // Obtiene el valor del input donde el usuario escribe su nombre
    var username = document.getElementById('username').value;
    // Verifica si el nombre de usuario está presente, si es distinto de null
    if (username) {
        // Almacena el nombre de usuario en sessionStorage
        sessionStorage.setItem('username', username);
        // Inicializa una lista de compras vacía y la guarda en sessionStorage
        sessionStorage.setItem('shoppingList', JSON.stringify([]));
        // Actualiza el texto en pantalla para mostrar el nombre de usuario que ha iniciado sesión
        document.getElementById('sessionStatus').innerHTML = `<p>Sesión iniciada como:<font> ${username}</font></p>`;
        // Alerta al usuario que la sesión ha sido iniciada
        alert('Sesión iniciada para ' + username);
    } else {
        // Alerta al usuario para que ingrese un nombre si el campo estaba vacío
        alert('Por favor, ingresa un nombre');
    }
}


// Función para añadir un artículo a la lista de compras
function addItem(counter) {
    // Verifica si hay un nombre de usuario almacenado en sessionStorage
    var username = sessionStorage.getItem('username');
    // Si no hay sesión iniciada, alerta al usuario y detiene la función
    if (!username) {
        alert('Debes iniciar sesión para añadir artículos.');
        return;
    }

    // Obtiene el valor del articulo seleccionado por el usuario desde el array
    var item = miTienda.productos[counter];
    console.log(item);

    // Verifica si el artículo está presente
    if (item) {
        // Obtiene la lista actual de compras de sessionStorage, o inicializa una nueva lista si no existe
        var shoppingList = JSON.parse(sessionStorage.getItem('shoppingList')) || [];
        // Añade el nuevo artículo a la lista
        shoppingList.push(item);
        // Guarda la lista actualizada en sessionStorage
        sessionStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        // Alerta al usuario que el artículo ha sido añadido
        alert(item.nombreProducto + ' añadido a tu lista de compras.');
    } else {
        // Alerta al usuario para que ingrese un artículo si el campo estaba vacío
        alert('Por favor, ingresa un artículo para añadir a la lista');
    }
}

// Función para mostrar los artículos en la lista de compras
function showItems() {
    // Obtiene la lista de compras de sessionStorage
    var shoppingList = JSON.parse(sessionStorage.getItem('shoppingList'));
    // Verifica si hay artículos en la lista, es decir la lista existe y no está vacía
    if (shoppingList && shoppingList.length > 0) {

        const lista = document.getElementById("result"); // Obtiene el elemento del DOM donde se mostrará la lista.
        lista.innerHTML = "";
        lista.className = "notebook";   // Añade la clase notebook al div para dar el estilo deseado
        // Pongo el titulo
        const titulo = document.createElement("h2"); //crea un nuevo elemento de encabezado para el título.
        titulo.innerText = 'Tu carrito de la compra';
        lista.appendChild(titulo);

        // Añade el titulo de los campos
        const campos = document.createElement("tr"); //crea un nuevo elemento de encabezado para el título.
        campos.innerHTML = `<th>Imagen</th>
        <th>Producto</th>
        <th>Precio</th>
        <th>Eliminar</th>`;
        lista.appendChild(campos);

        var counter = 0;
        // Recorre el array del usuario y muestra los elementos guardados
        shoppingList.forEach(prod => {
            const item = document.createElement("tr"); // Crea un nuevo div

            // Muestra los artículos en la página
            item.innerHTML = `
                    <td><img src="img/${prod.imagen}"></img></tr>
                    <td>${prod.nombreProducto}</td>
                    <td>${prod.precio} €</td>
                    <td><button type="button" class="delete" onclick="deleteItem(${counter})">
                    <img src="img/papelera.png" alt="Carrito de la compra" style="width: 20px; height: 20px;">
                    </button></td>`;

            lista.appendChild(item); // Añade el div a la lista en el DOM.
            counter++;
        });

    } else {
        // Indica que la lista está vacía si no hay artículos
        document.getElementById('result').style.backgroundColor = 'rgba(245, 245, 137, 0.5)';
        document.getElementById('result').innerText = 'Tu lista de compras está vacía.';
    }
}

// Eliminar un artículo de la lista de compras
function deleteItem(counter) {
    // Obtiene la lista actual de compras de sessionStorage
    var shoppingList = JSON.parse(sessionStorage.getItem('shoppingList'));
    // Elimina el artículo en la posición especificada
    shoppingList.splice(counter, 1);
    // Guarda la lista actualizada en sessionStorage
    sessionStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    // Vuelve a mostrar los artículos en la lista de compras actualizada
    showItems();
    // Alerta al usuario que el artículo ha sido eliminado
    alert('Artículo eliminado de la lista de compras.');
}

// Función para cerrar sesión
function logout() {
    // Elimina el nombre de usuario de sessionStorage
    sessionStorage.removeItem('username');
    // Elimina la lista de compras de sessionStorage
    sessionStorage.removeItem('shoppingList');
    // Actualiza el texto en pantalla para indicar que no hay sesión iniciada
    document.getElementById('sessionStatus').innerText = 'No hay ninguna sesión iniciada.';
    // Limpia la visualización de la lista de compras y la clase para eliminar el estilo
    document.getElementById('result').className = '';
    document.getElementById('result').innerHTML = '';
    // Limpia también el campo del nombre de usuario
    document.getElementById('username').value = '';
    // Alerta al usuario que la sesión ha sido cerrada
    alert('Sesión cerrada');
    // Limpia cualquier mensaje anterior sobre la lista de compras
    document.getElementById('result').innerText = '';
}

