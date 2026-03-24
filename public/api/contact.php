<?php
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

$resendPayload = json_encode([
    'from' => 'RESQIO Kontaktformular <kontakt@resqio.io>',
    'to'   => ['markus@straub-it.de'],
    'subject' => 'Neue Kontaktanfrage von ' . $input['name'],
    'reply_to' => $input['email'],
    'html' => $htmlContent,
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $resendPayload,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer re_bCqQgZJy_GAZv4Ti5xtpEEUsvxXwvU2kV',
        'Content-Type: application/json',
    ],
    CURLOPT_TIMEOUT        => 10,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode([
        'error' => 'E-Mail konnte nicht gesendet werden.',
        'detail' => 'cURL error: ' . $curlError,
    ]);
    exit;
}

$resendData = json_decode($response, true);

if ($httpCode >= 400) {
    http_response_code(422);
    echo json_encode([
        'error' => 'E-Mail konnte nicht gesendet werden.',
        'detail' => $resendData['message'] ?? "HTTP $httpCode",
    ]);
    exit;
}

echo json_encode(['success' => true, 'emailId' => $resendData['id'] ?? null]);
