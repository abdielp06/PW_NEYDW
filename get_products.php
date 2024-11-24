<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "NEDWEq08";
$dbname = "eq8tiendafi";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT nombre, categoria, precio, imagen FROM productos";
$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$conn->close();

echo json_encode($products);
?>
