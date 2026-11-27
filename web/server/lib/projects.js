'use strict';
const db = require('./db');
const { fail } = require('./http');
const { isStaff } = require('./auth');
const { nowUtc, todayUtc, timeUtc } = require('./util');

async function projectGet(id) {
  const p = await db.one('SELECT p.id, p.title, p.description, p.status, p.user_id, p.created_at, p.updated_at, u.name AS created_by FROM projects p LEFT JOIN users u ON u.id = p.user_id WHERE p.id = ?', [id]);
  if (!p) return null;
  return { ...p, id: Number(p.id), status: Number(p.status), user_id: Number(p.user_id) };
}
async function pivotFor(projectId, userId) {
  return db.one('SELECT * FROM project_user_pivots WHERE project_id = ? AND user_id = ? ORDER BY id LIMIT 1', [projectId, userId]);
}
async function requireProjectAccess(u, projectId) {
  const p = await projectGet(projectId);
  if (!p) fail('Not found.', 404);
  if (!isStaff(u) && !(await pivotFor(projectId, u.id))) fail('Not found.', 404);
  return p;
}
async function projectLog(userId, projectId, action, old, nw) {
  await db.q('INSERT INTO project_logs (user_id, project_id, action, old_title, old_description, new_title, new_description, action_date, action_time, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    [userId, projectId, action, old ? old.title : null, old ? old.description : null, nw.title, nw.description ?? null, todayUtc(), timeUtc(), nowUtc(), nowUtc()]);
}
module.exports = { projectGet, pivotFor, requireProjectAccess, projectLog };
