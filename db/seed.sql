-- Sample data for local development / staging only. Do NOT import on production.
-- No usable passwords: every password_hash below is a placeholder that matches no password.
-- Create real logins with /api/setup/create-admin.php (admin) and the portal's
-- "Add contractor" / "Reset password" actions (contractors).

INSERT INTO contractors (business_name, contact_name, email, phone, trade, licence_no, abn, insurance_expiry, status, notes) VALUES
 ('Harbour Sparks Electrical', 'Liam Walker',   'liam@example.com',  '0400 000 001', 'Electrician', 'EC00001', '11 111 111 111', '2027-06-30', 'active',   'Sample record'),
 ('North Shore Plumbing Co',   'Ava Nguyen',    'ava@example.com',   '0400 000 002', 'Plumber',     'PL00002', '22 222 222 222', '2027-03-31', 'active',   'Sample record'),
 ('Hills Framing Pty Ltd',     'Noah Patel',    'noah@example.com',  '0400 000 003', 'Carpenter',   'CA00003', '33 333 333 333', '2026-12-31', 'active',   'Sample record'),
 ('Westside Tiling',           'Mia Thompson',  'mia@example.com',   '0400 000 004', 'Tiler',       '',        '44 444 444 444', '2026-10-15', 'inactive', 'Sample record - insurance lapsed');

INSERT INTO users (email, name, password_hash, role, contractor_id, is_active, must_change_password)
SELECT email, contact_name, '!seed-no-login!', 'contractor', id, status = 'active', 1 FROM contractors;

INSERT INTO enquiries (name, phone, email, suburb, service, message, page_url, ip_hash, mail_status) VALUES
 ('Sample Enquiry', '0400 000 010', 'sample@example.com', 'Hornsby', 'Duplex', 'Sample message for testing the admin enquiries list.', '/contact/', REPEAT('0', 64), 'skipped');
