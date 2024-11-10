// Simulación de datos de productos
let products = [
    // Comida
    { name: "Manzana Cubierta de Tamarindo", category: "comida", price: 15, image: "images/manzana.png" },
    { name: "Pizza Costco", category: "comida", price: 25, image: "images/pizza_costco.jpg" },
    { name: "Pizza Little Caesars", category: "comida", price: 18, image: "images/little.png" },
    { name: "Tacos de Pastor", category: "comida", price: 10, image: "images/los-mejores-tacos-cdmx.jpg" },
    { name: "Tacos de Suadero", category: "comida", price: 10, image: "images/suadero.jpeg" },
    { name: "Torta de Cochinita Pibil", category: "comida", price: 35, image: "images/Cochinita-XL-394x218.png" },
    { name: "Galletas Costco", category: "comida", price: 10, image: "images/galleta costoc.avif" },
    { name: "Rebanada de Pastel Matilda", category: "comida", price: 25, image: "images/matilda.jpg" },
    { name: "Rebanada de Pastel de Zanahoria", category: "comida", price: 25, image: "images/pastelZanahoria.png" },
    { name: "Lazagna", category: "comida", price: 30, image: "images/lazagna.jpg" },

    // Accesorios y Electrónica
    { name: "Audifonos Inalambricos", category: "accesorios-electronica", price: 300, image: "images/audifonosI.webp" },
    { name: "Cargador Samsung", category: "accesorios-electronica", price: 500, image: "images/cargadorSam.webp" },
    { name: "Cargador Apple", category: "accesorios-electronica", price: 700, image: "images/cargadorapple.jpg" },
    { name: "Teclado Portatil", category: "accesorios-electronica", price: 250, image: "images/tecladoCelular.avif" },
    { name: "Fundas para iPhone 11, 12, 13, 14, 15, 16", category: "accesorios-electronica", price: 100.0, image: "images/fundas.jpeg" },
    { name: "Fundas para Samsung Galaxy S20, S21, S22, S23, S24", category: "accesorios-electronica", price: 100.0, image: "images/samsung.avif" },
    { name: "Cuenta Diseny+", cegory: "accesorios-electronica", price: 75.0, image: "images/disney.jpg" },
    { name: "Cuenta Spotify", category: "accesorios-electronica", price: 75.0, image: "images/spotify.jpeg" },
    { name: "Audifonos Alambricos", category: "accesorios-electronica", price: 150.0, image: "images/audifonos.webp" },
    { name: "Cuenta Amazon Prime Video", category: "accesorios-electronica", price: 80.0, image: "images/amazon.jpg" },

    // Ropa
    { name: "Chamarra FI UNAM Clasica Roja-Blanco", category: "ropa", price: 650.0, image: "images/ficlasica.jpg" },
    { name: "Chamarra FI UNAM 255 Años Negra-Gris Oxford", category: "ropa", price: 700.0, image: "images/255años.png" },
    { name: "Chamarra Rompe Vientos UNAM", category: "ropa", price: 700.0, image: "images/rompeVientosUNAM.jpg" },
    { name: "Chamarra Clasica FI UNAM", category: "ropa", price: 650.0, image: "images/chamarras-unam-ingenieria-azul-y-oro.webp" },
    { name: "Sudadera FI 1792", category: "ropa", price: 500.0, image: "images/3001000040765-1697764933-211.jpeg" },
    { name: "Playera FI 1792", category: "ropa", price: 350.0, image: "images/3001000040888-1697770607-920.jpeg" },
    { name: "Bufanda FI UNAM", category: "ropa", price: 200.0, image: "images/3001000045043-1709583571-461.jpg" },
    { name: "Sueter FI UNAM", category: "ropa", price: 650.0, image: "images/D_NQ_NP_923241-MLM41407117218_042020-O.webp" },
    { name: "Chamarra FI UNAM Roja-Negra", category: "ropa", price: 700.0, image: "images/chamarras-unam-facultad-de-ingenieria-fi-filomania.webp" },
    { name: "Chamarra UNAM Rosa-Gris", category: "ropa", price: 650.0, image: "images/3001000027476-1684457508-679.jpg" },

    // Papelería
    { name: "Cuaderno", category: "papeleria", price: 150.0, image: "images/619p43NXc1L._AC_UF894,1000_QL80_.jpg" },
    { name: "Lápices", category: "papeleria", price: 5.0, image: "images/61826.jpeg" },
    { name: "Bolígrafos de Colores", category: "papeleria", price: 1.5, image: "images/37661620-800-auto.webp" },
    { name: "Borrador", category: "papeleria", price: 10.0, image: "images/PE0114_01.jpg" },
    { name: "Juego de Geometría", category: "papeleria", price: 50.0, image: "images/81CIc+O0ecL.jpg" },
    { name: "Carpeta", category: "papeleria", price: 2.0, image: "images/71wJDEi7jjL.jpg" },
    { name: "Tijeras", category: "papeleria", price: 35.0, image: "images/3-a_800x.webp" },
    { name: "Pegamento", category: "papeleria", price: 25.0, image: "images/7259.jpeg" },
    { name: "Marcadores", category: "papeleria", price: 300.0, image: "images/01a6b875-6fa4-3f1d-9e1d-ba4b1279d29f.jpg" },
    { name: "Resaltadores", category: "papeleria", price: 350.0, image: "images/D_NQ_NP_752327-MLM71231905330_082023-O.webp" },
];
// Inicializar el carrito y actualizar el contador
let cart = JSON.parse(localStorage.getItem('cart')) || [];
document.getElementById('cart-count').innerText = cart.length;

