<?php

namespace App\Entity\Traits;

trait Counterparty
{

    /**
     * @ORM\Column(type="string", length=256)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=256, nullable=true)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    private $postIndex;

    /**
     * @ORM\Column(type="string", length=512, nullable=true)
     */
    private $address;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     */
    private $priority;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     */
    private $source;

    /**
     * @ORM\Column(type="string", length=256, nullable=true)
     */
    private $groupType;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): ?self
    {
        $this->name = $name;
        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): ?self
    {
        $this->city = $city;
        return $this;
    }

    public function getPostIndex(): ?string
    {
        return $this->postIndex;
    }

    public function setPostIndex(?string $post_index): ?self
    {
        $this->postIndex = $post_index;
        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->name;
    }

    public function setAddress(?string $address): ?self
    {
        $this->address = $address;
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

    public function getPriority(): ?string
    {
        return $this->priority;
    }

    public function setPriority(?string $priority): ?self
    {
        $this->priority = $priority;
        return $this;
    }

    public function getSource(): ?string
    {
        return $this->source;
    }

    public function setSource(?string $source): ?self
    {
        $this->source = $source;
        return $this;
    }

    public function getGroupType(): ?string
    {
        return $this->groupType;
    }

    public function setGroupType(?string $group_type): ?self
    {
        $this->groupType = $group_type;
        return $this;
    }

}