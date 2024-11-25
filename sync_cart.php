<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "NEDWEq08";
$dbname = "eq8tiendafi";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Conexión fallida: " . $conn->connect_error]));
}

$user_id = $_SESSION['user_id'];
$localCart = json_decode($_POST['cart'], true); // Carrito local (array de producto_id)

// Obtener el carrito del usuario desde la base de datos
$sql = "SELECT producto_id FROM carrito WHERE usuario_id = $user_id";
$result = $conn->query($sql);
$dbCart = [];
while ($row = $result->fetch_assoc()) {
    $dbCart[] = $row['producto_id'];
}

// Comparar carritos y sincronizar
$newProducts = [];
foreach ($localCart as $product_id) {
    if (!in_array($product_id, $dbCart)) {
        $newProducts[] = $product_id;
        $sqlInsert = "INSERT INTO carrito (usuario_id, producto_id) VALUES ($user_id, $product_id)";
        $conn->query($sqlInsert);
    }
}

echo json_encode(["success" => true, "message" => "Carrito sincronizado.", "new_products" => $newProducts]);
$conn->close();
?>
