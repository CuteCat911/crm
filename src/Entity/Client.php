<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ClientRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Client
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
     * @ORM\OneToMany(targetEntity="App\Entity\Email", mappedBy="client")
     */
    private $emails;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Phone", mappedBy="client")
     */
    private $phones;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Site", mappedBy="client")
     */
    private $sites;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Social", mappedBy="client")
     */
    private $socials;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ContactPerson", mappedBy="client")
     */
    private $contactPersons;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Event", mappedBy="client")
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

    public function json(): ?array
    {

        $data = [
            'id' => $this->id,
            'createdTime' => $this->createdTime ? $this->createdTime->format('Y-m-d H:i:sP') : null,
            'updatedTime' => $this->updatedTime ? $this->updatedTime->format('Y-m-d H:i:sP') : null,
            'name' => $this->name,
            'description' => $this->description,
            'priority' => $this->priority,
            'source' => $this->source,
            'groupType' => $this->groupType,
            'city' => $this->city,
            'postIndex' => $this->postIndex,
            'address' => $this->address,
            'emails' => [],
            'phones' => [],
            'sites' => [],
            'socials' => [],
            'contactPersons' => []
        ];

        foreach ($this->emails as $email) $data['emails'][] = $email->json();
        foreach ($this->phones as $phone) $data['phones'][] = $phone->json();
        foreach ($this->sites as $site) $data['sites'][] = $site->json();
        foreach ($this->socials as $social) $data['socials'][] = $social->json();
        foreach ($this->contactPersons as $contactPerson) $data['contactPersons'][] = $contactPerson->json();

        return $data;

    }

}
