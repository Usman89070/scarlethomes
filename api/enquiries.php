<?php
declare(strict_types=1);
/*
 * /api/enquiries.php - website enquiries (table `contacts`, incl. the old site's), admin only.
 *   GET ?q=&page=
 */
require __DIR__ . '/lib/bootstrap.php';

method('GET');
require_admin();
$page = max(1, int_in($_GET, 'page')); $per = 25; $off = ($page - 1) * $per;
$q = str_in($_GET, 'q', 100);
$w = ''; $args = [];
if ($q !== '') {
    $w = 'WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR suburb LIKE ? OR topic LIKE ? OR message LIKE ?';
    $args = array_fill(0, 6, '%' . addcslashes($q, '%_\\') . '%');
}
$st = db()->prepare("SELECT COUNT(*) FROM contacts $w"); $st->execute($args); $total = (int)$st->fetchColumn();
$st = db()->prepare("SELECT id, name, phone, email, suburb, topic, message, page_url, mail_status, created_at FROM contacts $w ORDER BY id DESC LIMIT $per OFFSET $off");
$st->execute($args);
json_out(['ok' => true, 'total' => $total, 'page' => $page, 'per_page' => $per, 'items' => $st->fetchAll()]);
