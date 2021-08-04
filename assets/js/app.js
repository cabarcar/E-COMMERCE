/*var productos = {
    1 : {
        "nombre" : "DJI Mavic Pro",
        "modelo" : 2020,
        "descripción" : "Dron ligero y chico",
        "precio" : {
            "precioNormal" : 12000,
            "precioRebaja" : 10000
        }
    },
    2: {
        "nombre" : "DJI Mavic Pro",
        "modelo" : 2020,
        "descripción" : "Dron ligero y chico",
        "precio" : {
            "precioNormal" : 12000,
            "precioRebaja" : 10000
        }
    }
}

function mostrarProductos(){
    console.log(productos);
*/

// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'FENDER TELECASTER',
        precio: 11900,
        imagen: 'assets/img/FENDER TELECASTER LH.jpg'
    },
    {
        id: 2,
        nombre: 'EPIPHONE SG STANDARD',
        precio: 11900,
        imagen: 'assets/img/EpiphoneSG.jpg'
    },
    {
        id: 3,
        nombre: 'FENDER VINTERA 60S JAGUAR',
        precio: 20990,
        imagen: 'assets/img/Guitarra Eléctrica Fender.jpg'
    },
    {
        id: 4,
        nombre: 'GIBSON LES PAUL TRIBUTE',
        precio: 32000,
        imagen: 'assets/img/IcedTea.jpg'
    },
    {
        id: 5,
        nombre: 'FENDER JAZZ BASS',
        precio: 9750,
        imagen: 'assets/img/JazzBassB.jpg'
    },
    {
        id: 6,
        nombre: 'ESP LTD RB-1004 BURLED',
        precio: 16000,
        imagen: 'assets/img/LTD.jpg'
    },
    {
        id: 7,
        nombre: 'YAMAHA TRBX174EW ',
        precio: 8249,
        imagen: 'assets/img/YAMA.jpg'
    },
    {
        id: 8,
        nombre: 'EPIPHONE VIOLA BASS VINTAGE',
        precio: 11000,
        imagen: 'assets/img/EPI.jpg'
    },
    {
        id: 9,
        nombre: 'PEARL ROADSHOW 5 PZS',
        precio: 12650,
        imagen: 'assets/img/PEAR.jpg'
    }

];

const $items = document.querySelector('#items');
let carrito = [];
let total = 0;
const $carrito = document.querySelector('#carrito');
const $total = document.querySelector('#total');
const $botonVaciar = document.querySelector('#boton-vaciar');

// Funciones
function renderItems() {
    for (let info of baseDeDatos) {
        // Estructura
        let miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        let miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        let miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info['nombre'];
        // Imagen
        let miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src',  info['imagen']);
        // Precio
        let miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = '$' + info['precio'];
        // Boton 
        let miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-warning');
        miNodoBoton.textContent = 'Añadir';
        miNodoBoton.setAttribute('marcador', info['id']);
        miNodoBoton.addEventListener('click', anyadirCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        $items.appendChild(miNodo);
    }
}

function anyadirCarrito() {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(this.getAttribute('marcador'))
    // Calculo el total
    calcularTotal();
    // Renderizamos el carrito 
    renderizarCarrito();

}

function renderizarCarrito() {
    // Vaciamos todo el html
    $carrito.textContent = '';
    // Quitamos los duplicados
    let carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach(function (item, indice) {
        // Obtenemos el item que necesitamos de la variable base de datos
        let miItem = baseDeDatos.filter(function(itemBaseDatos) {
            return itemBaseDatos['id'] == item;
        });
        // Cuenta el número de veces que se repite el producto
        let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        let miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}$`;
        // Boton de borrar
        let miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.setAttribute('item', item);
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        $carrito.appendChild(miNodo);
    });
}

function borrarItemCarrito() {
    // Obtenemos el producto ID que hay en el boton pulsado
    let id = this.getAttribute('item');
    // Borramos todos los productos
    carrito = carrito.filter(function (carritoId) {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    // Calculamos de nuevo el precio
    calcularTotal();
}

function calcularTotal() {
    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    for (let item of carrito) {
        // De cada elemento obtenemos su precio
        let miItem = baseDeDatos.filter(function(itemBaseDatos) {
            return itemBaseDatos['id'] == item;
        });
        total = total + miItem[0]['precio'];
    }
    // Renderizamos el precio en el HTML
    $total.textContent = total.toFixed(2);
}

function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
    calcularTotal();
}

// Eventos
$botonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderItems();

