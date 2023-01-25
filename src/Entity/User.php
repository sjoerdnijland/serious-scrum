<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass:"App\Repository\UserRepository")]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id()]
    #[ORM\GeneratedValue()]
    #[ORM\Column()]
    private ?int $id = null;

    #[ORM\Column(nullable:true)]
    private ?string $email = null;

    #[ORM\Column(nullable:true)]
    private ?string $fullname = null;

    #[ORM\Column(nullable:true)]
    #[Assert\Url(message: "The avatar '{{ value }}' is not a valid url")]
    private ?string $avatar = null;

    #[ORM\Column(type:"json")]
    private array $roles = [];

    #[ORM\Column(type:"datetime")]
    private ?\DateTimeInterface $created_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getFullname(): ?string
    {
        return $this->fullname;
    }

    public function setFullname(string $fullname): self
    {
        $this->fullname = $fullname;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    /**
     * @return (Role|string)[] The user roles
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles)
    {
        $this->roles = $roles;

        // allows for chaining
        return $this;
    }

    /**
     * Returns the username used to authenticate the user.
     *
     * @return string The username
     */
    public function getUsername()
    {
        return $this->email;
    }

    /**
     * Returns the identifier used to authenticate the user.
     *
     * @return string The identifier
     */
    public function getUserIdentifier()
    {
        return $this->email;
    }

    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    public function getSalt(): ?string
    {
        // TODO: Implement getSalt() method.
        return null;
    }

    public function getPassword(): ?string
    {
        // TODO: Implement getPassword() method.
        return null;
    }




}
