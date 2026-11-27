export type Role = 'admin' | 'supervisor' | 'user';
export type User = { id: number; email: string; name: string; role: Role; must_change_password: boolean };
export type Profile = { business_name: string; phone: string; trade: string; licence_no: string; abn: string; insurance_expiry: string | null; notes?: string };
export type PivotStatus = 'default' | 'booked' | 'working' | 'completed';

export type ProjectRow = { id: number; title: string; status: number; created_at: string | null; updated_at: string | null; assigned: number; files: number; pivot_id?: number; my_status?: PivotStatus };
export type Project = { id: number; title: string; description: string; status: number; created_by: string | null; created_at: string | null; updated_at: string | null };
export type Attachment = { id: number; title: string; type: string; created_at: string | null; available: boolean };
export type Assignment = { id: number; user_id: number; name: string; email: string; business_name: string | null; trade: string | null; phone: string | null; status: PivotStatus; booked_on: string | null; worked_on: string | null; completed_on: string | null; completion_attachment_id: number | null };
export type Log = { id: number; action: string; old_title: string | null; new_title: string; action_date: string; action_time: string; name: string | null };
export type ProjectDetail = { project: Project; attachments: Attachment[]; assignments: Assignment[]; logs: Log[] | null };

export type UserRow = { id: number; name: string; email: string; status: number; role: Role; last_login_at: string | null; business_name: string | null; trade: string | null; phone: string | null; insurance_expiry: string | null; projects: number };
export type UserFull = { id: number; name: string; email: string; status: number; role: Role; must_change_password: boolean; last_login_at: string | null; created_at: string | null; updated_at: string | null };
export type Attendance = { id: number; project_id: number; user_id: number; title: string; name: string; checked_in_at: string; checked_out_at: string | null; checkout_note: string | null; has_image: number };
export type Enquiry = { id: number; name: string; phone: string | null; email: string; suburb: string; topic: string; message: string; page_url: string; mail_status: string; created_at: string | null };
export type Page<T> = { total: number; page: number; per_page: number; items: T[] };