// Función para mostrar productos en la página principal
function displayProducts(productList) {
    const productListElement = document.getElementById('product-list');
    productListElement.innerHTML = '';
    productList.forEach(product => {
        let productItem = document.createElement('div');
        productItem.className = 'product-item';

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart('${product.name}')">Agregar al Carrito</button>
        `;
        productListElement.appendChild(productItem);
    });
}

// Función para agregar al carrito
function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    cart.push(product);
    document.getElementById('cart-count').innerText = cart.length;

    const productItem = document.querySelector(`img[alt="${product.name}"]`);
    productItem.classList.add('shrink-animation');

    productItem.addEventListener('animationend', () => {
        productItem.classList.remove('shrink-animation');
    }, { once: true });

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para mostrar el contenido del carrito en el modal
function showCartModal() {
    const modalContent = document.querySelector('#cart-modal .modal-content');
    modalContent.innerHTML = '<h2>Carrito de Compras</h2>';

    if (cart.length === 0) {
        modalContent.innerHTML += '<p>El carrito está vacío.</p>';
    } else {
        const cartItemsList = document.createElement('ul');
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${item.name} - $${item.price}
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartItemsList.appendChild(cartItem);
        });

        modalContent.appendChild(cartItemsList);
    }

    const goToCartButton = document.createElement('button');
    goToCartButton.innerText = 'Ir a Carrito';
    goToCartButton.onclick = () => {
        window.location.href = 'cart.html';
    };

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.onclick = () => {
        document.getElementById('cart-modal').style.display = 'none';
    };

    modalContent.appendChild(goToCartButton);
    modalContent.appendChild(closeButton);
    document.getElementById('cart-modal').style.display = 'block';
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
    showCartModal();
}

// Event listener para abrir el modal del carrito
const cartBtn = document.getElementById('cart-btn');
cartBtn.addEventListener('click', showCartModal);

// Función para cerrar el modal del carrito
const closeCartModal = document.getElementById('close-cart-modal');
closeCartModal.addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

// Función para filtrar productos por categoría
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    });
});

// Mostrar todos los productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
});

// Función para mostrar el modal de inicio de sesión
function showLoginModal() {
    const modalContent = document.querySelector('#login-modal .modal-content');
    modalContent.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <input type="text" id="username" placeholder="Usuario">
        <input type="password" id="password" placeholder="Contraseña">
    `;

    const loginButton = document.createElement('button');
    loginButton.innerText = 'Iniciar Sesión';
    loginButton.onclick = () => {
        alert("Iniciando sesión...");
    };

    const registerButton = document.createElement('button');
    registerButton.innerText = 'Registrarse';
    registerButton.onclick = () => {
        window.location.href = 'register.html';
    };

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.onclick = () => {
        document.getElementById('login-modal').style.display = 'none';
    };

    modalContent.appendChild(loginButton);
    modalContent.appendChild(registerButton);
    modalContent.appendChild(closeButton);

    document.getElementById('login-modal').style.display = 'block';
}

// Event listener para abrir el modal de inicio de sesión
const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', showLoginModal);