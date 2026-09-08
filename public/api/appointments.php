<?php
declare(strict_types=1);

ini_set('display_errors', '0');
ini_set('log_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(bool $ok, ?string $code = null, int $status = 200): never
{
    http_response_code($status);
    $body = ['ok' => $ok];
    if ($code !== null) {
        $body['code'] = $code;
    }
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_field(mixed $value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }
    $value = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '');
    return mb_substr($value, 0, $maxLength);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 'VALIDATION_ERROR', 405);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    respond(false, 'VALIDATION_ERROR', 422);
}

$name = clean_field($data['name'] ?? '', 80);
$phone = clean_field($data['phone'] ?? '', 30);
$service = clean_field($data['service'] ?? '', 160);
$doctor = clean_field($data['doctor'] ?? '', 120);
$comment = clean_field($data['comment'] ?? '', 500);
$website = clean_field($data['website'] ?? '', 200);
$consent = ($data['consent'] ?? false) === true;

if ($website !== '') {
    respond(true);
}

$phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
if ($name === '' || strlen($phoneDigits) < 10 || strlen($phoneDigits) > 15 || !$consent) {
    respond(false, 'VALIDATION_ERROR', 422);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/perfect-dental-' . hash('sha256', $ip) . '.rate';
$now = time();
$lastRequest = is_file($rateFile) ? (int) file_get_contents($rateFile) : 0;
if ($lastRequest > 0 && ($now - $lastRequest) < 45) {
    respond(false, 'RATE_LIMIT', 429);
}
@file_put_contents($rateFile, (string) $now, LOCK_EX);

$token = getenv('TELEGRAM_BOT_TOKEN') ?: '';
$chatId = getenv('TELEGRAM_CHAT_ID') ?: '';
if ($token === '' || $chatId === '') {
    @unlink($rateFile);
    respond(false, 'DELIVERY_ERROR', 503);
}

$escape = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$lines = [
    '<b>Новая заявка с perfectdental.kz</b>',
    '',
    '<b>Имя:</b> ' . $escape($name),
    '<b>Телефон:</b> ' . $escape($phone),
    '<b>Услуга:</b> ' . $escape($service !== '' ? $service : 'Первичная консультация'),
    '<b>Направление:</b> ' . $escape($doctor !== '' ? $doctor : 'Не выбрано'),
    '<b>Комментарий:</b> ' . $escape($comment !== '' ? $comment : 'Нет'),
];

$payload = json_encode([
    'chat_id' => $chatId,
    'text' => implode("\n", $lines),
    'parse_mode' => 'HTML',
    'disable_web_page_preview' => true,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$url = 'https://api.telegram.org/bot' . $token . '/sendMessage';
$delivered = false;
if (function_exists('curl_init')) {
    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
    ]);
    $response = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    curl_close($curl);
    $decoded = is_string($response) ? json_decode($response, true) : null;
    $delivered = $status >= 200 && $status < 300 && is_array($decoded) && ($decoded['ok'] ?? false) === true;
}

if (!$delivered) {
    @unlink($rateFile);
    respond(false, 'DELIVERY_ERROR', 502);
}

respond(true);
