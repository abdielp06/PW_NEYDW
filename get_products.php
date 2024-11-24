<?php
// get_products.php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "NEDWEq08";
$dbname = "eq8tiendafi";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT nombre, categoria, precio, imagen FROM productos";  // Asegúrate de que tu tabla y columnas coincidan
$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {
    // Guardar los resultados en un arreglo
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$conn->close();

// Devolver los productos en formato JSON
echo json_encode($products);
?>
