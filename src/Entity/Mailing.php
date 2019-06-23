<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MailingRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Mailing
{

    use \App\Entity\Traits\CreateUpdateTime;

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
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $structure;

    /**
     * @ORM\Column(type="boolean")
     */
    private $archive;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\MailTemplate", inversedBy="mailings")
     */
    private $template;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\MailingItem", mappedBy="mailing")
     */
    private $mailingItems;

    public function __construct()
    {
        $this->structure = null;
        $this->archive = false;
        $this->mailingItems = new ArrayCollection();
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

    public function isArchive(): ?bool
    {
        return $this->archive;
    }

    public function setArchive(?bool $status): ?self
    {
        $this->archive = $status;
        return $this;
    }

    public function getStructure(): ?array
    {
        return $this->structure;
    }

    public function setStructure(?array $structure): ?self
    {
        $this->structure = $structure;
        return $this;
    }

    public function getTemplate(): ?MailTemplate
    {
        return $this->template;
    }

    public function setTemplate(?MailTemplate $template): ?self
    {
        $this->template = $template;
        return $this;
    }

    public function getMailingItems(): ?Collection
    {
        return $this->mailingItems;
    }

    public function json(): ?array
    {

        return [
            'id' => $this->id,
            'createdTime' => $this->createdTime ? $this->createdTime->format('Y-m-d H:i:sP') : null,
            'updatedTime' => $this->updatedTime ? $this->updatedTime->format('Y-m-d H:i:sP') : null,
            'name' => $this->name,
            'description' => $this->description,
            'structure' => $this->structure,
            'archive' => $this->archive,
            'template' => $this->template->json()
        ];

    }

}
