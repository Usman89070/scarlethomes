<?php
/*
 * Local dev server that mimics the Hostinger layout: static export at /, PHP API at /api.
 *   (cd web && npm run build) && php -S 127.0.0.1:8080 tools/dev-router.php
 */
$root = dirname(__DIR__);
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
if (preg_match('#^/api/(.+\.php)$#', $uri, $m)) {
    $f = realpath($root . '/api/' . $m[1]);
    if ($f && str_starts_with($f, $root . '/api/') && !preg_match('#/(lib|config)#', substr($f, strlen($root . '/api'))) ) {
        chdir(dirname($f));
        $_SERVER['SCRIPT_NAME'] = $uri;
        require $f;
        return true;
    }
    http_response_code(404); echo 'Not found'; return true;
}
$out = $root . '/web/out';
$path = realpath($out . $uri);
if ($path && str_starts_with($path, $out)) {
    if (is_dir($path)) {
        if (substr($uri, -1) !== '/') { header('Location: ' . $uri . '/', true, 301); return true; }
        $path .= '/index.html';
    }
    if (is_file($path)) {
        $types = ['html' => 'text/html; charset=utf-8', 'css' => 'text/css', 'js' => 'application/javascript', 'json' => 'application/json', 'webp' => 'image/webp', 'jpg' => 'image/jpeg', 'png' => 'image/png', 'svg' => 'image/svg+xml', 'woff2' => 'font/woff2', 'ico' => 'image/x-icon', 'xml' => 'application/xml', 'txt' => 'text/plain'];
        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        header('Content-Type: ' . ($types[$ext] ?? 'application/octet-stream'));
        readfile($path);
        return true;
    }
}
http_response_code(404);
readfile($out . '/404.html');
return true;
