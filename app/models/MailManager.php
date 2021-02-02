<?php


namespace app\models;

use Swift_Mailer as Mailer;
use Swift_SmtpTransport as Transport;
use Swift_Message as Message;

class MailManager
{


    public static function sendMail(string $text, string $email, string $name)
    {
        // TODO: upravit funkci pro skutečnou funkčnost
        $to = "garethjorensEMAIL";
        $subject = "Message from your website. ";
        $transport = (new Transport('localhost',1025));
        $mailer = new Mailer($transport);
        $message = (new Message($subject))
            ->setFrom([$email => $name])
            ->setTo([$to => "Gareth Jorden"])
            ->setBody($text);
        $mailer->send($message);
    }

}