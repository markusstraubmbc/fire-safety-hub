<?php
require_once __DIR__ . '/_mail.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['name']) || empty($input['email']) || empty($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, E-Mail und Nachricht sind Pflichtfelder.']);
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
    echo json_encode([
        'error' => 'E-Mail konnte nicht gesendet werden.',
        'detail' => $sendDetail,
    ]);
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
