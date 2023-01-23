<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass:"App\Repository\TravelerRepository")]
class Traveler
{
    #[ORM\Id()]
    #[ORM\GeneratedValue()]
    #[ORM\Column()]
    private ?int $id = null;

    #[ORM\Column(nullable:true)]
    private ?string $email = null;

    #[ORM\Column(nullable:true)]
    private ?string $firstname = null;

    #[ORM\Column(nullable:true)]
    private ?string $lastname = null;

    #[ORM\Column(nullable:true)]
    private ?string $fullname = null;

    #[ORM\Column(nullable:true)]
    private ?string $link = null;

    #[ORM\ManyToMany(targetEntity:"App\Entity\TravelGroup", mappedBy:"travelers")]
    private Collection $travelgroups;

    #[ORM\Column()]
    private bool $isActive = false;

    #[ORM\Column()]
    private bool $isGuide = false;

    #[ORM\Column()]
    private bool $isContacted = false;

    #[ORM\Column(nullable:true)]
    private ?string $program = null;

    #[ORM\Column(type:"datetime", options: ["default" => "CURRENT_TIMESTAMP"])]
    private ?\DateTimeInterface $created_at = null;

    public function __construct()
    {
        $this->travelgroups = new ArrayCollection();
        $this->adventures = new ArrayCollection();
    }

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

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setFullname(string $fullname): self
    {
        $this->fullname = $fullname;

        return $this;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(string $link): self
    {
        $this->link = $link;

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
     * @return mixed
     */
    public function getIsActive()
    {
        return $this->isActive;
    }

    public function setIsActive(mixed $isActive): void
    {
        $this->isActive = $isActive;
    }

    /**
     * @return mixed
     */
    public function getIsGuide()
    {
        return $this->isGuide;
    }

    public function setIsGuide(mixed $isGuide): void
    {
        $this->isGuide = $isGuide;
    }

    /**
     * @return Collection|Travelgroup[]
     */
    public function getTravelGroups(): Collection
    {
        return $this->travelgroups;
    }

    public function addTravelGroup(TravelGroup $travelGroup): self
    {
        if (!$this->travelgroups->contains($travelGroup)) {
            $this->travelgroups[] = $travelGroup;
            $travelGroup->addTraveler($this);
        }

        return $this;
    }

    public function removeTravelGroup(TravelGroup $travelGroup): self
    {
        if ($this->travelgroups->contains($travelGroup)) {
            $this->travelgroups->removeElement($travelGroup);
            $travelGroup->removeTraveler($this);
        }

        return $this;
    }

    /**
     * @return mixed
     */
    public function getisContacted()
    {
        return $this->isContacted;
    }

    public function setIsContacted(mixed $isContacted): void
    {
        $this->isContacted = $isContacted;
    }

    /**
     * @return mixed
     */
    public function getProgram()
    {
        return $this->program;
    }

    public function setProgram(mixed $program): void
    {
        $this->program = $program;
    }
}
