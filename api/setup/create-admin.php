<?php
declare(strict_types=1);
/*
 * One-time: create the first admin login.
 *
 *   CLI (SSH):  php api/setup/create-admin.php admin@scarlethomes.com.au "Bharat"
 *               (prompts for the password, or generates one if you just press Enter)
 *
 *   Web (no SSH): set 'setup_token' in config.php, then POST to
 *               https://scarlethomes.com.au/api/setup/create-admin.php
 *               with token, email, name, password. Works only while NO admin exists.
 *
 * Afterwards DELETE this file (or the whole api/setup folder) and clear setup_token.
 */
require dirname(__DIR__) . '/lib/bootstrap.php';

function admins_exist(): bool
{
    return (int)db()->query("SELECT COUNT(*) FROM roles r JOIN users u ON u.id = r.user_id WHERE r.role = 'admin' AND u.status = 1")->fetchColumn() > 0;
}

function create_admin(string $email, string $name, string $pass): void
{
    db()->prepare('INSERT INTO users (name, email, password, status, must_change_password, created_at, updated_at) VALUES (?,?,?,1,0,?,?)')
        ->execute([$name ?: $email, mb_strtolower($email), hash_password($pass), now_utc(), now_utc()]);
    db()->prepare("INSERT INTO roles (user_id, role, created_at, updated_at) VALUES (?, 'admin', ?, ?)")
        ->execute([(int)db()->lastInsertId(), now_utc(), now_utc()]);
}

if (PHP_SAPI === 'cli') {
    $email = $argv[1] ?? '';
    $name = $argv[2] ?? '';
    if (!valid_email($email)) { fwrite(STDERR, "Usage: php create-admin.php <email> \"<name>\"\n"); exit(1); }
    $st = db()->prepare('SELECT COUNT(*) FROM users WHERE email = ?');
    $st->execute([mb_strtolower($email)]);
    if ((int)$st->fetchColumn()) { fwrite(STDERR, "A user with that email already exists.\n"); exit(1); }
    $pass = getenv('ADMIN_PASSWORD') ?: '';
    if ($pass === '' && function_exists('posix_isatty') && posix_isatty(STDIN)) {
        echo 'Password (min 10 chars, letters + numbers; Enter = generate): ';
        system('stty -echo'); $pass = trim((string)fgets(STDIN)); system('stty echo'); echo "\n";
    }
    $generated = false;
    if ($pass === '') { $pass = temp_password(); $generated = true; }
    if ($err = password_policy_error($pass)) { fwrite(STDERR, $err . "\n"); exit(1); }
    create_admin($email, $name, $pass);
    echo "Admin created: $email\n";
    if ($generated) echo "Generated password (shown once): $pass\n";
    echo "Now delete api/setup/ from the server.\n";
    exit(0);
}

// ---- web mode
method('POST');
same_origin_or_fail();
$token = (string)cfg('setup_token');
$in = body();
if ($token === '' || !hash_equals($token, (string)($in['token'] ?? '')) || admins_exist()) {
    fail('Not found.', 404);
}
$email = str_in($in, 'email', 190);
$name = str_in($in, 'name', 120);
$pass = is_string($in['password'] ?? null) ? $in['password'] : '';
if (!valid_email($email)) fail('Enter a valid email address.', 422);
if ($err = password_policy_error($pass)) fail($err, 422);
create_admin($email, $name, $pass);
json_out(['ok' => true, 'message' => 'Admin created. Delete api/setup/ and clear setup_token now.']);
