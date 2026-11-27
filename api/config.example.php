<?php
/*
 * Copy to config.php (same folder) and fill in. config.php is git-ignored and blocked by .htaccess.
 */
return [
    // hPanel -> Databases -> MySQL Databases (Hostinger uses "localhost")
    'db' => [
        'host'    => 'localhost',
        'port'    => 3306,
        'name'    => 'u000000000_scarlet',
        'user'    => 'u000000000_scarlet',
        'pass'    => 'CHANGE-ME',
        'charset' => 'utf8mb4',
    ],

    // Public site URL (no trailing slash). Used for the Origin check and in emails.
    'site_url' => 'https://scarlethomes.com.au',

    // Long random string (e.g. `php -r "echo bin2hex(random_bytes(32));"`). Used to hash IPs.
    'app_secret' => 'CHANGE-ME-TO-A-LONG-RANDOM-STRING',

    'mail' => [
        'to'        => 'info@scarlethomes.com.au',
        'from'      => 'website@scarlethomes.com.au',   // must be a mailbox on your domain
        'from_name' => 'Scarlet Homes Website',
        // 'mail' = PHP mail() (works on Hostinger), 'smtp' = authenticated SMTP below
        'transport' => 'smtp',
        'smtp' => [
            'host'       => 'smtp.hostinger.com',
            'port'       => 465,
            'encryption' => 'ssl',      // 'ssl' (465) or 'tls' (587, STARTTLS)
            'user'       => 'website@scarlethomes.com.au',
            'pass'       => 'CHANGE-ME',
            'timeout'    => 15,
        ],
    ],

    // Portal file uploads (project plans, completion files, check-out photos). Must NOT be
    // web-accessible: the default api/storage/uploads is blocked by .htaccess. Better: a folder
    // outside public_html, e.g. '/home/u000000000/domains/scarlethomes.com.au/storage/uploads'.
    // Copy the old site's storage/app/public/* here to keep existing attachments.
    'uploads_dir'   => null,
    'max_upload_mb' => 20,

    // Dates shown/recorded for bookings (booked_on, worked_on, completed_on)
    'timezone' => 'Australia/Sydney',

    'enquiry' => [
        'max_per_hour_per_ip' => 5,
    ],

    'auth' => [
        'session_name'          => 'SHPORTAL',
        'idle_timeout_minutes'  => 30,
        'max_fails_per_email'   => 5,    // within the window below -> account temporarily locked
        'max_fails_per_ip'      => 20,
        'lockout_window_minutes'=> 15,
    ],

    // One-time admin setup over the web (api/setup/create-admin.php) is only possible while this
    // is a non-empty string AND no admin exists. Leave '' if you can use SSH (CLI mode).
    'setup_token' => '',

    // Only when the website runs as a Node.js app (web/server.js, env PROXY_SECRET) and this
    // API is on a separate PHP site: the same long random string as PROXY_SECRET. Otherwise ''.
    'proxy_secret' => '',

    // Local development only: allow the Next.js dev server origin (e.g. 'http://localhost:3000').
    'dev_cors_origin' => '',

    // false on production. true only for local http:// testing (cookie without Secure flag).
    'insecure_cookies' => false,
];
