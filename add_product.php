<?php
// Configuración de conexión
$servername = "localhost";
$username = "root";
$password = "NEDWEq08";
$dbname = "eq8tiendafi";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Validar si se recibió la imagen
if (isset($_FILES['product-image']) && $_FILES['product-image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'images/';
    $uploadFile = $uploadDir . basename($_FILES['product-image']['name']);

    if (move_uploaded_file($_FILES['product-image']['tmp_name'], $uploadFile)) {
        $name = $_POST['product-name'];
        $category = $_POST['product-category'];
        $price = $_POST['product-price'];
        $image = $uploadFile;

        $sql = "INSERT INTO productos (nombre, categoria, precio, imagen) VALUES ('$name', '$category', $price, '$image')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true, "message" => "Producto registrado correctamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al registrar el producto: " . $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Error al subir la imagen."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No se recibió una imagen válida."]);
}

$conn->close();
?>
