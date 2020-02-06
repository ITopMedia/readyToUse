<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

require_once('PHPMailer.php');

$adminEmail = 'itop.web.dew.1@gmail.com';

if(isset($_POST['phone']) && $_POST['phone'] != ''){
    $phone = $_POST['phone'];
}
if(isset($_POST['name']) && $_POST['name'] != ''){
    $name = $_POST['name'];
}else{
    $name = '(не указано)';
}


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$email = new PHPMailer();
$email->CharSet = 'UTF-8';

try{

    $email->SetFrom('admin@site.dp.ua', 'TEST');


    $email->AddAddress( $adminEmail );
//    $email->AddAddress( 'itop.web.dew.1@gmail.com' ); // дополнительный получатель, виден в информации о письме
//    $email->AddBCC('itop.web.dew.1@gmail.com'); // скрытая отправка дубля письма
    $email->isHTML(true);

    if(isset($_POST['phone'])){
        $email->Subject   =  "Бронирование столика ";
        $msg = '';
        if(isset($name)){
            $msg .= "Имя клиента: $name<br />";
        }

        $msg .= "Телефон клиента: $phone<br />";
    }
    $email->Body = $msg;

    $email->Send();

}catch(Exception $e){
    echo "Message could not be sent. Mailer Error: {$email->ErrorInfo}";
}
echo json_encode(1);