'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, ApiError, setCsrf } from './api';
import type { Profile, User } from './types';
import { Field, Msg, ROLE_LABEL, Submit, useForm } from './ui';
import Projects from './Projects';
import AttendanceList from './Attendance';
import Users from './Users';
import Enquiries from './Enquiries';

type Session = { user: User | null; csrf: string };
export type Ctx = { user: User; onAuthLost: () => void };

export default function Portal() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [fatal, setFatal] = useState('');

  const load = useCallback(async () => {
    try {
      const s = await api<Session>('auth.php?a=session');
      setCsrf(s.csrf);
      setUser(s.user);
      setFatal('');
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
  const onAuthLost = useCallback(() => { setUser(null); load(); }, [load]);

  if (!ready) return <div className="sh-po-card sh-po-narrow" aria-busy="true"><p className="sh-po-muted">Loading…</p></div>;
  if (fatal && !user) return <div className="sh-po-card sh-po-narrow"><Msg text={fatal} /></div>;
  if (!user) return <Login onDone={setUser} />;
  if (user.must_change_password) {
    return (
      <div className="sh-po-card sh-po-narrow">
        <Bar user={user} onLogout={logout} />
        <h2 className="sh-po-h">Set a new password</h2>
        <p className="sh-po-muted">You signed in with a temporary password. Choose your own password to continue.</p>
        <ChangePassword onDone={setUser} onAuthLost={onAuthLost} />
      </div>
    );
  }
  return <Home user={user} onLogout={logout} onAuthLost={onAuthLost} onUser={setUser} />;
}

type TabKey = 'jobs' | 'projects' | 'attendance' | 'users' | 'enquiries' | 'details' | 'password';

function Home({ user, onLogout, onAuthLost, onUser }: { user: User; onLogout: () => void; onAuthLost: () => void; onUser: (u: User) => void }) {
  const staff = user.role !== 'user';
  const tabs: [TabKey, string][] = staff
    ? [['projects', 'Projects'], ['attendance', 'Attendance'], ...(user.role === 'admin' ? ([['users', 'Users'], ['enquiries', 'Enquiries']] as [TabKey, string][]) : []), ['details', 'My Details'], ['password', 'Change Password']]
    : [['jobs', 'My Jobs'], ['attendance', 'Attendance'], ['details', 'My Details'], ['password', 'Change Password']];
  const [tab, setTab] = useState<TabKey>(tabs[0][0]);
  const ctx: Ctx = { user, onAuthLost };
  return (
    <div className="sh-po-card">
      <Bar user={user} onLogout={onLogout} />
      <h2 className="sh-po-h">{staff ? ROLE_LABEL[user.role] : 'Welcome, ' + user.name.split(' ')[0]}</h2>
      <Tabs tabs={tabs} value={tab} onChange={setTab} />
      {tab === 'jobs' || tab === 'projects' ? <Projects ctx={ctx} /> : null}
      {tab === 'attendance' ? <AttendanceList ctx={ctx} /> : null}
      {tab === 'users' ? <Users ctx={ctx} /> : null}
      {tab === 'enquiries' ? <Enquiries ctx={ctx} /> : null}
      {tab === 'details' ? <MyDetails ctx={ctx} onUser={onUser} /> : null}
      {tab === 'password' ? <ChangePassword onAuthLost={onAuthLost} /> : null}
    </div>
  );
}

export function Bar({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <div className="sh-po-bar">
      <span>Signed in as <b>{user.name || user.email}</b> · {ROLE_LABEL[user.role]}</span>
      <button type="button" className="sh-po-link" onClick={onLogout}>Sign out</button>
    </div>
  );
}

export function Tabs<T extends string>({ tabs, value, onChange }: { tabs: [T, string][]; value: T; onChange: (t: T) => void }) {
  return (
    <div className="sh-po-tabs" role="tablist">
      {tabs.map(([k, l]) => (
        <button key={k} type="button" role="tab" aria-selected={value === k} className={value === k ? 'on' : ''} onClick={() => onChange(k)}>{l}</button>
      ))}
    </div>
  );
}

export function Pager({ p, onPage }: { p: { total: number; page: number; per_page: number }; onPage: (n: number) => void }) {
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

export function errText(e: unknown, onAuthLost?: () => void) {
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
      <p>Sign in with the email address registered with Scarlet Homes.</p>
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

/* ------------------------------------------------------------------ own details */
function MyDetails({ ctx, onUser }: { ctx: Ctx; onUser: (u: User) => void }) {
  const contractor = ctx.user.role === 'user';
  const { v, setV, set } = useForm({ name: ctx.user.name, business_name: '', phone: '', trade: '', licence_no: '', abn: '', insurance_expiry: '' });
  const [loaded, setLoaded] = useState(!contractor);
  const [busy, setBusy] = useState(false);
  const [fe, setFe] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<{ ok?: boolean; text: string }>({ text: '' });
  const { onAuthLost } = ctx;
  useEffect(() => {
    if (!contractor) return;
    api<{ profile: Profile }>('me.php').then((r) => {
      const p = r.profile;
      setV((s) => ({ ...s, business_name: p.business_name, phone: p.phone, trade: p.trade, licence_no: p.licence_no, abn: p.abn, insurance_expiry: p.insurance_expiry || '' }));
      setLoaded(true);
    }).catch((e) => setMsg({ text: errText(e, onAuthLost) }));
  }, [contractor, setV, onAuthLost]);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg({ text: '' }); setFe({});
    try {
      const r = await api<{ user: User }>('me.php', v);
      onUser(r.user);
      setMsg({ ok: true, text: 'Saved.' });
    } catch (err) {
      if (err instanceof ApiError && err.fields) setFe(err.fields);
      setMsg({ text: errText(err, onAuthLost) });
    } finally { setBusy(false); }
  };
  if (!loaded) return msg.text ? <Msg text={msg.text} /> : <p className="sh-po-muted">Loading…</p>;
  return (
    <form className="sh-cf sh-po-form" onSubmit={submit} noValidate>
      <div className="row">
        <Field id="me-n" label="Your name" value={v.name} onChange={set('name')} error={fe.name} required autoComplete="name" />
        <Field id="me-e" label="Email (login)" type="email" value={ctx.user.email} onChange={() => {}} disabled />
      </div>
      {contractor ? (
        <>
          <div className="row">
            <Field id="me-b" label="Business name" value={v.business_name} onChange={set('business_name')} error={fe.business_name} />
            <Field id="me-p" label="Phone" type="tel" value={v.phone} onChange={set('phone')} error={fe.phone} autoComplete="tel" />
          </div>
          <div className="row">
            <Field id="me-t" label="Trade" value={v.trade} onChange={set('trade')} error={fe.trade} placeholder="e.g. Electrician" />
            <Field id="me-l" label="Licence no." value={v.licence_no} onChange={set('licence_no')} error={fe.licence_no} />
          </div>
          <div className="row">
            <Field id="me-a" label="ABN" value={v.abn} onChange={set('abn')} error={fe.abn} placeholder="11 digits" />
            <Field id="me-i" label="Insurance expiry" type="date" value={v.insurance_expiry} onChange={set('insurance_expiry')} error={fe.insurance_expiry} />
          </div>
        </>
      ) : null}
      <p className="sh-po-muted">To change your login email, ask an administrator.</p>
      <Submit busy={busy}>Save Details</Submit>
      <Msg ok={msg.ok} text={msg.text} />
    </form>
  );
}
