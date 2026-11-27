'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { api, ApiError, setCsrf } from './api';
import type { Contractor, Enquiry, Page, User } from './types';
import { Field, Msg, Submit, fmtDate, insuranceState, useForm } from './ui';

type Session = { user: User | null; csrf: string };

export default function Portal() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [fatal, setFatal] = useState('');

  const load = useCallback(async () => {
    try {
      const s = await api<Session>('auth.php?a=session');
      setCsrf(s.csrf);
      setUser(s.user);
    } catch (e) {
      setFatal((e as Error).message);
    } finally {
      setReady(true);
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  const logout = async () => {
    try { await api('auth.php?a=logout', {}); } catch { /* ignore */ }
    setUser(null);
    await load();
  };
  // any 401 from a child view -> back to the login form
  const onAuthLost = () => { setUser(null); load(); };

  if (!ready) return <div className="sh-po-card sh-po-narrow" aria-busy="true"><p className="sh-po-muted">Loading…</p></div>;
  if (fatal && !user) return <div className="sh-po-card sh-po-narrow"><Msg text={fatal} /></div>;
  if (!user) return <Login onDone={(u) => setUser(u)} />;
  if (user.must_change_password) {
    return (
      <div className="sh-po-card sh-po-narrow">
        <Bar user={user} onLogout={logout} />
        <h2 className="sh-po-h">Set a new password</h2>
        <p className="sh-po-muted">You signed in with a temporary password. Choose your own password to continue.</p>
        <ChangePassword onDone={(u) => setUser(u)} onAuthLost={onAuthLost} />
      </div>
    );
  }
  return user.role === 'admin'
    ? <Admin user={user} onLogout={logout} onAuthLost={onAuthLost} />
    : <ContractorHome user={user} onLogout={logout} onAuthLost={onAuthLost} />;
}

function Bar({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <div className="sh-po-bar">
      <span>Signed in as <b>{user.name || user.email}</b>{user.role === 'admin' ? ' · Admin' : ''}</span>
      <button type="button" className="sh-po-link" onClick={onLogout}>Sign out</button>
    </div>
  );
}

function errText(e: unknown, onAuthLost?: () => void) {
  if (e instanceof ApiError && e.status === 401 && onAuthLost) onAuthLost();
  return (e as Error).message;
}

/* ------------------------------------------------------------------ login */
function Login({ onDone }: { onDone: (u: User) => void }) {
  const { v, set } = useForm({ email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!v.email || !v.password) { setMsg('Enter your email and password.'); return; }
    setBusy(true); setMsg('');
    try {
      const r = await api<{ user: User }>('auth.php?a=login', v);
      onDone(r.user);
    } catch (err) {
      setMsg((err as Error).message);
    } finally { setBusy(false); }
  };
  return (
    <form className="sh-cf sh-po-narrow" onSubmit={submit} noValidate>
      <h3>Contractor Login</h3>
      <p>Use the email address registered with Scarlet Homes.</p>
      <Field id="po-email" label="Email" type="email" value={v.email} onChange={set('email')} required autoComplete="username" />
      <Field id="po-pass" label="Password" type="password" value={v.password} onChange={set('password')} required autoComplete="current-password" />
      <Submit busy={busy}>Sign In</Submit>
      <Msg text={msg} />
      <p className="sh-fine">Forgotten your password? Call us on <a href="tel:1800727538">1800 727 538</a> and we will reset it.</p>
    </form>
  );
}

/* ------------------------------------------------------------------ password */
function ChangePassword({ onDone, onAuthLost }: { onDone?: (u: User) => void; onAuthLost: () => void }) {
  const { v, setV, set } = useForm({ current: '', next: '', confirm: '' });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok?: boolean; text: string }>({ text: '' });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (v.next !== v.confirm) { setMsg({ text: 'The new passwords do not match.' }); return; }
    setBusy(true); setMsg({ text: '' });
    try {
      const r = await api<{ user: User }>('auth.php?a=password', { current: v.current, next: v.next });
      setV({ current: '', next: '', confirm: '' });
      setMsg({ ok: true, text: 'Your password has been changed.' });
      onDone?.(r.user);
    } catch (err) { setMsg({ text: errText(err, onAuthLost) }); } finally { setBusy(false); }
  };
  return (
    <form className="sh-cf sh-po-form" onSubmit={submit} noValidate>
      <Field id="pw-cur" label="Current password" type="password" value={v.current} onChange={set('current')} required autoComplete="current-password" />
      <div className="row">
        <Field id="pw-new" label="New password" type="password" value={v.next} onChange={set('next')} required autoComplete="new-password" />
        <Field id="pw-new2" label="Confirm new password" type="password" value={v.confirm} onChange={set('confirm')} required autoComplete="new-password" />
      </div>
      <p className="sh-po-muted">At least 10 characters, with letters and numbers.</p>
      <Submit busy={busy}>Change Password</Submit>
      <Msg ok={msg.ok} text={msg.text} />
    </form>
  );
}

