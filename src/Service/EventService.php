<?php

namespace App\Service;

use App\Entity\Mail;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Event;
use App\Entity\Client;
use App\Entity\Contractor;

class EventService
{

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    private function addClient(?Client $client, ?Event $event)
    {
        $event->setClient($client);
        return true;
    }

    private function addContractor(?Contractor $contractor, ?Event $event)
    {
        $event->setContractor($contractor);
        return true;
    }

    private function addMail(?Mail $mail, ?Event $event)
    {
        $event->setMail($mail);
        return true;
    }

    public function createEvent(?array $params)
    {

        if (!$params['name']) return false;

        $new_event = new Event();
        $new_event->setName($params['name']);

        if (array_key_exists('description', $params) && $params['description']) $new_event->setDescription($params['description']);
        if (array_key_exists('result', $params) &&$params['result']) $new_event->setResult($params['result']);
        if (array_key_exists('status', $params) &&$params['status']) $new_event->setStatus($params['status']);
        if (array_key_exists('leadTime', $params) &&$params['leadTime']) $new_event->setLeadTime($params['leadTime']);
        if (array_key_exists('client', $params) &&$params['client']) $this->addClient($params['client'], $new_event);
        if (array_key_exists('contractor', $params) &&$params['contractor']) $this->addContractor($params['contractor'], $new_event);
        if (array_key_exists('mail', $params) &&$params['mail']) $this->addMail($params['mail'], $new_event);

        $this->em->persist($new_event);
        $this->em->flush();

        return true;

    }

}