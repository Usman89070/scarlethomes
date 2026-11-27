export type User = { id: number; email: string; name: string; role: 'admin' | 'contractor'; contractor_id: number | null; must_change_password: boolean };
export type Contractor = {
  id: number; business_name: string; contact_name: string; email: string; phone: string; trade: string;
  licence_no: string; abn: string; insurance_expiry: string | null; status: 'active' | 'inactive'; notes?: string | null;
  created_at: string; updated_at: string;
  login?: { active: boolean; must_change_password: boolean; last_login_at: string | null } | null;
};
export type Enquiry = { id: number; name: string; phone: string; email: string; suburb: string; service: string; message: string | null; page_url: string; mail_status: string; created_at: string };
export type Page<T> = { total: number; page: number; per_page: number; items: T[] };