/* ------------------------------------------------------------------ contractor */
const EMPTY = { business_name: '', contact_name: '', email: '', phone: '', trade: '', licence_no: '', abn: '', insurance_expiry: '', status: 'active', notes: '' };
type Form = typeof EMPTY;
const toForm = (c: Contractor): Form => ({
  business_name: c.business_name, contact_name: c.contact_name, email: c.email, phone: c.phone, trade: c.trade,
  licence_no: c.licence_no, abn: c.abn, insurance_expiry: c.insurance_expiry || '', status: c.status, notes: c.notes || '',
});

function Tabs<T extends string>({ tabs, value, onChange }: { tabs: [T, string][]; value: T; onChange: (t: T) => void }) {
  return (
    <div className="sh-po-tabs" role="tablist">
      {tabs.map(([k, l]) => (
        <button key={k} type="button" role="tab" aria-selected={value === k} className={value === k ? 'on' : ''} onClick={() => onChange(k)}>{l}</button>
      ))}
    </div>
  );
}

function ContractorHome({ user, onLogout, onAuthLost }: { user: User; onLogout: () => void; onAuthLost: () => void }) {
  const [tab, setTab] = useState<'profile' | 'edit' | 'password'>('profile');
  const [c, setC] = useState<Contractor | null>(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    api<{ contractor: Contractor }>('me.php').then((r) => setC(r.contractor)).catch((e) => setErr(errText(e, onAuthLost)));
  }, [onAuthLost]);
  return (
    <div className="sh-po-card">
      <Bar user={user} onLogout={onLogout} />
      <h2 className="sh-po-h">Welcome{c ? ', ' + c.contact_name : ''}</h2>
      <Tabs tabs={[['profile', 'My Details'], ['edit', 'Edit Details'], ['password', 'Change Password']]} value={tab} onChange={setTab} />
      {err ? <Msg text={err} /> : null}
      {!c && !err ? <p className="sh-po-muted">Loading…</p> : null}
      {c && tab === 'profile' ? <Details c={c} /> : null}
      {c && tab === 'edit' ? <Editor initial={toForm(c)} admin={false} onSaved={(n) => { setC(n); setTab('profile'); }} save={(f) => api<{ contractor: Contractor }>('me.php', f).then((r) => r.contractor)} onAuthLost={onAuthLost} /> : null}
      {tab === 'password' ? <ChangePassword onAuthLost={onAuthLost} /> : null}
    </div>
  );
}

