<?php
require_once __DIR__ . '/_mail.php';

header('Content-Type: application/json; charset=utf-8');
// Kein CORS-Header: das Formular sendet von derselben Origin (/api/contact).
// Ein "Allow-Origin: *" haette fremden Seiten erlaubt, es aus dem Browser ihrer
// Besucher heraus fuer Spam zu missbrauchen.
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Einfaches Rate-Limit je IP (Dateisystem, kein Zusatzdienst noetig): das
// Formular verschickt auch eine Mail an eine frei waehlbare Adresse und waere
// sonst ein Spam-/Phishing-Relay ueber die eigene Absenderdomain.
function rate_limited(int $max, int $windowSeconds): bool {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $file = sys_get_temp_dir() . '/resqio-contact-' . hash('sha256', $ip) . '.json';
    $now = time();
    $hits = [];
    $fp = @fopen($file, 'c+');
    if ($fp === false) {
        return false; // im Zweifel lieber senden als Anfragen verlieren
    }
    flock($fp, LOCK_EX);
    $raw = stream_get_contents($fp);
    $list = json_decode($raw ?: '[]', true);
    if (is_array($list)) {
        $hits = array_values(array_filter($list, fn($t) => is_int($t) && $t > $now - $windowSeconds));
    }
    $limited = count($hits) >= $max;
    if (!$limited) {
        $hits[] = $now;
    }
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($hits));
    flock($fp, LOCK_UN);
    fclose($fp);
    return $limited;
}

if (rate_limited(5, 3600)) {
    http_response_code(429);
    echo json_encode(['error' => 'Zu viele Anfragen. Bitte versuchen Sie es später erneut oder schreiben Sie an kontakt@resqio.de.']);
    exit;
}

$raw = file_get_contents('php://input', false, null, 0, 20001);
if ($raw === false || strlen($raw) > 20000) {
    http_response_code(413);
    echo json_encode(['error' => 'Anfrage zu groß.']);
    exit;
}
$input = json_decode($raw, true);

// Nur Strings zulassen (Arrays/Objekte wuerden in htmlspecialchars() einen
// TypeError und damit einen 500 ausloesen) und Laengen begrenzen.
$limits = ['name' => 200, 'email' => 254, 'phone' => 50, 'feuerwehr' => 200, 'message' => 5000];
if (!is_array($input)) {
    $input = [];
}
foreach ($limits as $field => $max) {
    if (!isset($input[$field])) {
        $input[$field] = '';
    }
    if (!is_string($input[$field]) || mb_strlen($input[$field]) > $max) {
        http_response_code(400);
        echo json_encode(['error' => 'Ungültige Eingabe.']);
        exit;
    }
    $input[$field] = trim($input[$field]);
}

if ($input['name'] === '' || $input['email'] === '' || $input['message'] === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Name, E-Mail und Nachricht sind Pflichtfelder.']);
    exit;
}

if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Bitte geben Sie eine gültige E-Mail-Adresse an.']);
    exit;
}

