// Obtener el carrito del localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para mostrar los productos en el carrito
function displayCartItems() {
    const cartListElement = document.getElementById('cart-list');
    cartListElement.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartListElement.innerHTML = '<p>El carrito está vacío.</p>';
        document.getElementById('cart-total').innerText = '0.00';
        return;
    }

    cart.forEach((product, index) => {
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartListElement.appendChild(cartItem);
        total += product.price;
    });

    document.getElementById('cart-total').innerText = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Mostrar los productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

// Manejar el botón de "Proceder al Pago"
const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
    alert('Funcionalidad de pago no implementada.');
});
