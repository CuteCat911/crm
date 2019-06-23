<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Templating\EngineInterface;
use App\Entity\MailingItem;
use App\Entity\Email;
use App\Entity\Mail;

class MailerService
{

    private $em;
    private $mailer;
    private $templating;
    private $eventService;

    public function __construct(EntityManagerInterface $em, \Swift_Mailer $swift_mailer, EngineInterface $templating, EventService $event_service)
    {
        $this->em = $em;
        $this->mailer = $swift_mailer;
        $this->templating = $templating;
        $this->eventService = $event_service;
    }

    public function sendMails(MailingItem $mailing_item)
    {

        $selected_emails = $mailing_item->getSelectedEmails();

        if (!count($selected_emails)) return false;

        foreach ($selected_emails as $email_id) {

            $email = $this->em->getRepository(Email::class)->find($email_id);
            $this->sendMail($email, $mailing_item);

        }

        return true;

    }

    public function sendMail(?Email $email, MailingItem $mailing_item)
    {

        $client = $email->getClient();
        $contractor = $email->getContractor();
        $template = $mailing_item->getMailing()->getTemplate();
        $template_name = $template->getServerName();
        $new_mail = new Mail();
        $new_mail->setEmail($email)->setMailingItem($mailing_item);
        $this->em->persist($new_mail);
        $this->em->flush();
        $theme = $mailing_item->getTheme();
        $twig_template = 'mailings/' . $template_name . '/' . $template_name . '.html.twig';
        $txt_template = 'mailings/' . $template_name . '/' . $template_name . '.txt.twig';
        $params = [
            'mail_id' => $new_mail->getId(),
            'theme' => $theme
        ];

        $message = (new \Swift_Message($theme))
            ->setFrom([
                'mailer@metalmax.ru' => 'MetalMax.ru'
            ])
            ->setTo($email->getEmail())
            ->setBody(
                $this->templating->render($twig_template, $params),
                'text/html'
            )
            ->addPart(
                $this->templating->render($txt_template, $params),
                'text/plain'
            )
        ;
        $this->mailer->send($message);
        $new_mail->setStatus(1)->setSendTime(new \DateTime());
        $this->em->flush();
        $mailing = $mailing_item->getMailing();
        $this->eventService->createEvent([
            'name' => 'Отправлено письмо из ' . $mailing->getName() . ', с темой письма: ' . $mailing_item->getTheme() . '. Для ' . $email->getEmail(),
            'status' => 1,
            'leadTime' => $new_mail->getSendTime(),
            'client' => $client ? $client : null,
            'contractor' => $contractor ? $contractor : null,
            'mail' => $new_mail
        ]);

        return true;

    }

}