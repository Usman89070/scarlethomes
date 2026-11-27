'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { api, ApiError, fileUrl } from './api';
import type { Assignment, Page, PivotStatus, ProjectDetail, ProjectRow } from './types';
import { Field, Msg, STATUS_LABEL, STATUS_PILL, Submit, fmtDate, fmtDateTime, plainText, useForm } from './ui';
import { errText, Pager, type Ctx } from './Portal';
import { CheckPanel } from './Attendance';

export default function Projects({ ctx }: { ctx: Ctx }) {
  const staff = ctx.user.role !== 'user';
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(staff ? '1' : '');
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Page<ProjectRow> | null>(null);
  const [err, setErr] = useState('');
  const [view, setView] = useState<{ k: 'list' } | { k: 'new' } | { k: 'view'; id: number }>({ k: 'list' });
  const { onAuthLost } = ctx;

  const fetchList = useCallback(() => {
    const qs = new URLSearchParams({ a: 'list', q, status, page: String(page) });
    api<Page<ProjectRow>>('projects.php?' + qs).then((r) => { setList(r); setErr(''); }).catch((e) => setErr(errText(e, onAuthLost)));
  }, [q, status, page, onAuthLost]);
  useEffect(() => { if (view.k !== 'list') return; const t = setTimeout(fetchList, q ? 250 : 0); return () => clearTimeout(t); }, [fetchList, q, view.k]);

  if (view.k === 'new') {
    return (
      <>
        <button type="button" className="sh-po-link sh-po-back" onClick={() => setView({ k: 'list' })}>← All projects</button>
        <h3 className="sh-po-h3">New project</h3>
        <ProjectEditor ctx={ctx} onSaved={(id) => setView({ k: 'view', id })} onCancel={() => setView({ k: 'list' })} />
      </>
    );
  }
  if (view.k === 'view') return <ProjectView ctx={ctx} id={view.id} onBack={() => setView({ k: 'list' })} />;

  return (
    <>
      {!staff ? <CheckPanel ctx={ctx} /> : null}
      <div className="sh-po-tools">
        <div className="sh-in">
          <label htmlFor="pj-q">Search</label>
          <input id="pj-q" type="search" value={q} placeholder="Project name or details…" onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        </div>
        <div className="sh-in">
          <label htmlFor="pj-s">Show</label>
          <select id="pj-s" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All</option><option value="1">Active</option><option value="0">Archived</option>
          </select>
        </div>
        {staff ? <button type="button" className="sh-btn p" onClick={() => setView({ k: 'new' })}>New Project</button> : null}
      </div>
      {err ? <Msg text={err} /> : null}
      {list ? (
        <>
          <p className="sh-po-muted">{list.total} project{list.total === 1 ? '' : 's'}</p>
          <div className="sh-po-table" role="region" aria-label="Projects" tabIndex={0}>
            <table>
              <thead><tr><th>Project</th>{staff ? <><th>Contractors</th><th>Files</th></> : <th>My status</th>}<th>Updated</th><th>Status</th><th><span className="sh-po-sr">Open</span></th></tr></thead>
              <tbody>
                {list.items.length === 0 ? <tr><td colSpan={6}>{staff ? 'No projects found.' : 'You have no jobs assigned yet.'}</td></tr> : null}
                {list.items.map((p) => (
                  <tr key={p.id}>
                    <td><b>{p.title}</b></td>
                    {staff ? <><td>{p.assigned}</td><td>{p.files}</td></> : <td><span className={'sh-po-pill ' + STATUS_PILL[p.my_status || 'default']}>{STATUS_LABEL[p.my_status || 'default']}</span></td>}
                    <td>{fmtDateTime(p.updated_at || p.created_at, true)}</td>
                    <td><span className={'sh-po-pill ' + (p.status ? 'ok' : 'none')}>{p.status ? 'Active' : 'Archived'}</span></td>
                    <td><button type="button" className="sh-po-link" onClick={() => setView({ k: 'view', id: p.id })}>Open</button></td>
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

function ProjectEditor({ ctx, initial, id, onSaved, onCancel }: { ctx: Ctx; initial?: { title: string; description: string; status: string }; id?: number; onSaved: (id: number) => void; onCancel: () => void }) {
  const { v, set } = useForm(initial || { title: '', description: '', status: '1' });
  const [busy, setBusy] = useState(false);
  const [fe, setFe] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState('');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(''); setFe({});
    try {
      const r = await api<{ project: { id: number } }>(id ? 'projects.php?a=update&id=' + id : 'projects.php?a=create', v);
      onSaved(r.project.id);
    } catch (err) {
      if (err instanceof ApiError && err.fields) setFe(err.fields);
      setMsg(errText(err, ctx.onAuthLost));
    } finally { setBusy(false); }
  };
  return (
    <form className="sh-cf sh-po-form" onSubmit={submit} noValidate>
      <Field id="pe-t" label="Project name" value={v.title} onChange={set('title')} error={fe.title} required />
      <Field id="pe-d" label="Details" as="textarea" value={v.description} onChange={set('description')} placeholder="Address, scope, access, notes for contractors…" />
      <Field id="pe-s" label="Status" as="select" value={v.status} onChange={set('status')}>
        <option value="1">Active</option><option value="0">Archived (closed)</option>
      </Field>
      <div className="sh-po-actions">
        <Submit busy={busy}>{id ? 'Save Project' : 'Create Project'}</Submit>
        <button type="button" className="sh-btn d" onClick={onCancel}>Cancel</button>
      </div>
      <Msg text={msg} />
    </form>
  );
}

const NEXT: Record<PivotStatus, [PivotStatus, string] | null> = {
  default: ['booked', 'Mark as Booked'],
  booked: ['working', 'Start Work'],
  working: ['completed', 'Mark as Completed'],
  completed: null,
};

function ProjectView({ ctx, id, onBack }: { ctx: Ctx; id: number; onBack: () => void }) {
  const staff = ctx.user.role !== 'user';
  const [d, setD] = useState<ProjectDetail | null>(null);
  const [msg, setMsg] = useState<{ ok?: boolean; text: string }>({ text: '' });
  const [editing, setEditing] = useState(false);
  const { onAuthLost } = ctx;
  const load = useCallback(() => {
    api<ProjectDetail>('projects.php?a=get&id=' + id).then(setD).catch((e) => setMsg({ text: errText(e, onAuthLost) }));
  }, [id, onAuthLost]);
  useEffect(load, [load]);

  const remove = async () => {
    if (!d || !window.confirm(`Delete "${d.project.title}"? This cannot be undone.`)) return;
    try { await api('projects.php?a=delete&id=' + id, {}); onBack(); } catch (e) { setMsg({ text: errText(e, onAuthLost) }); }
  };

  if (!d) return <><button type="button" className="sh-po-link sh-po-back" onClick={onBack}>← Back</button>{msg.text ? <Msg text={msg.text} /> : <p className="sh-po-muted">Loading…</p>}</>;
  const p = d.project;
  return (
    <>
      <button type="button" className="sh-po-link sh-po-back" onClick={onBack}>← {staff ? 'All projects' : 'My jobs'}</button>
      <h3 className="sh-po-h3">{p.title} <span className={'sh-po-pill ' + (p.status ? 'ok' : 'none')}>{p.status ? 'Active' : 'Archived'}</span></h3>
      {editing ? (
        <ProjectEditor ctx={ctx} id={id} initial={{ title: p.title, description: plainText(p.description), status: String(p.status) }} onSaved={() => { setEditing(false); load(); }} onCancel={() => setEditing(false)} />
      ) : (
        <>
          <div className="sh-po-desc">{plainText(p.description) || <span className="sh-po-muted">No details.</span>}</div>
          {staff ? (
            <div className="sh-po-actions">
              <button type="button" className="sh-btn p" onClick={() => setEditing(true)}>Edit Project</button>
              {ctx.user.role === 'admin' ? <button type="button" className="sh-btn d" onClick={remove}>Delete</button> : null}
            </div>
          ) : null}
        </>
      )}
      <Msg ok={msg.ok} text={msg.text} />

      {!staff && d.assignments[0] ? <MyAssignment ctx={ctx} a={d.assignments[0]} active={!!p.status} onChange={load} /> : null}
      {!staff && p.status ? <CheckPanel ctx={ctx} projectId={id} /> : null}

      <h4 className="sh-po-h4">Plans &amp; files</h4>
      <Files ctx={ctx} projectId={id} files={d.attachments} staff={staff} onChange={load} />

      {staff ? (
        <>
          <h4 className="sh-po-h4">Contractors</h4>
          <Assignments ctx={ctx} projectId={id} list={d.assignments} onChange={load} />
          <h4 className="sh-po-h4">Activity</h4>
          {d.logs && d.logs.length ? (
            <ul className="sh-po-log">
              {d.logs.map((l) => (
                <li key={l.id}><b>{l.action}</b> by {l.name || 'unknown'} · {fmtDateTime(l.action_date + ' ' + l.action_time)}{l.action === 'Updated' && l.old_title && l.old_title !== l.new_title ? ` · renamed from “${l.old_title}”` : ''}</li>
              ))}
            </ul>
          ) : <p className="sh-po-muted">No activity recorded.</p>}
        </>
      ) : null}
    </>
  );
}

function Files({ ctx, projectId, files, staff, onChange }: { ctx: Ctx; projectId: number; files: ProjectDetail['attachments']; staff: boolean; onChange: () => void }) {
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok?: boolean; text: string }>({ text: '' });
  const input = useRef<HTMLInputElement>(null);
  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    const f = input.current?.files?.[0];
    if (!f) { setMsg({ text: 'Choose a file to upload.' }); return; }
    const fd = new FormData();
    fd.append('project_id', String(projectId)); fd.append('title', title); fd.append('file', f);
    setBusy(true); setMsg({ text: '' });
    try {
      await api('files.php?a=upload', fd);
      setTitle(''); if (input.current) input.current.value = '';
      setMsg({ ok: true, text: 'File uploaded.' });
      onChange();
    } catch (err) { setMsg({ text: errText(err, ctx.onAuthLost) }); } finally { setBusy(false); }
  };
  const remove = async (id: number, t: string) => {
    if (!window.confirm(`Delete "${t}"?`)) return;
    try { await api('files.php?a=delete&id=' + id, {}); onChange(); } catch (err) { setMsg({ text: errText(err, ctx.onAuthLost) }); }
  };
  return (
    <>
      {files.length ? (
        <ul className="sh-po-files">
          {files.map((f) => (
            <li key={f.id}>
              <span className="sh-po-ext">{f.type.toUpperCase()}</span>
              {f.available ? <a href={fileUrl('attachment', f.id)} target="_blank" rel="noopener">{f.title}</a> : <span>{f.title} <small>(file not uploaded to the server yet)</small></span>}
              <small>{fmtDateTime(f.created_at, true)}</small>
              {staff ? <button type="button" className="sh-po-link" onClick={() => remove(f.id, f.title)}>Delete</button> : null}
            </li>
          ))}
        </ul>
      ) : <p className="sh-po-muted">No files yet.</p>}
      {staff ? (
        <form className="sh-cf sh-po-form sh-po-upload" onSubmit={upload} noValidate>
          <div className="row">
            <Field id={'fu-t-' + projectId} label="File title" value={title} onChange={setTitle} placeholder="e.g. Ground floor plan" />
            <div className="sh-in"><label htmlFor={'fu-f-' + projectId}>File (PDF, JPG, PNG, WebP)</label><input id={'fu-f-' + projectId} ref={input} type="file" accept="application/pdf,image/jpeg,image/png,image/webp" /></div>
          </div>
          <Submit busy={busy}>Upload File</Submit>
          <Msg ok={msg.ok} text={msg.text} />
        </form>
      ) : null}
    </>
  );
}

function MyAssignment({ ctx, a, active, onChange }: { ctx: Ctx; a: Assignment; active: boolean; onChange: () => void }) {
  const next = NEXT[a.status];
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const go = async () => {
    if (!next) return;
    const fd = new FormData();
    fd.append('status', next[0]);
    const f = input.current?.files?.[0];
    if (f) fd.append('file', f);
    setBusy(true); setMsg('');
    try { await api('projects.php?a=assignment_status&id=' + a.id, fd); onChange(); } catch (e) { setMsg(errText(e, ctx.onAuthLost)); } finally { setBusy(false); }
  };
  return (
    <div className="sh-po-panel">
      <div>
        <small>My status</small>
        <b><span className={'sh-po-pill ' + STATUS_PILL[a.status]}>{STATUS_LABEL[a.status]}</span></b>
        <small>Booked {fmtDate(a.booked_on)} · Started {fmtDate(a.worked_on)} · Completed {fmtDate(a.completed_on)}</small>
      </div>
      {next && active ? (
        <div className="sh-po-panel-act">
          {next[0] === 'completed' ? (
            <div className="sh-in"><label htmlFor="as-f">Completion photo or document (optional)</label><input id="as-f" ref={input} type="file" accept="application/pdf,image/jpeg,image/png,image/webp" /></div>
          ) : null}
          <button type="button" className="sh-btn p" onClick={go} disabled={busy}>{busy ? 'Please wait…' : next[1]}</button>
        </div>
      ) : null}
      <Msg text={msg} />
    </div>
  );
}

function Assignments({ ctx, projectId, list, onChange }: { ctx: Ctx; projectId: number; list: Assignment[]; onChange: () => void }) {
  const [people, setPeople] = useState<{ id: number; name: string; business_name: string | null; trade: string | null }[]>([]);
  const [pick, setPick] = useState('');
  const [msg, setMsg] = useState('');
  const { onAuthLost } = ctx;
  useEffect(() => {
    api<{ items: typeof people }>('projects.php?a=assignable').then((r) => setPeople(r.items)).catch((e) => setMsg(errText(e, onAuthLost)));
  }, [onAuthLost]);
  const assign = async () => {
    if (!pick) return;
    setMsg('');
    try { await api('projects.php?a=assign&id=' + projectId, { user_id: Number(pick) }); setPick(''); onChange(); } catch (e) { setMsg(errText(e, onAuthLost)); }
  };
  const setStatus = async (a: Assignment, s: string) => {
    const fd = new FormData(); fd.append('status', s);
    try { await api('projects.php?a=assignment_status&id=' + a.id, fd); onChange(); } catch (e) { setMsg(errText(e, onAuthLost)); }
  };
  const remove = async (a: Assignment) => {
    if (!window.confirm(`Remove ${a.name} from this project?`)) return;
    try { await api('projects.php?a=unassign&id=' + a.id, {}); onChange(); } catch (e) { setMsg(errText(e, onAuthLost)); }
  };
  const assigned = new Set(list.map((a) => a.user_id));
  return (
    <>
      <div className="sh-po-table" role="region" aria-label="Assigned contractors" tabIndex={0}>
        <table>
          <thead><tr><th>Contractor</th><th>Status</th><th>Booked</th><th>Started</th><th>Completed</th><th><span className="sh-po-sr">Actions</span></th></tr></thead>
          <tbody>
            {list.length === 0 ? <tr><td colSpan={6}>No contractors assigned.</td></tr> : null}
            {list.map((a) => (
              <tr key={a.id}>
                <td><b>{a.name}</b><small>{[a.business_name, a.trade].filter(Boolean).join(' · ') || a.email}</small></td>
                <td>
                  <select aria-label={'Status for ' + a.name} value={a.status} onChange={(e) => setStatus(a, e.target.value)} className="sh-po-sel">
                    {Object.entries(STATUS_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                  </select>
                  {a.completion_attachment_id ? <small><a href={fileUrl('attachment', a.completion_attachment_id)} target="_blank" rel="noopener">Completion file</a></small> : null}
                </td>
                <td>{fmtDate(a.booked_on)}</td>
                <td>{fmtDate(a.worked_on)}</td>
                <td>{fmtDate(a.completed_on)}</td>
                <td><button type="button" className="sh-po-link" onClick={() => remove(a)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sh-po-tools sh-po-assign">
        <div className="sh-in">
          <label htmlFor={'as-p-' + projectId}>Assign a contractor</label>
          <select id={'as-p-' + projectId} value={pick} onChange={(e) => setPick(e.target.value)}>
            <option value="">Choose…</option>
            {people.filter((x) => !assigned.has(x.id)).map((x) => <option key={x.id} value={x.id}>{x.name}{x.business_name ? ' — ' + x.business_name : ''}{x.trade ? ' (' + x.trade + ')' : ''}</option>)}
          </select>
        </div>
        <button type="button" className="sh-btn p" onClick={assign} disabled={!pick}>Assign</button>
      </div>
      <Msg text={msg} />
    </>
  );
}
