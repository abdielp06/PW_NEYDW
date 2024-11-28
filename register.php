<?php
header('Content-Type: application/json');
session_start();

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "NEDWEq08";
$dbname = "eq8tiendafi";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]));
}

// Obtener datos del formulario
$usuario = isset($_POST['usuario']) ? trim($_POST['usuario']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';

if (empty($usuario) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Usuario o contraseña vacíos."]);
    exit;
}

// Verificar si el usuario ya existe
$sql = "SELECT id FROM usuario WHERE usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "El usuario ya existe."]);
    exit;
}

// Insertar el nuevo usuario (sin encriptar la contraseña)
$sqlInsert = "INSERT INTO usuario (usuario, contraseña) VALUES (?, ?)";
$stmtInsert = $conn->prepare($sqlInsert);
$stmtInsert->bind_param("ss", $usuario, $password);

if ($stmtInsert->execute()) {
    echo json_encode(["success" => true, "message" => "Usuario registrado exitosamente."]);
} else {
    echo json_encode(["success" => false, "message" => "Error al registrar usuario."]);
}

$stmt->close();
$conn->close();
?>
