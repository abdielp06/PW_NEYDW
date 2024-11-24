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
            <img src="${product.imagen}" alt="${product.nombre}">
            <h3>${product.nombre}</h3>
            <p>Precio: $${product.precio}</p>
            <button onclick="addToCart('${product.nombre}', ${product.precio}, '${product.imagen}')">Agregar al Carrito</button>
        `;
        productListElement.appendChild(productItem);
    });
}

// Función para agregar al carrito
function addToCart(productName, productPrice, productImage) {
    const product = { name: productName, price: productPrice, image: productImage };
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
        // Filtrar los productos según la categoría seleccionada
        const filteredProducts = products.filter(product => product.categoria === category);
        displayProducts(filteredProducts);
    });
});

// Obtener productos desde el servidor y mostrar en la página
let products = [];  // Aquí almacenamos todos los productos

document.addEventListener('DOMContentLoaded', () => {
    fetch('get_products.php')
        .then(response => response.json())
        .then(data => {
            products = data;  // Guardamos todos los productos recibidos del servidor

            // Muestra todos los productos inicialmente
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});
