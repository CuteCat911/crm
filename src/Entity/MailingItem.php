<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MailingItemRepository")
 * @ORM\HasLifecycleCallbacks
 */
class MailingItem
{

    use \App\Entity\Traits\CreateUpdateTime;

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
     * @ORM\Column(type="boolean")
     */
    private $nowSend;

    /**
     * @ORM\Column(type="integer")
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=256)
     */
    private $theme;

    /**
     * @ORM\Column(type="array")
     */
    private $selectedEmails;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Mailing", inversedBy="mailingItems")
     */
    private $mailing;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Mail", mappedBy="mailingItem")
     */
    private $mails;

    public function __construct()
    {
        $this->nowSend = false;
        $this->status = 0;
        $this->selectedEmails = [];
        $this->mails = new ArrayCollection();
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

    public function isNowSend(): ?bool
    {
        return $this->nowSend;
    }

    public function setNowSend(?bool $status): ?self
    {
        $this->nowSend = $status;
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

    public function getTheme(): ?string
    {
        return $this->theme;
    }

    public function setTheme(?string $theme): ?self
    {
        $this->theme= $theme;
        return $this;
    }

    public function getSelectedEmails(): ?array
    {
        return $this->selectedEmails;
    }

    public function setSelectedEmails(?array $emails): ?self
    {
        $this->selectedEmails = $emails;
        return $this;
    }

    public function getMailing(): ?Mailing
    {
        return $this->mailing;
    }

    public function setMailing(?Mailing $mailing): ?self
    {
        $this->mailing = $mailing;
        return $this;
    }

    public function getMails(): ?Collection
    {
        return $this->mails;
    }

    public function json(): ?array
    {
        return [
            'id' => $this->id,
            'createdTime' => $this->createdTime ? $this->createdTime->format('Y-m-d H:i:s.uP') : null,
            'updatedTime' => $this->updatedTime ? $this->updatedTime->format('Y-m-d H:i:s.uP') : null,
            'sendTime' => $this->sendTime ? $this->sendTime->format('Y-m-d H:i:s.uP') : null,
            'nowSend' => $this->nowSend,
            'status' => $this->status,
            'theme' => $this->theme,
            'mailing' => $this->mailing->json(),
            'selectedEmails' => $this->selectedEmails
        ];
    }

}
