<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SiteRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Site
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
     * @ORM\Column(type="string", length=128)
     */
    private $url;

    /**
     * @ORM\Column(type="integer")
     */
    private $orderIndex;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="sites")
     */
    private $client;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Contractor", inversedBy="sites")
     */
    private $contractor;

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

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(?string $url): ?self
    {
        $this->url = $url;
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

    public function json(): ?array
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'url' => $this->url,
            'orderIndex' => $this->orderIndex
        ];

    }

}
