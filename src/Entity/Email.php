<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EmailRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Email
{

    use \App\Entity\Traits\CreateUpdateTime;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=32)
     */
    private $hash;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $email;

    /**
     * @ORM\Column(type="integer")
     */
    private $orderIndex;

    /**
     * @ORM\Column(type="boolean")
     */
    private $subscribe;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="emails")
     */
    private $client;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Contractor", inversedBy="emails")
     */
    private $contractor;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ContactPerson", inversedBy="emails")
     */
    private $contactPerson;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Mail", mappedBy="email")
     */
    private $mails;

    public function __construct()
    {
        $this->hash = md5(microtime(1).rand(0, 99999999));
        $this->orderIndex = 0;
        $this->subscribe = true;
        $this->mails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHash(): ?string
    {
        return $this->hash;
    }

    public function setHash(): ?self
    {
        if ($this->hash) return $this;
        $this->hash = md5(microtime(1).rand(0, 99999999));
        return $this;
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): ?self
    {
        $this->email = $email;
        return $this;
    }

    public function getOrderIndex(): ?int
    {
        return $this->orderIndex;
    }

    public function setOrderIndex(?int $index): ?self
    {
        $this->orderIndex = $index;
        return $this;
    }

    public function isSubscribe(): ?bool
    {
        return $this->subscribe;
    }

    public function setSubscribe(?bool $status): ?self
    {
        $this->subscribe = $status;
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

    public function getContactPerson(): ?ContactPerson
    {
        return $this->contactPerson;
    }

    public function setContactPerson(?ContactPerson $person): ?self
    {
        $this->contactPerson = $person;
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
            'name' => $this->name,
            'email' => $this->email,
            'orderIndex' => $this->orderIndex
        ];

    }

}