function Details({ c, admin }: { c: Contractor; admin?: boolean }) {
  const ins = insuranceState(c.insurance_expiry);
  const rows: [string, React.ReactNode][] = [
    ['Business name', c.business_name], ['Contact name', c.contact_name], ['Email', c.email], ['Phone', c.phone || '—'],
    ['Trade', c.trade || '—'], ['Licence no.', c.licence_no || '—'], ['ABN', c.abn || '—'],
    ['Insurance expiry', <span key="i" className={'sh-po-pill ' + ins}>{fmtDate(c.insurance_expiry)}{ins === 'expired' ? ' · expired' : ins === 'soon' ? ' · expires soon' : ''}</span>],
    ['Status', <span key="s" className={'sh-po-pill ' + (c.status === 'active' ? 'ok' : 'expired')}>{c.status === 'active' ? 'Active' : 'Inactive'}</span>],
  ];
  if (admin) {
    rows.push(['Notes', c.notes || '—']);
    rows.push(['Last sign-in', c.login ? fmtDate(c.login.last_login_at, true) : 'No login']);
  }
  rows.push(['Created', fmtDate(c.created_at, true)], ['Updated', fmtDate(c.updated_at, true)]);
  return (
    <dl className="sh-po-dl">
      {rows.map(([k, val]) => (<div key={k}><dt>{k}</dt><dd>{val}</dd></div>))}
    </dl>
  );
}

