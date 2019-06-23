<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EventRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Event
{

    use \App\Entity\Traits\CreateUpdateTime;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=256)
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $result;

    /**
     * @ORM\Column(type="integer")
     */
    private $status;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $leadTime;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="events")
     */
    private $client;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Contractor", inversedBy="events")
     */
    private $contractor;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Mail", inversedBy="event")
     */
    private $mail;

    public function __construct()
    {
        $this->status = 0;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): ?self
    {
        $this->name = $name;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): ?self
    {
        $this->description = $description;
        return $this;
    }

    public function getResult(): ?string
    {
        return $this->result;
    }

    public function setResult(?string $result): ?self
    {
        $this->result = $result;
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

    public function getLeadTime()
    {
        return $this->leadTime;
    }

    public function setLeadTime($time): ?self
    {
        $this->leadTime = $time;
        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): ?self
    {
        $this->client = $client;
        return $this;
    }

    public function getContractor(): ?Contractor
    {
        return $this->contractor;
    }

    public function setContractor(?Contractor $contractor): ?self
    {
        $this->contractor = $contractor;
        return $this;
    }

    public function getMail(): ?Mail
    {
        return $this->mail;
    }

    public function setMail(?Mail $mail): ?self
    {
        $this->mail = $mail;
        return $this;
    }

}
