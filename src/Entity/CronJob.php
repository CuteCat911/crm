<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CronJobRepository")
 * @ORM\HasLifecycleCallbacks
 */
class CronJob
{

    use \App\Entity\Traits\CreateUpdateTime;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=1024)
     */
    private $command;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $arguments;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $leadTime;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCommand(): ?string
    {
        return $this->command;
    }

    public function setCommand(?string $command): ?self
    {
        $this->command = $command;
        return $this;
    }

    public function getArguments(): ?array
    {
        return $this->arguments;
    }

    public function setArguments(?array $arguments): ?self
    {
        $this->arguments = $arguments;
        return $this;
    }

    public function getLeadTime()
    {
        return $this->leadTime;
    }

    public function setLeadTime($time): ?self
    {
        $this->leadTime = $time;
        return $this;
    }

}
