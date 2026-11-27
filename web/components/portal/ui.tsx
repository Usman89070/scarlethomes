'use client';

import { useState } from 'react';

export function Field({ id, label, type = 'text', value, onChange, error, required, autoComplete, as, disabled, placeholder }: {
  id: string; label: string; type?: string; value: string; onChange: (v: string) => void; error?: string; required?: boolean;
  autoComplete?: string; as?: 'textarea' | 'select'; disabled?: boolean; placeholder?: string; }) {
  return (
    <div className={'sh-in' + (error ? ' sh-po-err' : '')}>
      <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
      {as === 'textarea' ? (
        <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} placeholder={placeholder} aria-invalid={!!error} />
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
  return (
    <button type="submit" className="sh-btn p" disabled={busy}>
      {busy ? 'Please wait…' : children}
    </button>
  );
}

export function useForm<T extends Record<string, string>>(init: T) {
  const [v, setV] = useState<T>(init);
  const set = (k: keyof T) => (val: string) => setV((s) => ({ ...s, [k]: val }));
  return { v, setV, set };
}

export function fmtDate(s: string | null | undefined, withTime = false) {
  if (!s) return '—';
  const d = new Date(s.length === 10 ? s + 'T00:00:00' : s.replace(' ', 'T') + 'Z');
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', ...(withTime ? { hour: 'numeric', minute: '2-digit' } : {}) });
}

export function insuranceState(s: string | null | undefined): 'ok' | 'soon' | 'expired' | 'none' {
  if (!s) return 'none';
  const d = new Date(s + 'T00:00:00').getTime();
  const now = Date.now();
  if (d < now) return 'expired';
  if (d - now < 30 * 864e5) return 'soon';
  return 'ok';
}
