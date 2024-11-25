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

$usuario = $conn->real_escape_string($_POST['usuario']);
$password = $conn->real_escape_string($_POST['password']);

// Verificar usuario
$sql = "SELECT id, contraseña FROM usuario WHERE usuario = '$usuario'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($password == $row['contraseña']) {
        $_SESSION['user_id'] = $row['id'];
        echo json_encode(["success" => true, "message" => "Inicio de sesión exitoso.", "user_id" => $row['id']]);
    } else {
        echo json_encode(["success" => false, "message" => "Contraseña incorrecta."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
}

$conn->close();
?>
