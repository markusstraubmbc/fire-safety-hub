<?php
/**
 * Mailversand fuer das Kontaktformular: Resend, Brevo (API) oder SMTP.
 *
 * Konfiguration steht in mail-config.json AUSSERHALB des Web-Roots
 * (<Domain-Ordner>/resqio-config/mail-config.json bzw. $RESQIO_CONFIG_DIR).
 * Dort ueberlebt sie jedes Redeploy und jeden Build, und nginx kann sie nicht
 * ausliefern (statische Dateien im Web-Root umgehen .htaccess).
 *
 * Fehlt die Datei, wird sie mit leeren Werten angelegt. Leere Werte heissen
 * "nicht gesetzt" und fallen auf Umgebungsvariable bzw. Standard zurueck.
 * Rangfolge je Wert: Umgebungsvariable > mail-config.json > Standard.
 *
 * Brevo laesst sich auf zwei Wegen nutzen:
 *   "provider": "brevo" + brevo.api_key      (HTTP-API, kein SMTP noetig)
 *   "provider": "smtp"  + smtp.host "smtp-relay.brevo.com", Port 587, "tls",
 *                         Benutzername = Brevo-Login, Passwort = SMTP-Key
 */

const MAIL_CONFIG_TEMPLATE = [
    'provider' => '',          // resend | brevo | smtp   (leer = resend)
    'from' => '',              // z. B. "RESQIO Kontaktformular <kontakt@resqio.de>"
    'to' => '',                // interner Empfaenger der Anfragen
    'reply_to' => '',          // Antwortadresse der Eingangsbestaetigung
    'resend' => ['api_key' => ''],
    'brevo' => ['api_key' => ''],
    'smtp' => [
        'host' => '',
        'port' => 587,
        'encryption' => 'tls', // tls (STARTTLS) | ssl (Port 465) | none
        'username' => '',
        'password' => '',
    ],
];

function mail_config_path(): ?string {
    $dir = getenv('RESQIO_CONFIG_DIR');
    if (!$dir) {
        $root = $_SERVER['DOCUMENT_ROOT'] ?? '';
        if ($root === '') {
            return null;
        }
        $dir = dirname(rtrim($root, '/')) . '/resqio-config';
    }
    return rtrim($dir, '/') . '/mail-config.json';
}

/** Liest die Konfiguration; legt sie leer an, wenn sie fehlt. Wirft nie. */
function mail_config(): array {
    static $cfg = null;
    if ($cfg !== null) {
        return $cfg;
    }
    $cfg = MAIL_CONFIG_TEMPLATE;
    $path = mail_config_path();
    if ($path === null) {
        return $cfg;
    }
    if (!file_exists($path)) {
        $dir = dirname($path);
        if (!is_dir($dir)) {
            @mkdir($dir, 0700, true);
        }
        $json = json_encode(MAIL_CONFIG_TEMPLATE, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n";
        if (@file_put_contents($path, $json, LOCK_EX) !== false) {
            @chmod($path, 0600);
        } else {
            error_log('mail-config: ' . $path . ' kann nicht angelegt werden');
        }
        return $cfg;
    }
    $data = json_decode((string) @file_get_contents($path), true);
    if (!is_array($data)) {
        error_log('mail-config: ' . $path . ' ist kein gueltiges JSON');
        return $cfg;
    }
    return array_replace_recursive($cfg, $data);
}

/** Erster nicht-leerer Wert: Umgebungsvariable, dann JSON, dann Standard. */
function mail_setting(string $env, $jsonValue, $default = '') {
    $e = getenv($env);
    if ($e !== false && $e !== '') {
        return $e;
    }
    if ($jsonValue !== null && $jsonValue !== '') {
        return $jsonValue;
    }
    return $default;
}

function mail_clean_header(string $v): string {
    return trim(str_replace(["\r", "\n"], ' ', $v));
}

/** "Name <a@b.de>" -> [Name, a@b.de] */
function mail_split_address(string $addr): array {
    if (preg_match('/^\s*(.*?)\s*<([^>]+)>\s*$/', $addr, $m)) {
        return [trim($m[1], " \t\"'"), trim($m[2])];
    }
    return ['', trim($addr)];
}

/**
 * Verschickt eine Mail ueber den konfigurierten Weg.
 * $msg: from, to, reply_to, subject, html (alles Strings).
 * $resendFallbackKey: Resend-Key, der gilt, wenn weder Umgebungsvariable noch
 * mail-config.json einen liefern (steht in contact.php, nicht hier).
 * Rueckgabe: [bool $ok, string $detail, ?string $id]
 */
function mail_send(array $msg, string $resendFallbackKey = ''): array {
    $cfg = mail_config();
    $provider = strtolower((string) mail_setting('MAIL_PROVIDER', $cfg['provider'], 'resend'));
    $html = $msg['html'];
    $msg = array_map('mail_clean_header', array_diff_key($msg, ['html' => 1]));
    $msg['html'] = $html;

    switch ($provider) {
        case 'smtp':
            return mail_via_smtp($msg, $cfg['smtp']);
        case 'brevo':
            return mail_via_brevo($msg, (string) mail_setting('BREVO_API_KEY', $cfg['brevo']['api_key']));
        case 'resend':
            return mail_via_resend($msg, (string) mail_setting('RESEND_API_KEY', $cfg['resend']['api_key'], $resendFallbackKey));
        default:
            return [false, "Unbekannter Mail-Provider: $provider", null];
    }
}

function mail_http_json(string $url, array $headers, array $payload): array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => array_merge(['Content-Type: application/json', 'Accept: application/json'], $headers),
        CURLOPT_TIMEOUT => 10,
    ]);
    $response = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    if ($err) {
        return [false, 'cURL error: ' . $err, null];
    }
    $data = json_decode((string) $response, true) ?: [];
    if ($code >= 400) {
        return [false, (string) ($data['message'] ?? "HTTP $code"), null];
    }
    return [true, '', $data['id'] ?? $data['messageId'] ?? null];
}

