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
