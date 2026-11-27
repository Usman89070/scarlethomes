-- Sample data for local development / staging only. Do NOT import on production.
-- No usable passwords: '!seed-no-login!' matches nothing. Create logins with
-- api/setup/create-admin.php and the portal's "Add user" / "Reset password".
SET time_zone = '+00:00';

INSERT INTO users (id, name, email, password, status, must_change_password, created_at, updated_at) VALUES
 (1, 'Sample Supervisor', 'super@example.com', '!seed-no-login!', 1, 1, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
 (2, 'Liam Walker',  'liam@example.com',  '!seed-no-login!', 1, 1, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
 (3, 'Ava Nguyen',   'ava@example.com',   '!seed-no-login!', 1, 1, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
 (4, 'Noah Patel',   'noah@example.com',  '!seed-no-login!', 1, 1, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
 (5, 'Mia Thompson', 'mia@example.com',   '!seed-no-login!', 0, 1, UTC_TIMESTAMP(), UTC_TIMESTAMP());

INSERT INTO roles (user_id, role, created_at, updated_at) VALUES
 (1, 'supervisor', UTC_TIMESTAMP(), UTC_TIMESTAMP()), (2, 'user', UTC_TIMESTAMP(), UTC_TIMESTAMP()),
 (3, 'user', UTC_TIMESTAMP(), UTC_TIMESTAMP()), (4, 'user', UTC_TIMESTAMP(), UTC_TIMESTAMP()), (5, 'user', UTC_TIMESTAMP(), UTC_TIMESTAMP());

INSERT INTO contractor_profiles (user_id, business_name, phone, trade, licence_no, abn, insurance_expiry, notes, created_at, updated_at) VALUES
 (2, 'Harbour Sparks Electrical', '0400 000 001', 'Electrician', 'EC00001', '11 111 111 111', '2027-06-30', 'Sample record', UTC_TIMESTAMP(), UTC_TIMESTAMP()),
 (3, 'North Shore Plumbing Co',   '0400 000 002', 'Plumber',     'PL00002', '22 222 222 222', '2027-03-31', 'Sample record', UTC_TIMESTAMP(), UTC_TIMESTAMP()),
 (4, 'Hills Framing Pty Ltd',     '0400 000 003', 'Carpenter',   'CA00003', '33 333 333 333', '2026-12-31', 'Sample record', UTC_TIMESTAMP(), UTC_TIMESTAMP()),
 (5, 'Westside Tiling',           '0400 000 004', 'Tiler',       '',        '44 444 444 444', '2026-10-15', 'Inactive sample', UTC_TIMESTAMP(), UTC_TIMESTAMP());

INSERT INTO projects (id, title, description, user_id, status, created_at, updated_at) VALUES
 (1, 'Sample Duplex - Hornsby',        '<p>Dual-occupancy build.</p><p>Site access via rear lane.</p>', 1, 1, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
 (2, 'Sample Knockdown Rebuild - Castle Hill', 'Single-storey to double-storey rebuild.', 1, 1, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
 (3, 'Sample Granny Flat - Parramatta', 'Completed sample project.', 1, 0, UTC_TIMESTAMP(), UTC_TIMESTAMP());

INSERT INTO project_user_pivots (project_id, user_id, status, booked_on, created_at, updated_at) VALUES
 (1, 2, 'default', NULL, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
 (1, 3, 'booked', UTC_DATE(), UTC_TIMESTAMP(), UTC_TIMESTAMP()),
 (2, 2, 'default', NULL, UTC_TIMESTAMP(), UTC_TIMESTAMP());

INSERT INTO project_logs (user_id, project_id, action, new_title, new_description, action_date, action_time, created_at, updated_at) VALUES
 (1, 1, 'Created', 'Sample Duplex - Hornsby', '<p>Dual-occupancy build.</p><p>Site access via rear lane.</p>', UTC_DATE(), UTC_TIME(), UTC_TIMESTAMP(), UTC_TIMESTAMP());

INSERT INTO contacts (name, phone, email, topic, message, suburb, page_url, mail_status, created_at, updated_at) VALUES
 ('Sample Enquiry', '0400 000 010', 'sample@example.com', 'Duplex', 'Sample message for testing the enquiries list.', 'Hornsby', '/contact/', 'skipped', UTC_TIMESTAMP(), UTC_TIMESTAMP());
