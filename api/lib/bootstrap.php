<?php
declare(strict_types=1);

/*
 * Shared bootstrap for every endpoint: config, PDO, JSON responses, session, CSRF, auth,
 * rate-limiting helpers. Never output PHP errors to the client.
 */

ini_set('display_errors', '0');
error_reporting(E_ALL);

const SH_API = true;

function cfg(?string $key = null)
{
    static $c = null;
    if ($c === null) {
        $file = dirname(__DIR__) . '/config.php';
        if (!is_file($file)) {
            json_out(['ok' => false, 'error' => 'Service unavailable.'], 503);
        }
        $c = require $file;
    }
    if ($key === null) return $c;
    $v = $c;
    foreach (explode('.', $key) as $k) {
        if (!is_array($v) || !array_key_exists($k, $v)) return null;
        $v = $v[$k];
    }
    return $v;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo) return $pdo;
    $d = cfg('db');
    $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', $d['host'], (int)($d['port'] ?? 3306), $d['name'], $d['charset'] ?? 'utf8mb4');
    try {
        $pdo = new PDO($dsn, $d['user'], $d['pass'], [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
        $pdo->exec("SET time_zone = '+00:00'");
    } catch (Throwable $e) {
        error_log('[scarlet api] DB connect failed: ' . $e->getMessage());
        json_out(['ok' => false, 'error' => 'Service unavailable.'], 503);
    }
    return $pdo;
}

function json_out(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(string $msg, int $status = 400, array $extra = []): void
{
    json_out(['ok' => false, 'error' => $msg] + $extra, $status);
}

/* Convert uncaught errors into a generic 500 (details only in the server error log). */
set_exception_handler(function (Throwable $e) {
    error_log('[scarlet api] ' . get_class($e) . ': ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
    json_out(['ok' => false, 'error' => 'Something went wrong. Please try again.'], 500);
});

function client_ip(): string
{
    // Hostinger passes the real client IP in REMOTE_ADDR. Do not trust X-Forwarded-For.
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

function ip_hash(): string
{
    return hash('sha256', client_ip() . '|' . (string)cfg('app_secret'));
}

function method(string ...$allowed): string
{
    $m = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($m === 'OPTIONS') { cors(); http_response_code(204); exit; }
    if (!in_array($m, $allowed, true)) {
        header('Allow: ' . implode(', ', $allowed));
        fail('Method not allowed.', 405);
    }
    return $m;
}

function cors(): void
{
    $dev = (string)cfg('dev_cors_origin');
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($dev !== '' && $origin === $dev) {
        header('Access-Control-Allow-Origin: ' . $dev);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Vary: Origin');
    }
}

/* Reject cross-site state-changing requests (defence in depth on top of CSRF + SameSite). */
function same_origin_or_fail(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') return; // same-origin form posts from old browsers / curl
    $allowed = [rtrim((string)cfg('site_url'), '/')];
    $host = $_SERVER['HTTP_HOST'] ?? '';
    if ($host !== '') {
        $allowed[] = 'https://' . $host;
        $allowed[] = 'http://' . $host;
    }
    if ((string)cfg('dev_cors_origin') !== '') $allowed[] = (string)cfg('dev_cors_origin');
    $alt = preg_replace('#^(https?://)www\.#', '$1', $allowed[0]);
    $allowed[] = $alt;
    $allowed[] = preg_replace('#^(https?://)#', '$1www.', $alt);
    if (!in_array(rtrim($origin, '/'), $allowed, true)) fail('Forbidden.', 403);
}

function body(): array
{
    static $b = null;
    if ($b !== null) return $b;
    $ct = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($ct, 'application/json') !== false) {
        $raw = file_get_contents('php://input', false, null, 0, 65536);
        $b = json_decode($raw ?: '[]', true);
        if (!is_array($b)) fail('Invalid request.', 400);
    } else {
        $b = $_POST;
    }
    return $b;
}

/* Trimmed single-line string, control characters removed, length-capped. */
function str_in(array $src, string $k, int $max = 255): string
{
    $v = $src[$k] ?? '';
    if (!is_string($v)) return '';
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    $v = trim(preg_replace('/\s+/u', ' ', $v) ?? '');
    return mb_substr($v, 0, $max);
}

/* Multi-line text (keeps newlines). */
function text_in(array $src, string $k, int $max = 5000): string
{
    $v = $src[$k] ?? '';
    if (!is_string($v)) return '';
    $v = str_replace(["\r\n", "\r"], "\n", $v);
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    return mb_substr(trim($v), 0, $max);
}

/* ---------------------------------------------------------------- session / auth / csrf */

function start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) return;
    $secure = !cfg('insecure_cookies');
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.cookie_httponly', '1');
    ini_set('session.sid_length', '48');
    ini_set('session.sid_bits_per_character', '6');
    session_name((string)(cfg('auth.session_name') ?: 'SHPORTAL'));
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'secure'   => $secure,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
    $idle = 60 * (int)(cfg('auth.idle_timeout_minutes') ?: 30);
    if (isset($_SESSION['uid'], $_SESSION['last']) && time() - (int)$_SESSION['last'] > $idle) {
        $_SESSION = [];
        session_regenerate_id(true);
    }
    $_SESSION['last'] = time();
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
}

function csrf_token(): string
{
    start_session();
    return $_SESSION['csrf'];
}

function require_csrf(): void
{
    start_session();
    same_origin_or_fail();
    $t = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? (body()['csrf'] ?? '');
    if (!is_string($t) || $t === '' || !hash_equals($_SESSION['csrf'], $t)) {
        fail('Your session has expired. Please refresh the page and try again.', 403, ['code' => 'csrf']);
    }
}

function current_user(): ?array
{
    start_session();
    if (empty($_SESSION['uid'])) return null;
    $st = db()->prepare('SELECT u.id, u.email, u.name, u.role, u.contractor_id, u.is_active, u.must_change_password,
                                c.status AS contractor_status
                           FROM users u LEFT JOIN contractors c ON c.id = u.contractor_id WHERE u.id = ?');
    $st->execute([(int)$_SESSION['uid']]);
    $u = $st->fetch();
    if (!$u || !(int)$u['is_active'] || ($u['role'] === 'contractor' && $u['contractor_status'] !== 'active')) {
        $_SESSION = [];
        session_regenerate_id(true);
        return null;
    }
    return $u;
}

function require_user(bool $allowPendingPasswordChange = false): array
{
    $u = current_user();
    if (!$u) fail('Please sign in.', 401, ['code' => 'auth']);
    if (!$allowPendingPasswordChange && (int)$u['must_change_password']) {
        fail('Please set a new password first.', 403, ['code' => 'must_change_password']);
    }
    return $u;
}

function require_admin(): array
{
    $u = require_user();
    if ($u['role'] !== 'admin') fail('Forbidden.', 403);
    return $u;
}

function public_user(array $u): array
{
    return [
        'id' => (int)$u['id'], 'email' => $u['email'], 'name' => $u['name'], 'role' => $u['role'],
        'contractor_id' => $u['contractor_id'] !== null ? (int)$u['contractor_id'] : null,
        'must_change_password' => (bool)$u['must_change_password'],
    ];
}

function password_policy_error(string $p): ?string
{
    if (mb_strlen($p) < 10) return 'Password must be at least 10 characters.';
    if (mb_strlen($p) > 200) return 'Password is too long.';
    if (!preg_match('/[A-Za-z]/', $p) || !preg_match('/\d/', $p)) return 'Password must contain letters and numbers.';
    return null;
}

function temp_password(): string
{
    $alpha = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
    do {
        $p = '';
        for ($i = 0; $i < 14; $i++) $p .= $alpha[random_int(0, strlen($alpha) - 1)];
    } while (password_policy_error($p) !== null);
    return $p;
}

function valid_email(string $e): bool
{
    return $e !== '' && strlen($e) <= 190 && filter_var($e, FILTER_VALIDATE_EMAIL) !== false;
}

function valid_date_or_empty(string $d): bool
{
    if ($d === '') return true;
    $dt = DateTime::createFromFormat('!Y-m-d', $d);
    return $dt !== false && $dt->format('Y-m-d') === $d;
}

cors();
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');