function mail_via_resend(array $m, string $apiKey): array {
    if ($apiKey === '') {
        return [false, 'Resend: kein API-Key konfiguriert', null];
    }
    return mail_http_json('https://api.resend.com/emails', ['Authorization: Bearer ' . $apiKey], [
        'from' => $m['from'],
        'to' => [$m['to']],
        'subject' => $m['subject'],
        'reply_to' => $m['reply_to'],
        'html' => $m['html'],
    ]);
}

function mail_via_brevo(array $m, string $apiKey): array {
    if ($apiKey === '') {
        return [false, 'Brevo: kein API-Key konfiguriert', null];
    }
    [$fromName, $fromEmail] = mail_split_address($m['from']);
    $payload = [
        'sender' => array_filter(['name' => $fromName, 'email' => $fromEmail]),
        'to' => [['email' => mail_split_address($m['to'])[1]]],
        'subject' => $m['subject'],
        'htmlContent' => $m['html'],
    ];
    if ($m['reply_to'] !== '') {
        $payload['replyTo'] = ['email' => mail_split_address($m['reply_to'])[1]];
    }
    return mail_http_json('https://api.brevo.com/v3/smtp/email', ['api-key: ' . $apiKey], $payload);
}

/** Liest eine (ggf. mehrzeilige) SMTP-Antwort; liefert [code, text]. */
function smtp_read($fp): array {
    $text = '';
    while (($line = fgets($fp, 1024)) !== false) {
        $text .= $line;
        if (strlen($line) < 4 || $line[3] !== '-') {
            break;
        }
    }
    return [(int) substr($text, 0, 3), trim($text)];
}

function smtp_cmd($fp, string $cmd, array $okCodes): array {
    fwrite($fp, $cmd . "\r\n");
    $r = smtp_read($fp);
    if (!in_array($r[0], $okCodes, true)) {
        throw new RuntimeException('SMTP: ' . ($r[1] ?: 'keine Antwort') . ' (auf ' . strtok($cmd, ' ') . ')');
    }
    return $r;
}

function mail_via_smtp(array $m, array $s): array {
    $host = (string) mail_setting('SMTP_HOST', $s['host']);
    $port = (int) mail_setting('SMTP_PORT', $s['port'], 587);
    $enc = strtolower((string) mail_setting('SMTP_ENCRYPTION', $s['encryption'], 'tls'));
    $user = (string) mail_setting('SMTP_USERNAME', $s['username']);
    $pass = (string) mail_setting('SMTP_PASSWORD', $s['password']);
    if ($host === '') {
        return [false, 'SMTP: kein Host konfiguriert', null];
    }

    $fp = null;
    try {
        $fp = @stream_socket_client(($enc === 'ssl' ? 'ssl://' : 'tcp://') . "$host:$port", $errno, $errstr, 10);
        if (!$fp) {
            throw new RuntimeException("SMTP: Verbindung zu $host:$port fehlgeschlagen ($errstr)");
        }
        stream_set_timeout($fp, 10);
        $r = smtp_read($fp);
        if ($r[0] !== 220) {
            throw new RuntimeException('SMTP: ' . $r[1]);
        }
        $ehlo = 'EHLO ' . (preg_replace('/[^a-z0-9.\-]/i', '', $_SERVER['SERVER_NAME'] ?? '') ?: 'localhost');
        smtp_cmd($fp, $ehlo, [250]);
        if ($enc === 'tls') {
            smtp_cmd($fp, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('SMTP: STARTTLS fehlgeschlagen');
            }
            smtp_cmd($fp, $ehlo, [250]);
        }
        if ($user !== '') {
            smtp_cmd($fp, 'AUTH LOGIN', [334]);
            smtp_cmd($fp, base64_encode($user), [334]);
            smtp_cmd($fp, base64_encode($pass), [235]);
        }
        [$fromName, $fromEmail] = mail_split_address($m['from']);
        $toEmail = mail_split_address($m['to'])[1];
        smtp_cmd($fp, "MAIL FROM:<$fromEmail>", [250]);
        smtp_cmd($fp, "RCPT TO:<$toEmail>", [250, 251]);
        smtp_cmd($fp, 'DATA', [354]);

        $id = bin2hex(random_bytes(12)) . '@' . substr(strrchr($fromEmail, '@') ?: '@localhost', 1);
        $headers = [
            'Date: ' . date('r'),
            'From: ' . ($fromName !== '' ? '=?UTF-8?B?' . base64_encode($fromName) . "?= <$fromEmail>" : $fromEmail),
            "To: $toEmail",
            'Subject: =?UTF-8?B?' . base64_encode($m['subject']) . '?=',
            "Message-ID: <$id>",
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'Content-Transfer-Encoding: base64',
        ];
        if ($m['reply_to'] !== '') {
            $headers[] = 'Reply-To: ' . mail_split_address($m['reply_to'])[1];
        }
        // Base64-Koerper: kein Dot-Stuffing noetig, keine Zeile ueber 76 Zeichen.
        $body = chunk_split(base64_encode($m['html']), 76, "\r\n");
        fwrite($fp, implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.\r\n");
        $r = smtp_read($fp);
        if ($r[0] !== 250) {
            throw new RuntimeException('SMTP: ' . $r[1]);
        }
        @fwrite($fp, "QUIT\r\n");
        fclose($fp);
        return [true, '', $id];
    } catch (Throwable $e) {
        if (is_resource($fp)) {
            fclose($fp);
        }
        return [false, $e->getMessage(), null];
    }
}
