'use client';

import { Fragment, useEffect, useState } from 'react';
import { api } from './api';
import type { Enquiry, Page } from './types';
import { Msg, fmtDateTime } from './ui';
import { errText, Pager, type Ctx } from './Portal';

/** Website enquiries (table `contacts`, including the old site's). Admin only. */
export default function Enquiries({ ctx }: { ctx: Ctx }) {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Page<Enquiry> | null>(null);
  const [err, setErr] = useState('');
  const [open, setOpen] = useState<number | null>(null);
  const { onAuthLost } = ctx;
  useEffect(() => {
    const t = setTimeout(() => {
      const qs = new URLSearchParams({ q, page: String(page) });
      api<Page<Enquiry>>('enquiries.php?' + qs).then((r) => { setList(r); setErr(''); }).catch((e) => setErr(errText(e, onAuthLost)));
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
              <thead><tr><th>Received</th><th>Name</th><th>Contact</th><th>Topic</th><th>Email sent</th><th><span className="sh-po-sr">Message</span></th></tr></thead>
              <tbody>
                {list.items.length === 0 ? <tr><td colSpan={6}>No enquiries found.</td></tr> : null}
                {list.items.map((e) => (
                  <Fragment key={e.id}>
                    <tr>
                      <td>{fmtDateTime(e.created_at)}</td>
                      <td><b>{e.name}</b><small>{e.suburb}</small></td>
                      <td><a href={'mailto:' + e.email}>{e.email}</a>{e.phone ? <small><a href={'tel:' + e.phone.replace(/[^0-9+]/g, '')}>{e.phone}</a></small> : null}</td>
                      <td>{e.topic || '—'}</td>
                      <td><span className={'sh-po-pill ' + (e.mail_status === 'sent' ? 'ok' : e.mail_status === 'failed' ? 'expired' : 'none')}>{e.mail_status === 'skipped' ? '—' : e.mail_status}</span></td>
                      <td><button type="button" className="sh-po-link" aria-expanded={open === e.id} onClick={() => setOpen(open === e.id ? null : e.id)}>{open === e.id ? 'Hide' : 'Message'}</button></td>
                    </tr>
                    {open === e.id ? <tr className="sh-po-msgrow"><td colSpan={6}>{e.message || '(no message)'}{e.page_url ? <small>Page: {e.page_url}</small> : null}</td></tr> : null}
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
