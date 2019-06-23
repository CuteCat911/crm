<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ContractorRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Contractor
{

    use \App\Entity\Traits\CreateUpdateTime;
    use \App\Entity\Traits\Counterparty;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Email", mappedBy="contractor")
     */
    private $emails;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Phone", mappedBy="contractor")
     */
    private $phones;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Site", mappedBy="contractor")
     */
    private $sites;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Social", mappedBy="contractor")
     */
    private $socials;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ContactPerson", mappedBy="contractor")
     */
    private $contactPersons;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Event", mappedBy="contractor")
     */
    private $events;

    public function __construct()
    {
        $this->emails = new ArrayCollection();
        $this->phones = new ArrayCollection();
        $this->sites = new ArrayCollection();
        $this->socials = new ArrayCollection();
        $this->contactPersons = new ArrayCollection();
        $this->events = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmails(): ?Collection
    {
        return $this->emails;
    }

    public function getPhones(): ?Collection
    {
        return $this->phones;
    }

    public function getSites(): ?Collection
    {
        return $this->sites;
    }

    public function getSocials(): ?Collection
    {
        return $this->socials;
    }

    public function getContactPersons(): ?Collection
    {
        return $this->contactPersons;
    }

    public function getEvents(): ?Collection
    {
        return $this->events;
    }

}
