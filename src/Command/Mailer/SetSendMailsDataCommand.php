<?php

namespace App\Command\Mailer;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Mail;
use App\Service\Smtp2GoService;

class SetSendMailsDataCommand extends ContainerAwareCommand
{

    private $em;
    private $smtpService;

    public function __construct(EntityManagerInterface $em, Smtp2GoService $smtp_service)
    {
        $this->em = $em;
        $this->smtpService = $smtp_service;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setName('mailer:setSendMailsData');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $time_diff = '-10 minutes';
        $mails = $this->em->getRepository(Mail::class)->getSendMails($time_diff);
        $smtp_data = json_decode($this->smtpService->getSendMailsData($time_diff));

        if (!$smtp_data || !$smtp_data->data || !is_array($smtp_data->data->emails)) return false;

        $smtp_data_emails = $smtp_data->data->emails;

        foreach ($mails as $mail) {

            $mail_json_data = $mail->json();

            if (is_array($mail_json_data['smtpData']) && $mail_json_data['smtpData']['email_id']) continue;

            $recipient = $mail_json_data['email']['email'];
            $send_time = new \DateTime($mail_json_data['sendTime']);

            foreach ($smtp_data_emails as $smtp_data_email) {

                $smtp_send_time = new \DateTime($smtp_data_email->email_ts);
                $date_diff = $smtp_send_time->diff($send_time);

                if ($recipient != $smtp_data_email->recipient) continue;
                if ($date_diff->y > 0 && $date_diff->m > 0 && $date_diff->d > 0 && $date_diff->h > 0 && $date_diff->i > 2) continue;

                $mail->setSmtpData((array)$smtp_data_email);

                if ($mail_json_data['status'] === 1) $mail->setTextStatus($smtp_data_email->status);

            }

        }

        $this->em->flush();

        return true;

    }

}