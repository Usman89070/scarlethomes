'use client';

import { useState } from 'react';

const TZ = 'Australia/Sydney';

export function Field({ id, label, type = 'text', value, onChange, error, required, autoComplete, as, disabled, placeholder, children }: {
  id: string; label: string; type?: string; value: string; onChange: (v: string) => void; error?: string; required?: boolean;
  autoComplete?: string; as?: 'textarea' | 'select'; disabled?: boolean; placeholder?: string; children?: React.ReactNode; }) {
  return (
    <div className={'sh-in' + (error ? ' sh-po-err' : '')}>
      <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
      {as === 'textarea' ? (
        <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} placeholder={placeholder} aria-invalid={!!error} />
      ) : as === 'select' ? (
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>{children}</select>
      ) : (
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} autoComplete={autoComplete} disabled={disabled} placeholder={placeholder} aria-invalid={!!error} aria-describedby={error ? id + '-e' : undefined} />
      )}
      {error ? <small className="sh-po-fe" id={id + '-e'}>{error}</small> : null}
    </div>
  );
}

export function Msg({ ok, text }: { ok?: boolean; text: string }) {
  if (!text) return <div className="sh-msg" role="status" aria-live="polite" />;
  return <div className={'sh-msg ' + (ok ? 'ok' : 'bad')} role="status" aria-live="polite">{text}</div>;
}

export function Submit({ busy, children }: { busy: boolean; children: React.ReactNode }) {
  return <button type="submit" className="sh-btn p" disabled={busy}>{busy ? 'Please wait…' : children}</button>;
}

export function useForm<T extends Record<string, string>>(init: T) {
  const [v, setV] = useState<T>(init);
  const set = (k: keyof T) => (val: string) => setV((s) => ({ ...s, [k]: val }));
  return { v, setV, set };
}

/** DATE columns (YYYY-MM-DD) */
export function fmtDate(s: string | null | undefined) {
  if (!s) return '—';
  const d = new Date(s.slice(0, 10) + 'T00:00:00');
  return isNaN(d.getTime()) ? s : d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** UTC DATETIME/TIMESTAMP columns -> Sydney time */
export function fmtDateTime(s: string | null | undefined, dateOnly = false) {
  if (!s) return '—';
  const d = new Date(s.replace(' ', 'T') + 'Z');
  if (isNaN(d.getTime())) return s;
  return d.toLocaleString('en-AU', { timeZone: TZ, day: 'numeric', month: 'short', year: 'numeric', ...(dateOnly ? {} : { hour: 'numeric', minute: '2-digit' }) });
}

export function duration(a: string, b: string | null) {
  if (!b) return 'On site';
  const ms = new Date(b.replace(' ', 'T') + 'Z').getTime() - new Date(a.replace(' ', 'T') + 'Z').getTime();
  if (!(ms > 0)) return '—';
  const m = Math.round(ms / 60000);
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;
}

/** Old descriptions are simple HTML (<p>, <br>) from the Laravel editor: shown as plain text. */
export function plainText(s: string) {
  if (!/<[a-z][\s\S]*>/i.test(s)) return s;
  const html = s.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>\s*/gi, '\n\n');
  if (typeof window === 'undefined') return html.replace(/<[^>]+>/g, '');
  const doc = new DOMParser().parseFromString(html, 'text/html'); // inert: scripts never run
  return (doc.body.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
}

export function insuranceState(s: string | null | undefined): 'ok' | 'soon' | 'expired' | 'none' {
  if (!s) return 'none';
  const d = new Date(s + 'T00:00:00').getTime();
  if (d < Date.now()) return 'expired';
  if (d - Date.now() < 30 * 864e5) return 'soon';
  return 'ok';
}

export const STATUS_LABEL: Record<string, string> = { default: 'Assigned', booked: 'Booked', working: 'Working', completed: 'Completed' };
export const STATUS_PILL: Record<string, string> = { default: 'none', booked: 'soon', working: 'soon', completed: 'ok' };
export const ROLE_LABEL: Record<string, string> = { admin: 'Admin', supervisor: 'Supervisor', user: 'Contractor' };