$name = htmlspecialchars($input['name'], ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($input['email'], ENT_QUOTES, 'UTF-8');
$phone = !empty($input['phone']) ? htmlspecialchars($input['phone'], ENT_QUOTES, 'UTF-8') : '';
$feuerwehr = !empty($input['feuerwehr']) ? htmlspecialchars($input['feuerwehr'], ENT_QUOTES, 'UTF-8') : '';
$message = nl2br(htmlspecialchars($input['message'], ENT_QUOTES, 'UTF-8'));

$htmlContent = '
<h2>Neue Kontaktanfrage über resqio.de</h2>
<table style="border-collapse:collapse;width:100%;max-width:600px;">
  <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">' . $name . '</td></tr>
  <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">E-Mail</td><td style="padding:8px;border-bottom:1px solid #eee;">' . $email . '</td></tr>'
  . ($phone ? '<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;">' . $phone . '</td></tr>' : '')
  . ($feuerwehr ? '<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Feuerwehr</td><td style="padding:8px;border-bottom:1px solid #eee;">' . $feuerwehr . '</td></tr>' : '')
  . '<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nachricht</td><td style="padding:8px;border-bottom:1px solid #eee;">' . $message . '</td></tr>
</table>';

$confirmationHtml = '
<h2>Ihre Anfrage bei RESQIO</h2>
<p>Hallo ' . $name . ',</p>
<p>vielen Dank für Ihre Anfrage über resqio.de. Wir haben sie erhalten und melden uns
innerhalb von 24 Stunden bei Ihnen. Unten finden Sie eine Kopie Ihrer Nachricht.</p>
<table style="border-collapse:collapse;width:100%;max-width:600px;">
  <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">' . $name . '</td></tr>
  <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">E-Mail</td><td style="padding:8px;border-bottom:1px solid #eee;">' . $email . '</td></tr>'
  . ($phone ? '<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;">' . $phone . '</td></tr>' : '')
  . ($feuerwehr ? '<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Feuerwehr</td><td style="padding:8px;border-bottom:1px solid #eee;">' . $feuerwehr . '</td></tr>' : '')
  . '<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nachricht</td><td style="padding:8px;border-bottom:1px solid #eee;">' . $message . '</td></tr>
</table>
<p style="color:#666;font-size:12px;">Diese E-Mail wurde automatisch erzeugt. Antworten Sie
einfach darauf, wenn Sie etwas ergänzen möchten.</p>';

// Absender: Resend verschickt nur von dort verifizierten Domains, deshalb
// bleibt die alte .io-Adresse der Default – sie funktioniert. Sobald resqio.de
// in Resend verifiziert ist, reicht die Umgebungsvariable CONTACT_FROM.
// Die auf der Website beworbene Adresse ist davon unabhaengig kontakt@resqio.de.
$contactFrom = mail_setting('CONTACT_FROM', mail_config()['from'], 'RESQIO Kontaktformular <kontakt@resqio.io>');

// Interner Empfaenger der Anfragen.
$contactTo = mail_setting('CONTACT_TO', mail_config()['to'], 'markus@straub-it.de');

// Antwortadresse der Eingangsbestaetigung: die auf der Website beworbene
// Adresse, nicht die Resend-Absenderdomain.
$contactReplyTo = mail_setting('CONTACT_REPLY_TO', mail_config()['reply_to'], 'kontakt@resqio.de');

// Fallback-Key fuer Resend: steht auf ausdruecklichen Wunsch im Quelltext, damit
// das Formular ohne Konfiguration funktioniert. Er ist ueber die Git-Historie
// abrufbar. Vorrang haben RESEND_API_KEY und mail-config.json (resend.api_key).
$resendApiKey = getenv('RESEND_API_KEY') ?: 're_bCqQgZJy_GAZv4Ti5xtpEEUsvxXwvU2kV';

[$sent, $sendDetail, $sendId] = mail_send([
    'from' => $contactFrom,
    'to' => $contactTo,
    'subject' => 'Neue Kontaktanfrage von ' . $input['name'],
    'reply_to' => $input['email'],
    'html' => $htmlContent,
], $resendApiKey);

if (!$sent) {
    http_response_code(500);
    // Providerdetails (Fehlertexte von Resend/SMTP) gehoeren ins Log, nicht in die
    // Antwort an anonyme Besucher.
    error_log('Kontaktformular: Versand fehlgeschlagen: ' . $sendDetail);
    echo json_encode(['error' => 'E-Mail konnte nicht gesendet werden.']);
    exit;
}

// Eingangsbestaetigung an den Absender. Bewusst nachrangig: schlaegt sie fehl,
// bleibt die Anfrage erfolgreich - die eigentliche Benachrichtigung liegt dann
// schon im Postfach.
$confirmationSent = false;

if (filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    [$confirmationOk, $confirmationDetail] = mail_send([
        'from' => $contactFrom,
        'to' => $input['email'],
        'subject' => 'Ihre Anfrage bei RESQIO',
        'reply_to' => $contactReplyTo,
        'html' => $confirmationHtml,
    ], $resendApiKey);

    if ($confirmationOk) {
        $confirmationSent = true;
    } else {
        error_log('Mail-Bestaetigung fehlgeschlagen: ' . $confirmationDetail);
    }
} else {
    error_log('Keine Bestaetigung verschickt: unplausible Absenderadresse.');
}

echo json_encode([
    'success' => true,
    'emailId' => $sendId,
    'confirmationSent' => $confirmationSent,
]);
