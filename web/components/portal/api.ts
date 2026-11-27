/* Tiny client for the PHP JSON API. Same origin in production; NEXT_PUBLIC_API_BASE in dev. */
export const BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export class ApiError extends Error {
  status: number;
  code?: string;
  fields?: Record<string, string>;
  constructor(msg: string, status: number, code?: string, fields?: Record<string, string>) {
    super(msg);
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

let csrf = '';
export const setCsrf = (t: string) => { csrf = t; };

/** GET when body is undefined; POST JSON for objects; POST multipart for FormData. */
export async function api<T = Record<string, unknown>>(path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  const init: RequestInit = { credentials: 'include', headers };
  if (body !== undefined) {
    init.method = 'POST';
    headers['X-CSRF-Token'] = csrf;
    if (body instanceof FormData) init.body = body;
    else { headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(body); }
  }
  let res: Response;
  try {
    res = await fetch(BASE + '/api/' + path, init);
  } catch {
    throw new ApiError('Could not reach the server. Please check your connection.', 0);
  }
  let data: Record<string, unknown> = {};
  try { data = await res.json(); } catch { /* non-JSON */ }
  if (!res.ok || data.ok === false) {
    const msg = res.status === 413 ? 'The file is too large.' : (data.error as string) || 'Something went wrong. Please try again.';
    throw new ApiError(msg, res.status, data.code as string, data.fields as Record<string, string>);
  }
  if (typeof data.csrf === 'string') csrf = data.csrf;
  return data as T;
}

export const fileUrl = (kind: 'attachment' | 'checkout', id: number) => `${BASE}/api/files.php?a=${kind}&id=${id}`;
