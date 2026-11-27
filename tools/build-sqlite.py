"""Build a SQLite database for the zero-configuration Node.js app.

  python3 -I tools/build-sqlite.py <out.sqlite> --sample            # schema + db/seed.sql (tests)
  python3 -I tools/build-sqlite.py <out.sqlite> --dump old.sql      # schema + the old site's data

--dump reads a phpMyAdmin/mysqldump export of the old Laravel database and copies the portal
tables (users, roles, projects, project_attachments, project_user_pivots, project_logs,
attendances, contacts). The output contains real personal data: never commit it.
"""
import os, re, sqlite3, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMA = os.path.join(ROOT, 'web', 'server', 'schema.sqlite.sql')
TABLES = ['users', 'roles', 'projects', 'project_attachments', 'project_user_pivots', 'project_logs', 'attendances', 'contacts']

def parse_values(s, i):
    """Parse MySQL VALUES tuples starting at s[i]; returns (rows, index after ';')."""
    rows, n = [], len(s)
    while i < n:
        while i < n and s[i] in ' \n\r\t,':
            i += 1
        if s[i] == ';':
            return rows, i + 1
        assert s[i] == '(', s[i:i + 40]
        i += 1
        row = []
        while True:
            while s[i] in ' \n\r\t':
                i += 1
            if s[i] == "'":
                i += 1; buf = []
                while True:
                    c = s[i]
                    if c == '\\':
                        nx = s[i + 1]
                        buf.append({'n': '\n', 'r': '\r', 't': '\t', '0': '\0', 'Z': '\x1a', 'b': '\b'}.get(nx, nx)); i += 2
                    elif c == "'":
                        if s[i + 1] == "'":
                            buf.append("'"); i += 2
                        else:
                            i += 1; break
                    else:
                        buf.append(c); i += 1
                row.append(''.join(buf))
            else:
                m = re.match(r'(NULL|-?\d+(?:\.\d+)?)', s[i:])
                tok = m.group(1); i += len(tok)
                row.append(None if tok == 'NULL' else (float(tok) if '.' in tok else int(tok)))
            while s[i] in ' \n\r\t':
                i += 1
            if s[i] == ',':
                i += 1; continue
            assert s[i] == ')', s[i:i + 40]
            i += 1; break
        rows.append(row)
    return rows, i

def main():
    out, mode = sys.argv[1], sys.argv[2]
    if os.path.exists(out):
        os.remove(out)
    con = sqlite3.connect(out)
    con.executescript(open(SCHEMA, encoding='utf-8').read())
    con.execute('PRAGMA foreign_keys = OFF')
    if mode == '--sample':
        sql = open(os.path.join(ROOT, 'db', 'seed.sql'), encoding='utf-8').read()
        sql = re.sub(r'^\s*(SET|--).*$', '', sql, flags=re.M)
        sql = sql.replace('UTC_TIMESTAMP()', "datetime('now')").replace('UTC_DATE()', "date('now')").replace('UTC_TIME()', "time('now')")
        con.executescript(sql)
    elif mode == '--dump':
        s = open(sys.argv[3], encoding='utf-8').read()
        cols_by_table = {r[1]: [c[1] for c in con.execute('PRAGMA table_info(%s)' % r[1])] for r in con.execute("SELECT 0, name FROM sqlite_master WHERE type='table'")}
        counts = {}
        for m in re.finditer(r'INSERT INTO `(\w+)` \(([^)]*)\) VALUES\s*', s):
            t = m.group(1)
            if t not in TABLES:
                continue
            cols = [c.strip().strip('`') for c in m.group(2).split(',')]
            rows, _ = parse_values(s, m.end())
            keep = [k for k, c in enumerate(cols) if c in cols_by_table[t]]
            names = [cols[k] for k in keep]
            con.executemany('INSERT INTO %s (%s) VALUES (%s)' % (t, ', '.join(names), ', '.join('?' * len(names))),
                            [[r[k] for k in keep] for r in rows])
            counts[t] = counts.get(t, 0) + len(rows)
        for t in TABLES:
            print('  %-22s %d rows' % (t, counts.get(t, 0)))
    else:
        sys.exit('mode: --sample or --dump <file>')
    con.commit()
    con.execute('VACUUM')
    con.close()
    print('wrote', out)

main()
