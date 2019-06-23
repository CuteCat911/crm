<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MailRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Mail
{

    use \App\Entity\Traits\CreateUpdateTime;

    const STATUSES = [
        'delivered' => 2,
        'ok' => 2,
        'failed' => 3,
        'deferred' => 4,
        'hardbounce' => 5,
        'rejected' => 6,
        'complained' => 7,
        'spam' => 7
    ];

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $sendTime;

    /**
     * @ORM\Column(type="integer")
     */
    private $status;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $smtpData;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Email", inversedBy="mails")
     */
    private $email;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\MailingItem", inversedBy="mails")
     */
    private $mailingItem;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Event", mappedBy="mail")
     */
    private $event;

    public function __construct()
    {
        $this->status = 0;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSendTime()
    {
        return $this->sendTime;
    }

    public function setSendTime($time): ?self
    {
        $this->sendTime = $time;
        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(?int $status): ?self
    {
        $this->status = $status;
        return $this;
    }

    public function setTextStatus(?string $status): ?self
    {
        $this->status = self::STATUSES[$status];
        return $this;
    }

    public function getSmtpData(): ?array
    {
        return $this->smtpData;
    }

    public function setSmtpData(?array $data): ?self
    {
        $this->smtpData = $data;
        return $this;
    }

    public function getEmail(): ?Email
    {
        return $this->email;
    }

    public function setEmail(?Email $email): ?self
    {
        $this->email = $email;
        return $this;
    }

    public function getMailingItem(): ?MailingItem
    {
        return $this->mailingItem;
    }

    public function setMailingItem(?MailingItem $mailing_item): ?self
    {
        $this->mailingItem = $mailing_item;
        return $this;
    }

    public function getEvent(): ?Event
    {
        return $this->event;
    }

    public function json(): ?array
    {
        return [
            'id' => $this->id,
            'createdTime' => $this->createdTime ? $this->createdTime->format('Y-m-d H:i:s.uP') : null,
            'updatedTime' => $this->updatedTime ? $this->updatedTime->format('Y-m-d H:i:s.uP') : null,
            'sendTime' => $this->sendTime ? $this->sendTime->format('Y-m-d H:i:s.uP') : null,
            'status' => $this->status,
            'smtpData' => $this->smtpData,
            'email' => $this->email->json(),
            'mailingItem' => $this->mailingItem->json()
        ];
    }

}
