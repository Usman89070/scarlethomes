-- Scarlet Homes - database schema (MySQL 8 / MariaDB 10.4+), utf8mb4.
-- Import in phpMyAdmin into the database created in hPanel (do not add CREATE DATABASE here:
-- Hostinger database names are prefixed, e.g. u123456789_scarlet).

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS contractors (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  business_name    VARCHAR(160) NOT NULL,
  contact_name     VARCHAR(120) NOT NULL,
  email            VARCHAR(190) NOT NULL,
  phone            VARCHAR(40)  NOT NULL DEFAULT '',
  trade            VARCHAR(80)  NOT NULL DEFAULT '',
  licence_no       VARCHAR(60)  NOT NULL DEFAULT '',
  abn              VARCHAR(20)  NOT NULL DEFAULT '',
  insurance_expiry DATE NULL DEFAULT NULL,
  status           ENUM('active','inactive') NOT NULL DEFAULT 'active',
  notes            TEXT NULL,
  created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_contractors_email (email),
  KEY idx_contractors_status (status),
  KEY idx_contractors_trade (trade)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Login accounts. role=admin (Scarlet Homes staff) or contractor (linked to contractors.id).
CREATE TABLE IF NOT EXISTS users (
  id                   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email                VARCHAR(190) NOT NULL,
  name                 VARCHAR(120) NOT NULL DEFAULT '',
  password_hash        VARCHAR(255) NOT NULL,
  role                 ENUM('admin','contractor') NOT NULL DEFAULT 'contractor',
  contractor_id        INT UNSIGNED NULL DEFAULT NULL,
  is_active            TINYINT(1) NOT NULL DEFAULT 1,
  must_change_password TINYINT(1) NOT NULL DEFAULT 0,
  last_login_at        DATETIME NULL DEFAULT NULL,
  created_at           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  UNIQUE KEY uq_users_contractor (contractor_id),
  CONSTRAINT fk_users_contractor FOREIGN KEY (contractor_id) REFERENCES contractors (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Not used in v1 (document uploads: insurance certificates, licences, SWMS ...).
CREATE TABLE IF NOT EXISTS contractor_documents (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  contractor_id  INT UNSIGNED NOT NULL,
  doc_type       VARCHAR(60)  NOT NULL,
  original_name  VARCHAR(255) NOT NULL,
  stored_name    VARCHAR(255) NOT NULL,
  mime_type      VARCHAR(100) NOT NULL DEFAULT '',
  size_bytes     INT UNSIGNED NOT NULL DEFAULT 0,
  expires_on     DATE NULL DEFAULT NULL,
  uploaded_by    INT UNSIGNED NULL DEFAULT NULL,
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_docs_contractor (contractor_id),
  CONSTRAINT fk_docs_contractor FOREIGN KEY (contractor_id) REFERENCES contractors (id) ON DELETE CASCADE,
  CONSTRAINT fk_docs_user FOREIGN KEY (uploaded_by) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact form submissions (/api/enquiry.php). ip_hash = SHA-256(ip + secret), used for rate limiting.
CREATE TABLE IF NOT EXISTS enquiries (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(120) NOT NULL,
  phone       VARCHAR(40)  NOT NULL,
  email       VARCHAR(190) NOT NULL,
  suburb      VARCHAR(120) NOT NULL DEFAULT '',
  service     VARCHAR(60)  NOT NULL DEFAULT '',
  message     TEXT NULL,
  page_url    VARCHAR(255) NOT NULL DEFAULT '',
  ip_hash     CHAR(64)     NOT NULL,
  user_agent  VARCHAR(255) NOT NULL DEFAULT '',
  mail_status ENUM('sent','failed','skipped') NOT NULL DEFAULT 'skipped',
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_enquiries_created (created_at),
  KEY idx_enquiries_ip (ip_hash, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Login rate limiting / lockout.
CREATE TABLE IF NOT EXISTS login_attempts (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  ip_hash     CHAR(64)     NOT NULL,
  email       VARCHAR(190) NOT NULL DEFAULT '',
  success     TINYINT(1)   NOT NULL DEFAULT 0,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_attempts_email (email, created_at),
  KEY idx_attempts_ip (ip_hash, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