function Editor({ initial, admin, save, onSaved, onCancel, onAuthLost, submitLabel = 'Save Details' }: {
  initial: Form; admin: boolean; save: (f: Form) => Promise<Contractor>; onSaved: (c: Contractor) => void; onCancel?: () => void; onAuthLost: () => void; submitLabel?: string; }) {
  const { v, set } = useForm(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok?: boolean; text: string }>({ text: '' });
  const [fe, setFe] = useState<Record<string, string>>({});
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg({ text: '' }); setFe({});
    try {
      const c = await save(v);
      setMsg({ ok: true, text: 'Saved.' });
      onSaved(c);
    } catch (err) {
      if (err instanceof ApiError && err.fields) setFe(err.fields);
      setMsg({ text: errText(err, onAuthLost) });
    } finally { setBusy(false); }
  };
  return (
    <form className="sh-cf sh-po-form" onSubmit={submit} noValidate>
      <div className="row">
        <Field id="c-bn" label="Business name" value={v.business_name} onChange={set('business_name')} error={fe.business_name} required />
        <Field id="c-cn" label="Contact name" value={v.contact_name} onChange={set('contact_name')} error={fe.contact_name} required autoComplete="name" />
      </div>
      <div className="row">
        {admin
          ? <Field id="c-em" label="Email (login)" type="email" value={v.email} onChange={set('email')} error={fe.email} required />
          : <Field id="c-em" label="Email (login)" type="email" value={v.email} onChange={() => {}} disabled />}
        <Field id="c-ph" label="Phone" type="tel" value={v.phone} onChange={set('phone')} error={fe.phone} autoComplete="tel" />
      </div>
      <div className="row">
        <Field id="c-tr" label="Trade" value={v.trade} onChange={set('trade')} error={fe.trade} placeholder="e.g. Electrician" />
        <Field id="c-li" label="Licence no." value={v.licence_no} onChange={set('licence_no')} error={fe.licence_no} />
      </div>
      <div className="row">
        <Field id="c-abn" label="ABN" value={v.abn} onChange={set('abn')} error={fe.abn} placeholder="11 digits" />
        <Field id="c-ins" label="Insurance expiry" type="date" value={v.insurance_expiry} onChange={set('insurance_expiry')} error={fe.insurance_expiry} />
      </div>
      {admin ? (
        <>
          <div className="sh-in">
            <label htmlFor="c-st">Status</label>
            <select id="c-st" value={v.status} onChange={(e) => set('status')(e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <Field id="c-no" label="Notes (staff only)" as="textarea" value={v.notes} onChange={set('notes')} error={fe.notes} />
        </>
      ) : <p className="sh-po-muted">To change your login email, call us on 1800 727 538.</p>}
      <div className="sh-po-actions">
        <Submit busy={busy}>{submitLabel}</Submit>
        {onCancel ? <button type="button" className="sh-btn d" onClick={onCancel}>Cancel</button> : null}
      </div>
      <Msg ok={msg.ok} text={msg.text} />
    </form>
  );
}

/* ------------------------------------------------------------------ admin */
function Admin({ user, onLogout, onAuthLost }: { user: User; onLogout: () => void; onAuthLost: () => void }) {
  const [tab, setTab] = useState<'contractors' | 'enquiries' | 'password'>('contractors');
  return (
    <div className="sh-po-card">
      <Bar user={user} onLogout={onLogout} />
      <h2 className="sh-po-h">Admin</h2>
      <Tabs tabs={[['contractors', 'Contractors'], ['enquiries', 'Enquiries'], ['password', 'Change Password']]} value={tab} onChange={setTab} />
      {tab === 'contractors' ? <Contractors onAuthLost={onAuthLost} /> : null}
      {tab === 'enquiries' ? <Enquiries onAuthLost={onAuthLost} /> : null}
      {tab === 'password' ? <ChangePassword onAuthLost={onAuthLost} /> : null}
    </div>
  );
}

function Pager({ p, onPage }: { p: Page<unknown>; onPage: (n: number) => void }) {
  const pages = Math.max(1, Math.ceil(p.total / p.per_page));
  if (pages < 2) return null;
  return (
    <div className="sh-po-pager">
      <button type="button" className="sh-po-link" disabled={p.page <= 1} onClick={() => onPage(p.page - 1)}>← Previous</button>
      <span>Page {p.page} of {pages}</span>
      <button type="button" className="sh-po-link" disabled={p.page >= pages} onClick={() => onPage(p.page + 1)}>Next →</button>
    </div>
  );
}

function Contractors({ onAuthLost }: { onAuthLost: () => void }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Page<Contractor> | null>(null);
  const [err, setErr] = useState('');
  const [mode, setMode] = useState<{ k: 'list' } | { k: 'new' } | { k: 'view'; id: number } | { k: 'edit'; c: Contractor }>({ k: 'list' });

  const fetchList = useCallback(() => {
    const qs = new URLSearchParams({ a: 'contractors', q, status, page: String(page) });
    api<Page<Contractor>>('admin.php?' + qs).then((r) => { setList(r); setErr(''); }).catch((e) => setErr(errText(e, onAuthLost)));
  }, [q, status, page, onAuthLost]);
  useEffect(() => { const t = setTimeout(fetchList, q ? 250 : 0); return () => clearTimeout(t); }, [fetchList, q]);

  if (mode.k === 'new') {
    return <NewContractor onAuthLost={onAuthLost} onDone={(id) => { fetchList(); setMode(id ? { k: 'view', id } : { k: 'list' }); }} />;
  }
  if (mode.k === 'view') {
    return <ContractorAdmin id={mode.id} onAuthLost={onAuthLost} onBack={() => { fetchList(); setMode({ k: 'list' }); }} onEdit={(c) => setMode({ k: 'edit', c })} />;
  }
  if (mode.k === 'edit') {
    const id = mode.c.id;
    return (
      <>
        <h3 className="sh-po-h3">Edit {mode.c.business_name}</h3>
        <Editor initial={toForm(mode.c)} admin onAuthLost={onAuthLost} onCancel={() => setMode({ k: 'view', id })}
          save={(f) => api<{ contractor: Contractor }>('admin.php?a=update&id=' + id, f).then((r) => r.contractor)}
          onSaved={() => setMode({ k: 'view', id })} />
      </>
    );
  }
  return (
    <>
      <div className="sh-po-tools">
        <div className="sh-in">
          <label htmlFor="po-q">Search</label>
          <input id="po-q" type="search" value={q} placeholder="Name, email, trade, licence, ABN…" onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        </div>
        <div className="sh-in">
          <label htmlFor="po-s">Status</label>
          <select id="po-s" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All</option><option value="active">Active</option><option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="button" className="sh-btn p" onClick={() => setMode({ k: 'new' })}>Add Contractor</button>
      </div>
      {err ? <Msg text={err} /> : null}
      {list ? (
        <>
          <p className="sh-po-muted">{list.total} contractor{list.total === 1 ? '' : 's'}</p>
          <div className="sh-po-table" role="region" aria-label="Contractors" tabIndex={0}>
            <table>
              <thead><tr><th>Business</th><th>Contact</th><th>Trade</th><th>Insurance</th><th>Status</th><th><span className="sh-po-sr">Actions</span></th></tr></thead>
              <tbody>
                {list.items.length === 0 ? <tr><td colSpan={6}>No contractors found.</td></tr> : null}
                {list.items.map((c) => {
                  const ins = insuranceState(c.insurance_expiry);
                  return (
                    <tr key={c.id}>
                      <td><b>{c.business_name}</b><small>{c.email}</small></td>
                      <td>{c.contact_name}<small>{c.phone}</small></td>
                      <td>{c.trade || '—'}</td>
                      <td><span className={'sh-po-pill ' + ins}>{fmtDate(c.insurance_expiry)}</span></td>
                      <td><span className={'sh-po-pill ' + (c.status === 'active' ? 'ok' : 'expired')}>{c.status === 'active' ? 'Active' : 'Inactive'}</span></td>
                      <td><button type="button" className="sh-po-link" onClick={() => setMode({ k: 'view', id: c.id })}>Open</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pager p={list} onPage={setPage} />
        </>
      ) : !err ? <p className="sh-po-muted">Loading…</p> : null}
    </>
  );
}

function TempPassword({ email, pw }: { email: string; pw: string }) {
  return (
    <div className="sh-po-temp" role="alert">
      <b>Temporary password for {email}</b>
      <code>{pw}</code>
      <small>Shown once. Send it to the contractor securely; they must choose a new password when they first sign in.</small>
    </div>
  );
}

function NewContractor({ onDone, onAuthLost }: { onDone: (id?: number) => void; onAuthLost: () => void }) {
  const [created, setCreated] = useState<{ c: Contractor; pw: string } | null>(null);
  if (created) {
    return (
      <>
        <h3 className="sh-po-h3">Contractor added</h3>
        <TempPassword email={created.c.email} pw={created.pw} />
        <div className="sh-po-actions"><button type="button" className="sh-btn p" onClick={() => onDone(created.c.id)}>Open Contractor</button></div>
      </>
    );
  }
  return (
    <>
      <h3 className="sh-po-h3">Add contractor</h3>
      <Editor initial={EMPTY} admin onAuthLost={onAuthLost} submitLabel="Add Contractor" onCancel={() => onDone()}
        save={async (f) => { const r = await api<{ contractor: Contractor; temp_password: string }>('admin.php?a=create', f); setCreated({ c: r.contractor, pw: r.temp_password }); return r.contractor; }}
        onSaved={() => {}} />
    </>
  );
}

function ContractorAdmin({ id, onBack, onEdit, onAuthLost }: { id: number; onBack: () => void; onEdit: (c: Contractor) => void; onAuthLost: () => void }) {
  const [c, setC] = useState<Contractor | null>(null);
  const [msg, setMsg] = useState<{ ok?: boolean; text: string }>({ text: '' });
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    api<{ contractor: Contractor }>('admin.php?a=contractor&id=' + id).then((r) => setC(r.contractor)).catch((e) => setMsg({ text: errText(e, onAuthLost) }));
  }, [id, onAuthLost]);
  const act = async (fn: () => Promise<void>) => {
    setBusy(true); setMsg({ text: '' });
    try { await fn(); } catch (e) { setMsg({ text: errText(e, onAuthLost) }); } finally { setBusy(false); }
  };
  const toggle = () => act(async () => {
    if (!c) return;
    const next = c.status === 'active' ? 'inactive' : 'active';
    if (next === 'inactive' && !window.confirm(`Deactivate ${c.business_name}? Their login will stop working.`)) return;
    const r = await api<{ contractor: Contractor }>('admin.php?a=set_status&id=' + id, { status: next });
    setC(r.contractor);
    setMsg({ ok: true, text: next === 'active' ? 'Contractor activated.' : 'Contractor deactivated.' });
  });
  const reset = () => act(async () => {
    if (!c || !window.confirm(`Reset the password for ${c.email}? Their current password will stop working.`)) return;
    const r = await api<{ temp_password: string }>('admin.php?a=reset_password&id=' + id, {});
    setPw(r.temp_password);
  });
  return (
    <>
      <button type="button" className="sh-po-link sh-po-back" onClick={onBack}>← All contractors</button>
      {c ? (
        <>
          <h3 className="sh-po-h3">{c.business_name}</h3>
          {pw ? <TempPassword email={c.email} pw={pw} /> : null}
          <Details c={c} admin />
          <div className="sh-po-actions">
            <button type="button" className="sh-btn p" onClick={() => onEdit(c)} disabled={busy}>Edit</button>
            <button type="button" className="sh-btn d" onClick={toggle} disabled={busy}>{c.status === 'active' ? 'Deactivate' : 'Activate'}</button>
            <button type="button" className="sh-btn d" onClick={reset} disabled={busy}>Reset Password</button>
          </div>
        </>
      ) : !msg.text ? <p className="sh-po-muted">Loading…</p> : null}
      <Msg ok={msg.ok} text={msg.text} />
    </>
  );
}

function Enquiries({ onAuthLost }: { onAuthLost: () => void }) {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Page<Enquiry> | null>(null);
  const [err, setErr] = useState('');
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const t = setTimeout(() => {
      const qs = new URLSearchParams({ a: 'enquiries', q, page: String(page) });
      api<Page<Enquiry>>('admin.php?' + qs).then((r) => { setList(r); setErr(''); }).catch((e) => setErr(errText(e, onAuthLost)));
    }, q ? 250 : 0);
    return () => clearTimeout(t);
  }, [q, page, onAuthLost]);
  return (
    <>
      <div className="sh-po-tools">
        <div className="sh-in">
          <label htmlFor="po-eq">Search</label>
          <input id="po-eq" type="search" value={q} placeholder="Name, email, phone, suburb…" onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        </div>
      </div>
      {err ? <Msg text={err} /> : null}
      {list ? (
        <>
          <p className="sh-po-muted">{list.total} enquir{list.total === 1 ? 'y' : 'ies'}</p>
          <div className="sh-po-table" role="region" aria-label="Enquiries" tabIndex={0}>
            <table>
              <thead><tr><th>Received</th><th>Name</th><th>Contact</th><th>Build</th><th>Email sent</th><th><span className="sh-po-sr">Message</span></th></tr></thead>
              <tbody>
                {list.items.length === 0 ? <tr><td colSpan={6}>No enquiries found.</td></tr> : null}
                {list.items.map((e) => (
                  <Fragment key={e.id}>
                    <tr>
                      <td>{fmtDate(e.created_at, true)}</td>
                      <td><b>{e.name}</b><small>{e.suburb}</small></td>
                      <td><a href={'mailto:' + e.email}>{e.email}</a><small><a href={'tel:' + e.phone.replace(/[^0-9+]/g, '')}>{e.phone}</a></small></td>
                      <td>{e.service || '—'}</td>
                      <td><span className={'sh-po-pill ' + (e.mail_status === 'sent' ? 'ok' : e.mail_status === 'failed' ? 'expired' : 'none')}>{e.mail_status}</span></td>
                      <td><button type="button" className="sh-po-link" aria-expanded={open === e.id} onClick={() => setOpen(open === e.id ? null : e.id)}>{open === e.id ? 'Hide' : 'Message'}</button></td>
                    </tr>
                    {open === e.id ? <tr className="sh-po-msgrow"><td colSpan={6}>{e.message || '(no message)'}<small>Page: {e.page_url || '—'}</small></td></tr> : null}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <Pager p={list} onPage={setPage} />
        </>
      ) : !err ? <p className="sh-po-muted">Loading…</p> : null}
    </>
  );
}
