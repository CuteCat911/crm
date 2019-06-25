<?php

namespace App\Service;

use App\Entity\Mail;

class MailService
{

    public function getMailsSmtpId($mails)
    {

        $ids = [];

        foreach ($mails as $mail) {
            $id = $this->getMailSmtpId($mail);
            if (!$id) continue;
            $ids[] = $id;
        }

        return $ids;

    }

    public function getMailSmtpId(Mail $mail)
    {

        $smtp_data = $mail->getSmtpData();
        return $smtp_data['email_id'];

    }

}