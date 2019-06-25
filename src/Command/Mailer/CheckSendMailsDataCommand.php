<?php

namespace App\Command\Mailer;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\MailService;
use App\Service\Smtp2GoService;
use App\Entity\Mail;

class CheckSendMailsDataCommand extends ContainerAwareCommand
{

    private $em;
    private $mailService;
    private $smtpService;

    public function __construct(EntityManagerInterface $em, MailService $mail_service, Smtp2GoService $smtp_service)
    {
        $this->em = $em;
        $this->mailService = $mail_service;
        $this->smtpService = $smtp_service;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setName('mailer:checkSendMailsData');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $time_diff = '-7 days';
        $mails = $this->em->getRepository(Mail::class)->getSendMailsById($time_diff);
        $mails_smtp_ids = $this->mailService->getMailsSmtpId($mails);
        $smtp_data = json_decode($this->smtpService->getSendMailsData($time_diff, $mails_smtp_ids));

        if (!$smtp_data || !$smtp_data->data || !is_array($smtp_data->data->emails)) return false;

        $smtp_data_emails = $smtp_data->data->emails;

        foreach ($mails as $mail) {

            $mail_json_data = $mail->json();
            $smtp_email_id = $mail_json_data['smtpData']['email_id'];

            if (!$smtp_email_id) continue;

            foreach ($smtp_data_emails as $smtp_data_email) {

                if ($smtp_data_email->email_id !== $smtp_email_id) continue;

                $mail->setSmtpData((array)$smtp_data_email);
                if ($mail_json_data['status'] === 1 || $mail_json_data['status'] === 2) $mail->setTextStatus($smtp_data_email->status);

            }

        }

        $this->em->flush();

        return true;

    }

}