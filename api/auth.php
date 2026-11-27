<?php
declare(strict_types=1);
/*
 * /api/auth.php
 *   GET  ?a=session                  -> { user|null, csrf }
 *   POST ?a=login   {email,password} -> { user }
 *   POST ?a=logout
 *   POST ?a=password {current,next}  (signed in)
 * All POSTs need the X-CSRF-Token header (token from ?a=session).
 */
require __DIR__ . '/lib/bootstrap.php';

$a = $_GET['a'] ?? '';
$m = method('GET', 'POST');

if ($m === 'GET' && $a === 'session') {
    $u = current_user();
    json_out(['ok' => true, 'user' => $u ? public_user($u) : null, 'csrf' => csrf_token()]);
}

if ($m !== 'POST') fail('Not found.', 404);
require_csrf();
$in = body();

if ($a === 'login') {
    $email = mb_strtolower(str_in($in, 'email', 190));
    $pass = is_string($in['password'] ?? null) ? $in['password'] : '';
    $generic = 'Incorrect email or password.';
    $ip = ip_hash();
    $win = (int)(cfg('auth.lockout_window_minutes') ?: 15);

    $q = db()->prepare("SELECT
        (SELECT COUNT(*) FROM login_attempts WHERE email = ? AND success = 0 AND created_at > UTC_TIMESTAMP() - INTERVAL $win MINUTE) AS by_email,
        (SELECT COUNT(*) FROM login_attempts WHERE ip_hash = ? AND success = 0 AND created_at > UTC_TIMESTAMP() - INTERVAL $win MINUTE) AS by_ip");
    $q->execute([$email, $ip]);
    $c = $q->fetch();
    if ((int)$c['by_email'] >= (int)cfg('auth.max_fails_per_email') || (int)$c['by_ip'] >= (int)cfg('auth.max_fails_per_ip')) {
        fail('Too many sign-in attempts. Please wait ' . $win . ' minutes and try again.', 429, ['code' => 'locked']);
    }

    $st = db()->prepare('SELECT u.*, c.status AS contractor_status FROM users u LEFT JOIN contractors c ON c.id = u.contractor_id WHERE u.email = ?');
    $st->execute([$email]);
    $u = $st->fetch();
    // Always run password_verify so timing does not reveal whether the account exists.
    $hash = $u['password_hash'] ?? '$2y$10$DtJkyDW.Df1XD8nLyUFvEeyqL7ICSd2adbXjH8TreMkzw4CA..u0G';
    $ok = password_verify($pass, $hash) && $u && (int)$u['is_active']
        && ($u['role'] === 'admin' || $u['contractor_status'] === 'active');

    db()->prepare('INSERT INTO login_attempts (ip_hash, email, success) VALUES (?,?,?)')->execute([$ip, $email, $ok ? 1 : 0]);
    if (!$ok) fail($generic, 401);

    if (password_needs_rehash($u['password_hash'], PASSWORD_DEFAULT)) {
        db()->prepare('UPDATE users SET password_hash = ? WHERE id = ?')->execute([password_hash($pass, PASSWORD_DEFAULT), $u['id']]);
    }
    session_regenerate_id(true);
    $_SESSION['uid'] = (int)$u['id'];
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
    db()->prepare('UPDATE users SET last_login_at = UTC_TIMESTAMP() WHERE id = ?')->execute([$u['id']]);
    // successful login clears this email's recent failures
    db()->prepare('DELETE FROM login_attempts WHERE email = ? AND success = 0')->execute([$email]);
    json_out(['ok' => true, 'user' => public_user(current_user()), 'csrf' => $_SESSION['csrf']]);
}

if ($a === 'logout') {
    $_SESSION = [];
    $p = session_get_cookie_params();
    setcookie(session_name(), '', ['expires' => time() - 3600, 'path' => $p['path'], 'secure' => $p['secure'], 'httponly' => true, 'samesite' => 'Strict']);
    session_destroy();
    json_out(['ok' => true]);
}

if ($a === 'password') {
    $u = require_user(true);
    $cur = is_string($in['current'] ?? null) ? $in['current'] : '';
    $next = is_string($in['next'] ?? null) ? $in['next'] : '';
    $st = db()->prepare('SELECT password_hash FROM users WHERE id = ?');
    $st->execute([$u['id']]);
    if (!password_verify($cur, (string)$st->fetchColumn())) fail('Your current password is incorrect.', 400);
    if ($err = password_policy_error($next)) fail($err, 400);
    if (hash_equals($cur, $next)) fail('Choose a password you have not used here before.', 400);
    db()->prepare('UPDATE users SET password_hash = ?, must_change_password = 0 WHERE id = ?')->execute([password_hash($next, PASSWORD_DEFAULT), $u['id']]);
    session_regenerate_id(true);
    json_out(['ok' => true, 'user' => public_user(current_user())]);
}

fail('Not found.', 404);
