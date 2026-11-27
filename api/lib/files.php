<?php
declare(strict_types=1);

/*
 * Private file storage for the portal. Paths stored in the DB are relative to the uploads
 * folder (same shape as the old Laravel storage/app/public: "project/attachments/x.pdf").
 */

const UPLOAD_TYPES = [
    'application/pdf' => 'pdf',
    'image/jpeg'      => 'jpg',
    'image/png'       => 'png',
    'image/webp'      => 'webp',
];

function uploads_dir(): string
{
    $d = cfg('uploads_dir') ?: dirname(__DIR__) . '/storage/uploads';
    return rtrim((string)$d, '/');
}

/*
 * Validate and store $_FILES[$field]. $images = only images allowed. Returns the relative
 * path, or null when no file was sent. Fails the request on an invalid file.
 */
function store_upload(string $field, string $subdir, bool $images = false): ?string
{
    if (empty($_FILES[$field]) || ($_FILES[$field]['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) return null;
    $f = $_FILES[$field];
    if (is_array($f['error'])) fail('Send one file at a time.', 422);
    $max = (int)(cfg('max_upload_mb') ?: 20) * 1024 * 1024;
    if ($f['error'] === UPLOAD_ERR_INI_SIZE || $f['error'] === UPLOAD_ERR_FORM_SIZE || $f['size'] > $max) {
        fail('The file is too large (max ' . (int)(cfg('max_upload_mb') ?: 20) . ' MB).', 422);
    }
    if ($f['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp_name'])) fail('The upload failed. Please try again.', 422);
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']) ?: '';
    $ext = UPLOAD_TYPES[$mime] ?? null;
    if (!$ext || ($images && $ext === 'pdf')) {
        fail($images ? 'Upload a JPG, PNG or WebP photo.' : 'Upload a PDF, JPG, PNG or WebP file.', 422);
    }
    $rel = trim($subdir, '/') . '/' . bin2hex(random_bytes(16)) . '.' . $ext;
    $abs = uploads_dir() . '/' . $rel;
    if (!is_dir(dirname($abs)) && !mkdir(dirname($abs), 0750, true)) {
        throw new RuntimeException('Cannot create upload folder ' . dirname($abs));
    }
    if (!move_uploaded_file($f['tmp_name'], $abs)) throw new RuntimeException('move_uploaded_file failed');
    @chmod($abs, 0640);
    return $rel;
}

/* Resolve a stored relative path safely (no traversal outside the uploads folder). */
function upload_path(string $rel): ?string
{
    $base = realpath(uploads_dir());
    if (!$base || $rel === '' || str_contains($rel, "\0")) return null;
    $p = realpath($base . '/' . ltrim($rel, '/'));
    if (!$p || !str_starts_with($p, $base . DIRECTORY_SEPARATOR) || !is_file($p)) return null;
    return $p;
}

function delete_upload(?string $rel): void
{
    if (!$rel) return;
    $p = upload_path($rel);
    if ($p) @unlink($p);
}

function send_file(string $rel, string $downloadName): void
{
    $p = upload_path($rel);
    if (!$p) fail('File not found.', 404);
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($p) ?: 'application/octet-stream';
    if (!isset(UPLOAD_TYPES[$mime])) $mime = 'application/octet-stream';
    $ext = pathinfo($p, PATHINFO_EXTENSION);
    $name = preg_replace('/[^A-Za-z0-9 ._-]+/', '', $downloadName) ?: 'file';
    if (!str_ends_with(strtolower($name), '.' . strtolower($ext))) $name .= '.' . $ext;
    $inline = $mime !== 'application/octet-stream';
    header('Content-Type: ' . $mime);
    header('Content-Length: ' . filesize($p));
    header('Content-Disposition: ' . ($inline ? 'inline' : 'attachment') . '; filename="' . $name . '"');
    header('Cache-Control: private, no-store');
    header('X-Content-Type-Options: nosniff');
    header("Content-Security-Policy: default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; sandbox");
    readfile($p);
    exit;
}
