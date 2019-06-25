<?php

namespace App\Command\Mailer;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\MailingItem;
use App\Service\CronJobService;
use App\Service\MailerService;

class AddSendScheduledMailsCommand extends ContainerAwareCommand
{

    private $em;
    private $mailer;
    private $cronJobService;

    public function __construct(EntityManagerInterface $em, MailerService $mailer, CronJobService $cron_job_service)
    {
        $this->em = $em;
        $this->mailer = $mailer;
        $this->cronJobService = $cron_job_service;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setName('mailer:addSendScheduledMails')
            ->addArgument('mailingItemId', InputArgument::REQUIRED)
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $id = $input->getArgument('mailingItemId');
        $mailing_item = $this->em->getRepository(MailingItem::class)->find($id);

        if (!$mailing_item) return false;
        if ($mailing_item->getStatus() == 1) return false;

        $this->mailer->sendMails($mailing_item);
        $mailing_item->setStatus(1);
        $this->cronJobService->createDelayJob('mailer:setSendMailsData', '+5 minutes');
        $this->em->flush();

        return true;

    }

}