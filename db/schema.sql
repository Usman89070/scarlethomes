-- Scarlet Homes - database schema (MySQL 8 / MariaDB 10.4+), utf8mb4.
--
-- Based on the old site's Laravel database (scarleth_database): the portal tables keep the
-- SAME names and columns (users, roles, projects, project_user_pivots, project_attachments,
-- project_logs, attendances, contacts) so the old data can be imported as-is - see
-- db/migrate-from-old-site.sql. Additions are marked "NEW".
-- All DATETIME/TIMESTAMP values are UTC (as in the old app).
--
-- Fresh install: import this file in phpMyAdmin (hPanel database names are prefixed,
-- so there is no CREATE DATABASE here).

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,             -- bcrypt (password_hash)
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,   -- unused (Laravel)
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',                                 -- 1 active, 0 inactive
  `must_change_password` tinyint(1) NOT NULL DEFAULT '0',                   -- NEW
  `last_login_at` datetime DEFAULT NULL,                                    -- NEW
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- One row per user: admin | supervisor | user (= contractor)
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `role` enum('admin','user','supervisor') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roles_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `projects` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,                                       -- created by
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',                                 -- 1 active, 0 archived
  PRIMARY KEY (`id`),
  KEY `projects_user_id_foreign` (`user_id`),
  CONSTRAINT `projects_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Files (plans, completion evidence). `attachment` is a path relative to the uploads folder.
CREATE TABLE IF NOT EXISTS `project_attachments` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` bigint UNSIGNED NOT NULL,
  `attachment` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_attachments_project_id_foreign` (`project_id`),
  CONSTRAINT `project_attachments_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contractor assignments: default (assigned) -> booked -> working -> completed
CREATE TABLE IF NOT EXISTS `project_user_pivots` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `status` enum('default','booked','working','completed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `booked_on` date DEFAULT NULL,
  `worked_on` date DEFAULT NULL,
  `completed_on` date DEFAULT NULL,
  `completion_attachment_id` bigint UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_user_pivots_completion_attachment_id_foreign` (`completion_attachment_id`),
  KEY `project_user_pivots_project_user_index` (`project_id`, `user_id`),
  CONSTRAINT `project_user_pivots_completion_attachment_id_foreign` FOREIGN KEY (`completion_attachment_id`) REFERENCES `project_attachments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `project_logs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `project_id` bigint UNSIGNED NOT NULL,
  `action` enum('Created','Updated','Deleted') COLLATE utf8mb4_unicode_ci NOT NULL,
  `old_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `old_description` longtext COLLATE utf8mb4_unicode_ci,
  `new_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `new_description` longtext COLLATE utf8mb4_unicode_ci,
  `action_date` date NOT NULL,
  `action_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_logs_user_id_foreign` (`user_id`),
  KEY `project_logs_project_id_foreign` (`project_id`),
  CONSTRAINT `project_logs_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `attendances` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `checked_in_at` datetime NOT NULL,
  `checked_out_at` datetime DEFAULT NULL,
  `checkout_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,   -- path relative to the uploads folder
  `checkout_note` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attendances_user_id_foreign` (`user_id`),
  KEY `attendances_project_id_user_id_index` (`project_id`,`user_id`),
  CONSTRAINT `attendances_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `attendances_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Website enquiries (old table + NEW columns used by /api/enquiry.php)
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `topic` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,                -- "What would you like to build?"
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `suburb` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',     -- NEW
  `page_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',   -- NEW
  `ip_hash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',        -- NEW (rate limiting)
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '', -- NEW
  `mail_status` enum('sent','failed','skipped') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'skipped', -- NEW
  PRIMARY KEY (`id`),
  KEY `contacts_created_index` (`created_at`),
  KEY `contacts_ip_index` (`ip_hash`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- NEW: contractor business details (one row per contractor user)
CREATE TABLE IF NOT EXISTS `contractor_profiles` (
  `user_id` bigint UNSIGNED NOT NULL,
  `business_name` varchar(160) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `phone` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `trade` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `licence_no` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `abn` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `insurance_expiry` date DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,                                  -- staff only
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `contractor_profiles_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- NEW, not used in v1 (insurance certificates, licences, SWMS ...)
CREATE TABLE IF NOT EXISTS `contractor_documents` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `doc_type` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_on` date DEFAULT NULL,
  `uploaded_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contractor_documents_user_index` (`user_id`),
  CONSTRAINT `contractor_documents_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- NEW: sign-in rate limiting / lockout
CREATE TABLE IF NOT EXISTS `login_attempts` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `ip_hash` char(64) NOT NULL,
  `email` varchar(255) NOT NULL DEFAULT '',
  `success` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `login_attempts_email_index` (`email`, `created_at`),
  KEY `login_attempts_ip_index` (`ip_hash`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- NEW: sessions for the Node.js version of the API (web/server; the PHP API uses PHP sessions)
CREATE TABLE IF NOT EXISTS `portal_sessions` (
  `id` char(64) NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `data` text NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `portal_sessions_activity` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
