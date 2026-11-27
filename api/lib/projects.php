<?php
declare(strict_types=1);

function project_get(int $id): ?array
{
    $st = db()->prepare('SELECT p.id, p.title, p.description, p.status, p.user_id, p.created_at, p.updated_at, u.name AS created_by
                           FROM projects p LEFT JOIN users u ON u.id = p.user_id WHERE p.id = ?');
    $st->execute([$id]);
    $p = $st->fetch();
    if (!$p) return null;
    $p['id'] = (int)$p['id']; $p['status'] = (int)$p['status'];
    return $p;
}

function pivot_for(int $projectId, int $userId): ?array
{
    $st = db()->prepare('SELECT * FROM project_user_pivots WHERE project_id = ? AND user_id = ? ORDER BY id LIMIT 1');
    $st->execute([$projectId, $userId]);
    return $st->fetch() ?: null;
}

/* Contractors may only see projects they are assigned to. */
function require_project_access(array $u, int $projectId): array
{
    $p = project_get($projectId);
    if (!$p) fail('Not found.', 404);
    if (!is_staff($u) && !pivot_for($projectId, (int)$u['id'])) fail('Not found.', 404);
    return $p;
}

function project_log(int $userId, int $projectId, string $action, ?array $old, array $new): void
{
    db()->prepare('INSERT INTO project_logs (user_id, project_id, action, old_title, old_description, new_title, new_description, action_date, action_time, created_at, updated_at)
                   VALUES (?,?,?,?,?,?,?,?,?,?,?)')
        ->execute([$userId, $projectId, $action, $old['title'] ?? null, $old['description'] ?? null, $new['title'], $new['description'] ?? null,
                   gmdate('Y-m-d'), gmdate('H:i:s'), now_utc(), now_utc()]);
}
