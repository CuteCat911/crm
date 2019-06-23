<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PhoneRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Phone
{

    use \App\Entity\Traits\CreateUpdateTime;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=24)
     */
    private $phone;

    /**
     * @ORM\Column(type="integer")
     */
    private $orderIndex;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="phones")
     */
    private $client;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Contractor", inversedBy="phones")
     */
    private $contractor;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ContactPerson", inversedBy="phones")
     */
    private $contactPerson;

    public function __construct()
    {
        $this->orderIndex = 0;
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

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): ?self
    {
        $this->phone = $phone;
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

    public function json(): ?array
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'orderIndex' => $this->orderIndex
        ];

    }

}
