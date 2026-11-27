'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { api, fileUrl } from './api';
import type { Attendance, Page, ProjectRow } from './types';
import { Msg, duration, fmtDateTime } from './ui';
import { errText, Pager, type Ctx } from './Portal';

type Open = { id: number; project_id: number; checked_in_at: string; title: string } | null;

/** Contractor check-in / check-out. With projectId: can check in to that project. */
export function CheckPanel({ ctx, projectId }: { ctx: Ctx; projectId?: number }) {
  const [open, setOpen] = useState<Open | undefined>(undefined);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok?: boolean; text: string }>({ text: '' });
  const photo = useRef<HTMLInputElement>(null);
  const { onAuthLost } = ctx;
  const load = useCallback(() => {
    api<{ open: Open }>('attendance.php?a=open').then((r) => setOpen(r.open)).catch((e) => setMsg({ text: errText(e, onAuthLost) }));
  }, [onAuthLost]);
  useEffect(load, [load]);

  const checkin = async () => {
    setBusy(true); setMsg({ text: '' });
    try { const r = await api<{ open: Open }>('attendance.php?a=checkin', { project_id: projectId }); setOpen(r.open); setMsg({ ok: true, text: 'Checked in.' }); }
    catch (e) { setMsg({ text: errText(e, onAuthLost) }); } finally { setBusy(false); }
  };
  const checkout = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('note', note);
    const f = photo.current?.files?.[0];
    if (f) fd.append('image', f);
    setBusy(true); setMsg({ text: '' });
    try { await api('attendance.php?a=checkout', fd); setOpen(null); setNote(''); setMsg({ ok: true, text: 'Checked out. Thank you.' }); }
    catch (err) { setMsg({ text: errText(err, onAuthLost) }); } finally { setBusy(false); }
  };

  if (open === undefined) return msg.text ? <Msg text={msg.text} /> : null;
  if (open) {
    return (
      <form className="sh-po-panel sh-po-on" onSubmit={checkout} noValidate>
        <div>
          <small>On site</small>
          <b>{open.title}</b>
          <small>Checked in {fmtDateTime(open.checked_in_at)}</small>
        </div>
        <div className="sh-po-panel-act">
          <div className="sh-in"><label htmlFor="co-n">Note (what was done)</label><textarea id="co-n" value={note} onChange={(e) => setNote(e.target.value)} /></div>
          <div className="sh-in"><label htmlFor="co-p">Photo (optional)</label><input id="co-p" ref={photo} type="file" accept="image/jpeg,image/png,image/webp" capture="environment" /></div>
          <button type="submit" className="sh-btn p" disabled={busy}>{busy ? 'Please wait…' : 'Check Out'}</button>
        </div>
        <Msg ok={msg.ok} text={msg.text} />
      </form>
    );
  }
  if (!projectId) return msg.text ? <Msg ok={msg.ok} text={msg.text} /> : null;
  return (
    <div className="sh-po-panel">
      <div><small>Site attendance</small><b>Not checked in</b><small>Check in when you arrive on site.</small></div>
      <div className="sh-po-panel-act"><button type="button" className="sh-btn p" onClick={checkin} disabled={busy}>{busy ? 'Please wait…' : 'Check In Here'}</button></div>
      <Msg ok={msg.ok} text={msg.text} />
    </div>
  );
}

export default function AttendanceList({ ctx }: { ctx: Ctx }) {
  const staff = ctx.user.role !== 'user';
  const [f, setF] = useState({ project_id: '', user_id: '', from: '', to: '' });
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Page<Attendance> | null>(null);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [people, setPeople] = useState<{ id: number; name: string }[]>([]);
  const [err, setErr] = useState('');
  const { onAuthLost } = ctx;
  useEffect(() => {
    if (!staff) return;
    api<Page<ProjectRow>>('projects.php?a=list&status=1').then((r) => setProjects(r.items)).catch(() => {});
    api<{ items: { id: number; name: string }[] }>('projects.php?a=assignable').then((r) => setPeople(r.items)).catch(() => {});
  }, [staff]);
  useEffect(() => {
    const qs = new URLSearchParams({ a: 'list', page: String(page), ...f });
    api<Page<Attendance>>('attendance.php?' + qs).then((r) => { setList(r); setErr(''); }).catch((e) => setErr(errText(e, onAuthLost)));
  }, [f, page, onAuthLost]);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setF((s) => ({ ...s, [k]: e.target.value })); setPage(1); };
  return (
    <>
      {!staff ? <CheckPanel ctx={ctx} /> : null}
      {staff ? (
        <div className="sh-po-tools">
          <div className="sh-in"><label htmlFor="at-p">Project</label><select id="at-p" value={f.project_id} onChange={set('project_id')}><option value="">All</option>{projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select></div>
          <div className="sh-in"><label htmlFor="at-u">Contractor</label><select id="at-u" value={f.user_id} onChange={set('user_id')}><option value="">All</option>{people.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
          <div className="sh-in"><label htmlFor="at-f">From</label><input id="at-f" type="date" value={f.from} onChange={set('from')} /></div>
          <div className="sh-in"><label htmlFor="at-t">To</label><input id="at-t" type="date" value={f.to} onChange={set('to')} /></div>
        </div>
      ) : null}
      {err ? <Msg text={err} /> : null}
      {list ? (
        <>
          <p className="sh-po-muted">{list.total} record{list.total === 1 ? '' : 's'} · times in Sydney time</p>
          <div className="sh-po-table" role="region" aria-label="Attendance" tabIndex={0}>
            <table>
              <thead><tr>{staff ? <th>Contractor</th> : null}<th>Project</th><th>Checked in</th><th>Checked out</th><th>Time on site</th><th>Note / photo</th></tr></thead>
              <tbody>
                {list.items.length === 0 ? <tr><td colSpan={6}>No attendance records.</td></tr> : null}
                {list.items.map((a) => (
                  <tr key={a.id}>
                    {staff ? <td><b>{a.name}</b></td> : null}
                    <td>{a.title}</td>
                    <td>{fmtDateTime(a.checked_in_at)}</td>
                    <td>{a.checked_out_at ? fmtDateTime(a.checked_out_at) : <span className="sh-po-pill soon">On site</span>}</td>
                    <td>{duration(a.checked_in_at, a.checked_out_at)}</td>
                    <td>{a.checkout_note || '—'}{a.has_image ? <small><a href={fileUrl('checkout', a.id)} target="_blank" rel="noopener">View photo</a></small> : null}</td>
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
