<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MailTemplateRepository")
 */
class MailTemplate
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=128)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=256)
     */
    private $serverName;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Mailing", mappedBy="template")
     */
    private $mailings;

    public function __construct()
    {
        $this->mailings = new ArrayCollection();
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

    public function getServerName(): ?string
    {
        return $this->serverName;
    }

    public function setServerName(?string $name): ?self
    {
        $this->serverName = $name;
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

    public function getMailings(): ?Collection
    {
        return $this->mailings;
    }

    public function json(): ?array
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'serverName' => $this->serverName,
            'description' => $this->description
        ];

    }

}
