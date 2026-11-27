'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from './api';
import type { Page, Profile, Role, UserFull, UserRow } from './types';
import { Field, Msg, ROLE_LABEL, STATUS_LABEL, STATUS_PILL, Submit, fmtDate, fmtDateTime, insuranceState, useForm } from './ui';
import { errText, Pager, type Ctx } from './Portal';

const EMPTY = { name: '', email: '', role: 'user', status: '1', business_name: '', phone: '', trade: '', licence_no: '', abn: '', insurance_expiry: '', notes: '' };
type Form = typeof EMPTY;
type Detail = { user: UserFull; profile: Profile; projects: { id: number; title: string; project_status: number; status: string; booked_on: string | null; worked_on: string | null; completed_on: string | null }[] };

/** Users (admin only): contractors, supervisors and admins. */
export default function Users({ ctx }: { ctx: Ctx }) {
  const [q, setQ] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Page<UserRow> | null>(null);
  const [err, setErr] = useState('');
  const [mode, setMode] = useState<{ k: 'list' } | { k: 'new' } | { k: 'view'; id: number }>({ k: 'list' });
  const { onAuthLost } = ctx;
  const fetchList = useCallback(() => {
    const qs = new URLSearchParams({ a: 'list', q, role, status, page: String(page) });
    api<Page<UserRow>>('users.php?' + qs).then((r) => { setList(r); setErr(''); }).catch((e) => setErr(errText(e, onAuthLost)));
  }, [q, role, status, page, onAuthLost]);
  useEffect(() => { if (mode.k !== 'list') return; const t = setTimeout(fetchList, q ? 250 : 0); return () => clearTimeout(t); }, [fetchList, q, mode.k]);

  if (mode.k === 'new') return <NewUser ctx={ctx} onDone={(id) => setMode(id ? { k: 'view', id } : { k: 'list' })} />;
  if (mode.k === 'view') return <UserView ctx={ctx} id={mode.id} onBack={() => setMode({ k: 'list' })} />;

  return (
    <>
      <div className="sh-po-tools">
        <div className="sh-in">
          <label htmlFor="us-q">Search</label>
          <input id="us-q" type="search" value={q} placeholder="Name, email, business, trade, ABN…" onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        </div>
        <div className="sh-in">
          <label htmlFor="us-r">Role</label>
          <select id="us-r" value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }}>
            <option value="">All</option><option value="user">Contractors</option><option value="supervisor">Supervisors</option><option value="admin">Admins</option>
          </select>
        </div>
        <div className="sh-in">
          <label htmlFor="us-s">Status</label>
          <select id="us-s" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All</option><option value="1">Active</option><option value="0">Inactive</option>
          </select>
        </div>
        <button type="button" className="sh-btn p" onClick={() => setMode({ k: 'new' })}>Add User</button>
      </div>
      {err ? <Msg text={err} /> : null}
      {list ? (
        <>
          <p className="sh-po-muted">{list.total} user{list.total === 1 ? '' : 's'}</p>
          <div className="sh-po-table" role="region" aria-label="Users" tabIndex={0}>
            <table>
              <thead><tr><th>Name</th><th>Role</th><th>Business / trade</th><th>Insurance</th><th>Jobs</th><th>Status</th><th><span className="sh-po-sr">Open</span></th></tr></thead>
              <tbody>
                {list.items.length === 0 ? <tr><td colSpan={7}>No users found.</td></tr> : null}
                {list.items.map((u) => (
                  <tr key={u.id}>
                    <td><b>{u.name}</b><small>{u.email}</small></td>
                    <td>{ROLE_LABEL[u.role]}</td>
                    <td>{u.business_name || '—'}<small>{u.trade}</small></td>
                    <td>{u.role === 'user' ? <span className={'sh-po-pill ' + insuranceState(u.insurance_expiry)}>{fmtDate(u.insurance_expiry)}</span> : '—'}</td>
                    <td>{u.projects}</td>
                    <td><span className={'sh-po-pill ' + (u.status ? 'ok' : 'expired')}>{u.status ? 'Active' : 'Inactive'}</span></td>
                    <td><button type="button" className="sh-po-link" onClick={() => setMode({ k: 'view', id: u.id })}>Open</button></td>
                  </tr>
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

function UserForm({ ctx, initial, submitLabel, save, onCancel }: { ctx: Ctx; initial: Form; submitLabel: string; save: (f: Form) => Promise<void>; onCancel: () => void }) {
  const { v, set } = useForm(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok?: boolean; text: string }>({ text: '' });
  const [fe, setFe] = useState<Record<string, string>>({});
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg({ text: '' }); setFe({});
    try { await save(v); } catch (err) {
      if (err instanceof ApiError && err.fields) setFe(err.fields);
      setMsg({ text: errText(err, ctx.onAuthLost) });
    } finally { setBusy(false); }
  };
  const contractor = v.role === 'user';
  return (
    <form className="sh-cf sh-po-form" onSubmit={submit} noValidate>
      <div className="row">
        <Field id="uf-n" label="Name" value={v.name} onChange={set('name')} error={fe.name} required />
        <Field id="uf-e" label="Email (login)" type="email" value={v.email} onChange={set('email')} error={fe.email} required />
      </div>
      <div className="row">
        <Field id="uf-r" label="Role" as="select" value={v.role} onChange={set('role')} error={fe.role}>
          <option value="user">Contractor</option><option value="supervisor">Supervisor</option><option value="admin">Admin</option>
        </Field>
        <Field id="uf-s" label="Status" as="select" value={v.status} onChange={set('status')}>
          <option value="1">Active</option><option value="0">Inactive (cannot sign in)</option>
        </Field>
      </div>
      {contractor ? (
        <>
          <div className="row">
            <Field id="uf-b" label="Business name" value={v.business_name} onChange={set('business_name')} error={fe.business_name} />
            <Field id="uf-p" label="Phone" type="tel" value={v.phone} onChange={set('phone')} error={fe.phone} />
          </div>
          <div className="row">
            <Field id="uf-t" label="Trade" value={v.trade} onChange={set('trade')} placeholder="e.g. Electrician" />
            <Field id="uf-l" label="Licence no." value={v.licence_no} onChange={set('licence_no')} />
          </div>
          <div className="row">
            <Field id="uf-a" label="ABN" value={v.abn} onChange={set('abn')} error={fe.abn} placeholder="11 digits" />
            <Field id="uf-i" label="Insurance expiry" type="date" value={v.insurance_expiry} onChange={set('insurance_expiry')} error={fe.insurance_expiry} />
          </div>
        </>
      ) : null}
      <Field id="uf-no" label="Notes (staff only)" as="textarea" value={v.notes} onChange={set('notes')} />
      <div className="sh-po-actions">
        <Submit busy={busy}>{submitLabel}</Submit>
        <button type="button" className="sh-btn d" onClick={onCancel}>Cancel</button>
      </div>
      <Msg ok={msg.ok} text={msg.text} />
    </form>
  );
}

function TempPassword({ email, pw }: { email: string; pw: string }) {
  return (
    <div className="sh-po-temp" role="alert">
      <b>Temporary password for {email}</b>
      <code>{pw}</code>
      <small>Shown once. Send it securely; they must choose a new password when they first sign in.</small>
    </div>
  );
}

function NewUser({ ctx, onDone }: { ctx: Ctx; onDone: (id?: number) => void }) {
  const [created, setCreated] = useState<{ id: number; email: string; pw: string } | null>(null);
  if (created) {
    return (
      <>
        <h3 className="sh-po-h3">User added</h3>
        <TempPassword email={created.email} pw={created.pw} />
        <div className="sh-po-actions"><button type="button" className="sh-btn p" onClick={() => onDone(created.id)}>Open User</button></div>
      </>
    );
  }
  return (
    <>
      <button type="button" className="sh-po-link sh-po-back" onClick={() => onDone()}>← All users</button>
      <h3 className="sh-po-h3">Add user</h3>
      <UserForm ctx={ctx} initial={EMPTY} submitLabel="Add User" onCancel={() => onDone()}
        save={async (f) => { const r = await api<{ user: UserFull; temp_password: string }>('users.php?a=create', f); setCreated({ id: r.user.id, email: r.user.email, pw: r.temp_password }); }} />
    </>
  );
}

function UserView({ ctx, id, onBack }: { ctx: Ctx; id: number; onBack: () => void }) {
  const [d, setD] = useState<Detail | null>(null);
  const [editing, setEditing] = useState(false);
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState<{ ok?: boolean; text: string }>({ text: '' });
  const { onAuthLost } = ctx;
  const load = useCallback(() => {
    api<Detail>('users.php?a=get&id=' + id).then(setD).catch((e) => setMsg({ text: errText(e, onAuthLost) }));
  }, [id, onAuthLost]);
  useEffect(load, [load]);
  const reset = async () => {
    if (!d || !window.confirm(`Reset the password for ${d.user.email}? Their current password will stop working.`)) return;
    try { const r = await api<{ temp_password: string }>('users.php?a=reset_password&id=' + id, {}); setPw(r.temp_password); } catch (e) { setMsg({ text: errText(e, onAuthLost) }); }
  };
  if (!d) return <><button type="button" className="sh-po-link sh-po-back" onClick={onBack}>← All users</button>{msg.text ? <Msg text={msg.text} /> : <p className="sh-po-muted">Loading…</p>}</>;
  const u = d.user, p = d.profile;
  const form: Form = { name: u.name, email: u.email, role: u.role, status: String(u.status), business_name: p.business_name, phone: p.phone, trade: p.trade, licence_no: p.licence_no, abn: p.abn, insurance_expiry: p.insurance_expiry || '', notes: p.notes || '' };
  const ins = insuranceState(p.insurance_expiry);
  const rows: [string, React.ReactNode][] = [
    ['Name', u.name], ['Email (login)', u.email], ['Role', ROLE_LABEL[u.role as Role]],
    ['Status', <span key="s" className={'sh-po-pill ' + (u.status ? 'ok' : 'expired')}>{u.status ? 'Active' : 'Inactive'}</span>],
    ...(u.role === 'user' ? ([
      ['Business name', p.business_name || '—'], ['Phone', p.phone || '—'], ['Trade', p.trade || '—'], ['Licence no.', p.licence_no || '—'], ['ABN', p.abn || '—'],
      ['Insurance expiry', <span key="i" className={'sh-po-pill ' + ins}>{fmtDate(p.insurance_expiry)}{ins === 'expired' ? ' · expired' : ins === 'soon' ? ' · expires soon' : ''}</span>],
    ] as [string, React.ReactNode][]) : []),
    ['Notes', p.notes || '—'], ['Last sign-in', fmtDateTime(u.last_login_at)], ['Created', fmtDateTime(u.created_at)],
  ];
  return (
    <>
      <button type="button" className="sh-po-link sh-po-back" onClick={onBack}>← All users</button>
      <h3 className="sh-po-h3">{u.name}</h3>
      {pw ? <TempPassword email={u.email} pw={pw} /> : null}
      {editing ? (
        <UserForm ctx={ctx} initial={form} submitLabel="Save User" onCancel={() => setEditing(false)}
          save={async (f) => { await api('users.php?a=update&id=' + id, f); setEditing(false); setMsg({ ok: true, text: 'Saved.' }); load(); }} />
      ) : (
        <>
          <dl className="sh-po-dl">{rows.map(([k, val]) => (<div key={k}><dt>{k}</dt><dd>{val}</dd></div>))}</dl>
          <div className="sh-po-actions">
            <button type="button" className="sh-btn p" onClick={() => setEditing(true)}>Edit</button>
            {u.id !== ctx.user.id ? <button type="button" className="sh-btn d" onClick={reset}>Reset Password</button> : null}
          </div>
          <Msg ok={msg.ok} text={msg.text} />
          {u.role === 'user' ? (
            <>
              <h4 className="sh-po-h4">Jobs</h4>
              {d.projects.length ? (
                <div className="sh-po-table" role="region" aria-label="Jobs" tabIndex={0}>
                  <table>
                    <thead><tr><th>Project</th><th>Status</th><th>Booked</th><th>Started</th><th>Completed</th></tr></thead>
                    <tbody>
                      {d.projects.map((j) => (
                        <tr key={j.id}>
                          <td><b>{j.title}</b>{j.project_status ? null : <small>Archived</small>}</td>
                          <td><span className={'sh-po-pill ' + STATUS_PILL[j.status]}>{STATUS_LABEL[j.status]}</span></td>
                          <td>{fmtDate(j.booked_on)}</td><td>{fmtDate(j.worked_on)}</td><td>{fmtDate(j.completed_on)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <p className="sh-po-muted">No jobs assigned.</p>}
            </>
          ) : null}
        </>
      )}
    </>
  );
}
