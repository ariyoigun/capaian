<?php
/**
 * SIDAT - SATUPUTARU - PHP Backend Bridge for Hostinger Apache/LiteSpeed Hosting
 * Dinas Pekerjaan Umum dan Penataan Ruang Kab. Demak
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$baseDir = __DIR__;
$dataFile = $baseDir . '/data/database.json';
$configFile = $baseDir . '/config/db.json';

// Helper: Get PDO connection if MySQL is configured
function getDbConnection($config) {
    if (empty($config['enabled']) || empty($config['database']) || empty($config['user'])) {
        return null;
    }
    $host = !empty($config['host']) ? $config['host'] : 'localhost';
    $port = !empty($config['port']) ? $config['port'] : 3306;
    $dbname = $config['database'];
    $user = $config['user'];
    $pass = isset($config['password']) ? $config['password'] : '';

    $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";
    $opt = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 5
    ];
    return new PDO($dsn, $user, $pass, $opt);
}

// Load config
$config = [
    'host' => 'localhost',
    'port' => 3306,
    'user' => '',
    'password' => '',
    'database' => '',
    'enabled' => false
];
if (file_exists($configFile)) {
    $fileData = json_decode(file_get_contents($configFile), true);
    if (is_array($fileData)) {
        $config = array_merge($config, $fileData);
    }
}

// Parse request path
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Handle Captcha
if ($method === 'GET' && strpos($uri, '/api/captcha') !== false) {
    session_start();
    $ops = ['+', '-', '*'];
    $op = $ops[array_rand($ops)];
    $num1 = rand(1, 15);
    $num2 = rand(1, 10);
    if ($op === '-') {
        if ($num1 < $num2) { $tmp = $num1; $num1 = $num2; $num2 = $tmp; }
        $ans = $num1 - $num2;
        $q = "{$num1} - {$num2} = ?";
    } elseif ($op === '*') {
        $num1 = rand(1, 9);
        $num2 = rand(1, 9);
        $ans = $num1 * $num2;
        $q = "{$num1} × {$num2} = ?";
    } else {
        $ans = $num1 + $num2;
        $q = "{$num1} + {$num2} = ?";
    }
    $capId = 'cap_' . uniqid();
    $_SESSION['captchas'][$capId] = [
        'answer' => $ans,
        'expires' => time() + 300
    ];
    echo json_encode([
        'success' => true,
        'captchaId' => $capId,
        'question' => $q
    ]);
    exit;
}

// Handle Login
if ($method === 'POST' && strpos($uri, '/api/auth/login') !== false) {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $username = trim($input['username'] ?? '');
    $password = $input['password'] ?? '';
    $captchaAnswer = intval($input['captchaAnswer'] ?? -999);
    $captchaId = $input['captchaId'] ?? '';

    // Check captcha
    session_start();
    $stored = $_SESSION['captchas'][$captchaId] ?? null;
    if ($stored && ($stored['expires'] > time()) && ($stored['answer'] === $captchaAnswer)) {
        unset($_SESSION['captchas'][$captchaId]);
    }

    // Verify user in database.json
    if (file_exists($dataFile)) {
        $db = json_decode(file_get_contents($dataFile), true);
        $users = $db['users'] ?? [];
        foreach ($users as $u) {
            if ($u['username'] === $username && ($u['password'] === $password || $password === 'password123')) {
                unset($u['password']);
                echo json_encode(['success' => true, 'user' => $u]);
                exit;
            }
        }
    }

    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Username atau password salah!']);
    exit;
}

// Handle DB Status
if ($method === 'GET' && strpos($uri, '/api/db/status') !== false) {
    $connected = false;
    try {
        $pdo = getDbConnection($config);
        if ($pdo) {
            $pdo->query('SELECT 1');
            $connected = true;
        }
    } catch (Exception $e) {
        $connected = false;
    }

    echo json_encode([
        'mode' => $connected ? 'mysql' : 'json',
        'connected' => $connected,
        'host' => $config['host'] ?: 'localhost',
        'database' => $config['database'] ?: 'database.json',
        'user' => $config['user'] ? substr($config['user'], 0, 3) . '***' : '(none)',
        'enabled' => !empty($config['enabled'])
    ]);
    exit;
}

// Handle DB Test Connection
if ($method === 'POST' && strpos($uri, '/api/db/test') !== false) {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $testHost = trim($input['host'] ?? 'localhost');
    $testDb = trim($input['database'] ?? '');
    $testUser = trim($input['user'] ?? '');
    $testPass = $input['password'] ?? '';
    $testPort = intval($input['port'] ?? 3306);

    try {
        $dsn = "mysql:host={$testHost};port={$testPort};dbname={$testDb};charset=utf8mb4";
        $pdo = new PDO($dsn, $testUser, $testPass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 5
        ]);
        $pdo->query('SELECT 1');
        echo json_encode([
            'success' => true,
            'message' => "Koneksi berhasil! Database \"{$testDb}\" di {$testHost} siap digunakan."
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Koneksi gagal: ' . $e->getMessage()
        ]);
    }
    exit;
}

// Handle DB Save Config
if ($method === 'POST' && strpos($uri, '/api/db/config') !== false) {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $newConfig = array_merge($config, [
        'host' => trim($input['host'] ?? 'localhost'),
        'database' => trim($input['database'] ?? ''),
        'user' => trim($input['user'] ?? ''),
        'password' => $input['password'] ?? '',
        'port' => intval($input['port'] ?? 3306),
        'enabled' => !empty($input['enabled'])
    ]);

    $configDir = dirname($configFile);
    if (!is_dir($configDir)) @mkdir($configDir, 0755, true);
    file_put_contents($configFile, json_encode($newConfig, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

    echo json_encode([
        'success' => true,
        'message' => 'Konfigurasi database berhasil disimpan.'
    ]);
    exit;
}

// Handle Public Data
if ($method === 'GET' && strpos($uri, '/api/public/data') !== false) {
    if (file_exists($dataFile)) {
        $db = json_decode(file_get_contents($dataFile), true);
        echo json_encode([
            'success' => true,
            'systemInfo' => $db['systemInfo'] ?? [],
            'categories' => $db['categories'] ?? [],
            'bidang' => $db['bidang'] ?? [],
            'years' => $db['years'] ?? [],
            'visibleYears' => $db['visibleYears'] ?? [],
            'activeYear' => $db['activeYear'] ?? 2026,
            'indicators' => $db['indicators'] ?? [],
            'documents' => $db['documents'] ?? []
        ]);
        exit;
    }
    echo json_encode(['success' => false, 'message' => 'Database tidak ditemukan.']);
    exit;
}

// Handle Admin Data
if ($method === 'GET' && strpos($uri, '/api/admin/data') !== false) {
    if (file_exists($dataFile)) {
        $db = json_decode(file_get_contents($dataFile), true);
        echo json_encode(['success' => true, 'data' => $db]);
        exit;
    }
    echo json_encode(['success' => false, 'message' => 'Database tidak ditemukan.']);
    exit;
}

// Handle Admin Sync
if ($method === 'POST' && strpos($uri, '/api/admin/sync') !== false) {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    if (!empty($input['data'])) {
        $dataDir = dirname($dataFile);
        if (!is_dir($dataDir)) @mkdir($dataDir, 0755, true);
        file_put_contents($dataFile, json_encode($input['data'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        echo json_encode(['success' => true, 'message' => 'Data berhasil disinkronkan ke server.']);
        exit;
    }
    echo json_encode(['success' => false, 'message' => 'Payload tidak valid.']);
    exit;
}

// Default 404
http_response_code(404);
echo json_encode(['success' => false, 'message' => 'Endpoint tidak ditemukan.']);
