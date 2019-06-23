<?php

namespace App\Entity\Traits;

trait CreateUpdateTime
{

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $createdTime;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedTime;

    public function getCreatedTime()
    {
        return $this->createdTime;
    }

    public function setCreatedTime($time): ?self
    {
        $this->createdTime = $time;
        return $this;
    }

    public function getUpdatedTime()
    {
        return $this->updatedTime;
    }

    public function setUpdatedTime($time): ?self
    {
        $this->updatedTime = $time;
        return $this;
    }

    /**
     * @ORM\PrePersist
     */
    public function onPrePersist()
    {
        $this->setCreatedTime(new \DateTime("now"));
    }

    /**
     * @ORM\PreUpdate
     */
    public function onPreUpdate()
    {
        $this->setUpdatedTime(new \DateTime("now"));
    }

}