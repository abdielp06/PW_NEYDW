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
    { name: "Smartphone", category: "accesorios-electronica", price: 200.0, image: "images/smartphone.jpg" },
    { name: "Tablet", category: "accesorios-electronica", price: 150.0, image: "images/tablet.jpg" },
    { name: "Cámara", category: "accesorios-electronica", price: 250.0, image: "images/camara.jpg" },
    { name: "Batería Externa", category: "accesorios-electronica", price: 25.0, image: "images/bateria.jpg" },
    { name: "Parlantes", category: "accesorios-electronica", price: 30.0, image: "images/parlantes.jpg" },
    { name: "Cable HDMI", category: "accesorios-electronica", price: 8.0, image: "images/hdmi.jpg" },

    // Ropa
    { name: "Camiseta", category: "ropa", price: 10.0, image: "images/camiseta.jpg" },
    { name: "Pantalones", category: "ropa", price: 20.0, image: "images/pantalones.jpg" },
    { name: "Zapatos", category: "ropa", price: 35.0, image: "images/zapatos.jpg" },
    { name: "Chaqueta", category: "ropa", price: 40.0, image: "images/chaqueta.jpg" },
    { name: "Gorra", category: "ropa", price: 12.0, image: "images/gorra.jpg" },
    { name: "Calcetines", category: "ropa", price: 5.0, image: "images/calcetines.jpg" },
    { name: "Bufanda", category: "ropa", price: 15.0, image: "images/bufanda.jpg" },
    { name: "Vestido", category: "ropa", price: 30.0, image: "images/vestido.jpg" },
    { name: "Cinturón", category: "ropa", price: 8.0, image: "images/cinturon.jpg" },
    { name: "Traje", category: "ropa", price: 100.0, image: "images/traje.jpg" },

    // Papelería
    { name: "Cuaderno", category: "papeleria", price: 3.0, image: "images/cuaderno.jpg" },
    { name: "Lápices", category: "papeleria", price: 1.0, image: "images/lapices.jpg" },
    { name: "Bolígrafos", category: "papeleria", price: 1.5, image: "images/boligrafos.jpg" },
    { name: "Borrador", category: "papeleria", price: 0.5, image: "images/borrador.jpg" },
    { name: "Regla", category: "papeleria", price: 1.2, image: "images/regla.jpg" },
    { name: "Carpeta", category: "papeleria", price: 2.0, image: "images/carpeta.jpg" },
    { name: "Tijeras", category: "papeleria", price: 2.5, image: "images/tijeras.jpg" },
    { name: "Pegamento", category: "papeleria", price: 1.0, image: "images/pegamento.jpg" },
    { name: "Marcadores", category: "papeleria", price: 3.0, image: "images/marcadores.jpg" },
    { name: "Resaltadores", category: "papeleria", price: 2.5, image: "images/resaltadores.jpg" },
];

// Inicializar el carrito
let cart = [];

// Al cargar la página, obtener el carrito del localStorage
document.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').innerText = cart.length;
    displayProducts(products);
});

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
    alert(`${productName} ha sido agregado al carrito.`);
    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para mostrar los productos en el modal del carrito
function showCartModal() {
    const modalContent = document.querySelector('#cart-modal .modal-content');
    let cartItemsHTML = '<h2>Carrito de Compras</h2>';

    if (cart.length === 0) {
        cartItemsHTML += '<p>El carrito está vacío.</p>';
    } else {
        cartItemsHTML += '<ul>';
        cart.forEach(item => {
            cartItemsHTML += `<li>${item.name} - $${item.price}</li>`;
        });
        cartItemsHTML += '</ul>';
    }
    
    cartItemsHTML += '<button id="go-to-cart">Ir a Carrito</button>';
    modalContent.innerHTML = cartItemsHTML;

    document.getElementById('go-to-cart').addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'block';
}

// Manejo del modal del carrito
const cartBtn = document.getElementById('cart-btn');
cartBtn.addEventListener('click', showCartModal);

// Manejo del cierre del modal del carrito
const closeCartModal = document.getElementById('close-cart-modal');
closeCartModal.addEventListener('click', () => {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
});

// Resto del código de inicio de sesión y registro de productos sigue igual...

// Filtrar productos por categoría
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    });
});

// Función para agregar al carrito
function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    cart.push(product);
    document.getElementById('cart-count').innerText = cart.length;
    alert(`${productName} ha sido agregado al carrito.`);
    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Manejo del modal de inicio de sesión
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeLoginModal = document.getElementById('close-login-modal');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeLoginModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});



cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeCartModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Ir a la página del carrito
const goToCartBtn = document.getElementById('go-to-cart');
goToCartBtn.addEventListener('click', () => {
    window.location.href = 'cart.html';
});

// Manejo del modal de registro de producto
const addProductBtn = document.getElementById('add-product-btn');
const productModal = document.getElementById('product-modal');
const closeProductModal = document.getElementById('close-product-modal');

addProductBtn.addEventListener('click', () => {
    productModal.style.display = 'block';
});

closeProductModal.addEventListener('click', () => {
    productModal.style.display = 'none';
});

// Función para registrar un nuevo producto
const submitProduct = document.getElementById('submit-product');
submitProduct.addEventListener('click', () => {
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = document.getElementById('product-price').value;
    const imageInput = document.getElementById('product-image');

    // Manejar la carga de la imagen
    if (imageInput.files && imageInput.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            // Agregar el nuevo producto al array de productos
            products.push({
                name: name,
                category: category,
                price: parseFloat(price),
                image: e.target.result // La imagen en formato base64
            });
            displayProducts(products);
            productModal.style.display = 'none';
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        // Si no se selecciona una imagen, usar una imagen por defecto
        products.push({
            name: name,
            category: category,
            price: parseFloat(price),
            image: 'images/default.jpg' // Imagen por defecto
        });
        displayProducts(products);
        productModal.style.display = 'none';
    }
});
