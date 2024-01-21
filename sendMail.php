<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $bowl = $_POST['smoothieName'];

    $content = 'Имя: ' . $name . ' ' . 'Телефон: ' . $phone . ' ' . 'Заказ: ' . $bowl;
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

    $success = mail("ekaterina.averkina@gmail.com", 'Новый заказ', $content);

    if ($success) {
        http_response_code(200);
        echo "Письмо отправлено";
    } else {
        http_response_code(500);
        echo "Письмо не отправлено";
    }
} else {
    http_response_code(403);
    echo("Данный метод запроса не поддерживается сервером");
}