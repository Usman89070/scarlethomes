-- SQLite version of db/schema.sql, for the zero-configuration mode of the Node.js app
-- (no MySQL settings given). Same tables and columns; times are UTC text 'YYYY-MM-DD HH:MM:SS'.
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  email_verified_at TEXT DEFAULT NULL,
  password TEXT NOT NULL,
  remember_token TEXT DEFAULT NULL,
  created_at TEXT DEFAULT NULL,
  updated_at TEXT DEFAULT NULL,
  status INTEGER NOT NULL DEFAULT 1,
  must_change_password INTEGER NOT NULL DEFAULT 0,
  last_login_at TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT DEFAULT NULL,
  updated_at TEXT DEFAULT NULL
);
CREATE INDEX IF NOT EXISTS roles_user_id_index ON roles (user_id);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  created_at TEXT DEFAULT NULL,
  updated_at TEXT DEFAULT NULL,
  status INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS project_attachments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL REFERENCES projects (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  attachment TEXT NOT NULL,
  created_at TEXT DEFAULT NULL,
  updated_at TEXT DEFAULT NULL,
  title TEXT DEFAULT NULL
);
CREATE INDEX IF NOT EXISTS project_attachments_project ON project_attachments (project_id);

CREATE TABLE IF NOT EXISTS project_user_pivots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'default',
  created_at TEXT DEFAULT NULL,
  updated_at TEXT DEFAULT NULL,
  booked_on TEXT DEFAULT NULL,
  worked_on TEXT DEFAULT NULL,
  completed_on TEXT DEFAULT NULL,
  completion_attachment_id INTEGER DEFAULT NULL REFERENCES project_attachments (id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS project_user_pivots_project_user ON project_user_pivots (project_id, user_id);

CREATE TABLE IF NOT EXISTS project_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  project_id INTEGER NOT NULL REFERENCES projects (id) ON DELETE CASCADE ON UPDATE CASCADE,
  action TEXT NOT NULL,
  old_title TEXT DEFAULT NULL,
  old_description TEXT,
  new_title TEXT NOT NULL,
  new_description TEXT,
  action_date TEXT NOT NULL,
  action_time TEXT NOT NULL,
  created_at TEXT DEFAULT NULL,
  updated_at TEXT DEFAULT NULL
);
CREATE INDEX IF NOT EXISTS project_logs_project ON project_logs (project_id);

CREATE TABLE IF NOT EXISTS attendances (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  checked_in_at TEXT NOT NULL,
  checked_out_at TEXT DEFAULT NULL,
  checkout_image TEXT DEFAULT NULL,
  checkout_note TEXT,
  created_at TEXT DEFAULT NULL,
  updated_at TEXT DEFAULT NULL
);
CREATE INDEX IF NOT EXISTS attendances_project_user ON attendances (project_id, user_id);
CREATE INDEX IF NOT EXISTS attendances_user ON attendances (user_id);

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT DEFAULT NULL,
  email TEXT NOT NULL,
  topic TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT NULL,
  updated_at TEXT DEFAULT NULL,
  suburb TEXT NOT NULL DEFAULT '',
  page_url TEXT NOT NULL DEFAULT '',
  ip_hash TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT '',
  mail_status TEXT NOT NULL DEFAULT 'skipped'
);
CREATE INDEX IF NOT EXISTS contacts_ip ON contacts (ip_hash, created_at);

CREATE TABLE IF NOT EXISTS contractor_profiles (
  user_id INTEGER PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
  business_name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  trade TEXT NOT NULL DEFAULT '',
  licence_no TEXT NOT NULL DEFAULT '',
  abn TEXT NOT NULL DEFAULT '',
  insurance_expiry TEXT DEFAULT NULL,
  notes TEXT,
  created_at TEXT DEFAULT NULL,
  updated_at TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS contractor_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  doc_type TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  path TEXT NOT NULL,
  expires_on TEXT DEFAULT NULL,
  uploaded_by INTEGER DEFAULT NULL,
  created_at TEXT DEFAULT NULL,
  updated_at TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip_hash TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  success INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS login_attempts_email ON login_attempts (email, created_at);
CREATE INDEX IF NOT EXISTS login_attempts_ip ON login_attempts (ip_hash, created_at);

CREATE TABLE IF NOT EXISTS portal_sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER DEFAULT NULL,
  data TEXT NOT NULL,
  last_activity INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS portal_sessions_activity ON portal_sessions (last_activity);
