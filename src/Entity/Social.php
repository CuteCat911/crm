<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SocialRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Social
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
     * @ORM\Column(type="string", length=256)
     */
    private $link;

    /**
     * @ORM\Column(type="integer")
     */
    private $orderIndex;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="socials")
     */
    private $client;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Contractor", inversedBy="socials")
     */
    private $contractor;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ContactPerson", inversedBy="socials")
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

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(?string $link): ?self
    {
        $this->link = $link;
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
            'link' => $this->link,
            'orderIndex' => $this->orderIndex
        ];

    }

}
