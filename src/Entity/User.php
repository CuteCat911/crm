<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\HasLifecycleCallbacks
 */
class User implements UserInterface, \Serializable
{

    use \App\Entity\Traits\CreateUpdateTime;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=128, unique=true)
     */
    private $login;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $password;

    /**
     * @ORM\Column(type="array")
     */
    private $roles;

    /**
     * @ORM\Column(type="boolean")
     */
    private $blocked;

    /**
     * @ORM\Column(type="integer")
     */
    private $sessionTime;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $lastActionTime;

    /**
     * @ORM\Column(type="string", length=64)
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
     * @ORM\OneToMany(targetEntity="App\Entity\MailingItem", mappedBy="sender")
     */
    private $sendMailings;

    public function __construct()
    {
        $this->roles = ["ROLE_USER"];
        $this->blocked = false;
        $this->sessionTime = 1200000;
        $this->sendMailings = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->login;
    }

    public function getLogin(): ?string
    {
        return $this->login;
    }

    public function setLogin(?string $login): ?self
    {
        $this->login = $login;
        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): ?self
    {
        $this->password = $password;
        return $this;
    }

    public function getRoles(): ?array
    {
        return $this->roles;
    }

    public function setRoles(?array $roles): ?self
    {
        $this->roles = $roles;
        return $this;
    }

    public function isBlocked(): ?bool
    {
        return $this->blocked;
    }

    public function setBlocked(?bool $status): ?self
    {
        $this->blocked = $status;
        return $this;
    }

    public function getSessionTime(): ?int
    {
        return $this->sessionTime;
    }

    public function setSessionTime(?int $time): ?self
    {
        $this->sessionTime = $time;
        return $this;
    }

    public function getLastActionTime()
    {
        return $this->lastActionTime;
    }

    public function setLastActionTime($time): ?self
    {
        $this->lastActionTime = $time;
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

    public function eraseCredentials() {}

    public function getSalt()
    {
        return null;
    }

    public function serialize()
    {
        return serialize([
            $this->id,
            $this->login,
            $this->password
        ]);
    }

    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->login,
            $this->password
            ) = unserialize($serialized);
    }

    public function getSendMailings(): ?Collection
    {
        return $this->sendMailings;
    }

    public function json(): ?array
    {
        return [
            'id' => $this->id,
            'createdTime' => $this->createdTime ? $this->createdTime->format('Y-m-d H:i:s.uP') : null,
            'updatedTime' => $this->updatedTime ? $this->updatedTime->format('Y-m-d H:i:s.uP') : null,
            'login' => $this->login,
            'roles' => $this->roles,
            'sessionTime' => $this->sessionTime,
            'lastActionTime' => $this->lastActionTime ? $this->lastActionTime('Y-m-d H:i:s.uP') : null,
            'name' => $this->name,
            'lastName' => $this->lastName,
            'patronymic' => $this->patronymic,
            'position' => $this->position
        ];
    }

}
