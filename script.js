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
    loginButton.addEventListener('click', () => {
        const usuario = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `usuario=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('user_id', data.user_id);
                    alert('Inicio de sesión exitoso.');
                    synchronizeCart(data.user_id);
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error en el inicio de sesión:', error));
    });
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

const addProductBtn = document.getElementById('add-product-btn');
const productModal = document.getElementById('product-modal');
const closeProductModal = document.getElementById('close-product-modal');
const cancelProduct = document.getElementById('cancel-product');

addProductBtn.addEventListener('click', () => {
    productModal.style.display = 'block';
});

closeProductModal.addEventListener('click', () => {
    productModal.style.display = 'none';
});

cancelProduct.addEventListener('click', () => {
    productModal.style.display = 'none';
    window.location.href = 'index.html'; // Regresa al inicio
});

// Registrar el nuevo producto
const submitProduct = document.getElementById('submit-product');
submitProduct.addEventListener('click', () => {
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const imageInput = document.getElementById('product-image');

    const formData = new FormData();
    formData.append('product-name', name);
    formData.append('product-category', category);
    formData.append('product-price', price);
    formData.append('product-image', imageInput.files[0]);

    fetch('add_product.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                window.location.reload();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al registrar el producto.');
        });
});

function synchronizeCart(userId) {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIds = localCart.map(item => item.id);

    fetch('sync_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `cart=${encodeURIComponent(JSON.stringify(productIds))}&user_id=${encodeURIComponent(userId)}`
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Carrito sincronizado:', data.new_products);
            } else {
                alert('Error al sincronizar el carrito.');
            }
        })
        .catch(error => console.error('Error en la sincronización del carrito:', error));
}