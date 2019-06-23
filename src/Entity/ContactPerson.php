<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ContactPersonRepository")
 * @ORM\HasLifecycleCallbacks
 */
class ContactPerson
{

    use \App\Entity\Traits\CreateUpdateTime;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=64, nullable=true)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     */
    private $patronymic;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     */
    private $position;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     */
    private $orderIndex;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Email", mappedBy="contactPerson")
     */
    private $emails;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Phone", mappedBy="contactPerson")
     */
    private $phones;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Social", mappedBy="contactPerson")
     */
    private $socials;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="contactPersons")
     */
    private $client;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Contractor", inversedBy="contactPersons")
     */
    private $contractor;

    public function __construct()
    {
        $this->orderIndex = 0;
        $this->emails = new ArrayCollection();
        $this->phones = new ArrayCollection();
        $this->socials = new ArrayCollection();
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

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $last_name): ?self
    {
        $this->lastName = $last_name;
        return $this;
    }

    public function getPatronymic(): ?string
    {
        return $this->patronymic;
    }

    public function setPatronymic(?string $patronymic): ?self
    {
        $this->patronymic = $patronymic;
        return $this;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(?string $position): ?self
    {
        $this->position = $position;
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

    public function getOrderIndex(): ?int
    {
        return $this->orderIndex;
    }

    public function setOrderIndex(?int $index): ?self
    {
        $this->orderIndex = $index;
        return $this;
    }

    public function getEmails(): ?Collection
    {
        return $this->emails;
    }

    public function getPhones(): ?Collection
    {
        return $this->phones;
    }

    public function getSocials(): ?Collection
    {
        return $this->socials;
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

    public function json(): ?array
    {

        $data = [
            'id' => $this->id,
            'createdTime' => $this->createdTime ? $this->createdTime->format('Y-m-d H:i:sP') : null,
            'updatedTime' => $this->updatedTime ? $this->updatedTime->format('Y-m-d H:i:sP') : null,
            'name' => $this->name,
            'lastName' => $this->lastName,
            'patronymic' => $this->patronymic,
            'position' => $this->position,
            'description' => $this->description,
            'orderIndex' => $this->orderIndex,
            'emails' => [],
            'phones' => [],
            'socials' => []
        ];

        foreach ($this->emails as $email) $data['emails'][] = $email->json();
        foreach ($this->phones as $phone) $data['phones'][] = $phone->json();
        foreach ($this->socials as $social) $data['socials'][] = $social->json();

        return $data;

    }

}
