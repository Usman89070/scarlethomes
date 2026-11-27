-- Upgrade the OLD site's database (scarleth_database, Laravel) to the new portal schema.
-- Keeps every user (and their existing password), role, project, assignment, attachment,
-- log, attendance and enquiry.
--
-- Run ONCE, in phpMyAdmin, on the database that contains the old data
-- (either the existing database, or a new one into which you imported the old dump):
--   phpMyAdmin -> select the database -> Import -> this file.
-- Take a backup (Export) first.

SET NAMES utf8mb4;
SET time_zone = '+00:00';

ALTER TABLE `users`
  ADD COLUMN `must_change_password` tinyint(1) NOT NULL DEFAULT '0' AFTER `status`,
  ADD COLUMN `last_login_at` datetime DEFAULT NULL AFTER `must_change_password`;

ALTER TABLE `roles` ADD KEY `roles_user_id_index` (`user_id`);

ALTER TABLE `project_user_pivots` ADD KEY `project_user_pivots_project_user_index` (`project_id`, `user_id`);

ALTER TABLE `contacts`
  ADD COLUMN `suburb` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  ADD COLUMN `page_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  ADD COLUMN `ip_hash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  ADD COLUMN `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  ADD COLUMN `mail_status` enum('sent','failed','skipped') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'skipped',
  ADD KEY `contacts_created_index` (`created_at`),
  ADD KEY `contacts_ip_index` (`ip_hash`, `created_at`);

CREATE TABLE IF NOT EXISTS `contractor_profiles` (
  `user_id` bigint UNSIGNED NOT NULL,
  `business_name` varchar(160) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `phone` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `trade` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `licence_no` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `abn` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `insurance_expiry` date DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `contractor_profiles_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

-- Old Laravel sessions are useless to the new portal (it uses PHP sessions).
TRUNCATE TABLE `sessions`;

-- OPTIONAL clean-up once you have checked the new site. These tables belonged to the old
-- Laravel website/CMS and are not used by the new static site. Uncomment to remove them.
-- DROP TABLE IF EXISTS `about_us`, `blogs`, `chooses`, `galleries`, `gallery_categories`, `inclusions`,
--   `portfolio_images`, `portfolios`, `portfolio_categories`, `selections`, `services`,
--   `site_configurations`, `sliders`, `stories`, `testimonials`,
--   `cache`, `cache_locks`, `jobs`, `job_batches`, `failed_jobs`, `migrations`,
--   `password_reset_tokens`, `sessions`;
