<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass="App\Repository\TravelerRepository")
 */
class Traveler
{

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $fullname;


    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $link;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\TravelGroup", mappedBy="travelers")
     * @var Collection
     */
    private $travelgroups;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Adventure", mappedBy="travelers")
     * @var Collection
     */
    private $adventures;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Badge", mappedBy="travelers")
     */
    private $badges;


    /**
     * @ORM\Column(type="boolean")
     */
    private $isActive = false;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isGuide = false;

    /**
     * @ORM\Column(type="datetime", options={"default": "CURRENT_TIMESTAMP"})
     */
    private $created_at;

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

    /**
     * @param mixed $isActive
     */
    public function setIsActive($isActive): void
    {
        $this->isActive= $isActive;
    }

    /**
     * @return mixed
     */
    public function getIsGuide()
    {
        return $this->isGuide;
    }

    /**
     * @param mixed $isGuide
     */
    public function setIsGuide($isGuide): void
    {
        $this->isGuide= $isGuide;
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
     * @return Collection|adventures[]
     */
    public function getAdventures(): Collection
    {
        return $this->adventures;
    }
    public function addAdventure(Adventure $adventure): self
    {
        if (!$this->adventures->contains($adventure)) {
            $this->adventures[] = $adventure;
            $adventure->addTraveler($this);
        }
        return $this;
    }
    public function removeAdventure(TravelGroup $adventure): self
    {
        if ($this->adventures->contains($adventure)) {
            $this->adventures->removeElement($adventure);
            $adventure->removeTraveler($this);
        }
        return $this;
    }

    /**
     * @return Collection|badges[]
     */
    public function getBadges(): Collection
    {
        return $this->badges;
    }
    public function addBadge(Adventure $badge): self
    {
        if (!$this->badges->contains($badge)) {
            $this->badges[] = $badge;
            $badge->addTraveler($this);
        }
        return $this;
    }
    public function removeBadge(TravelGroup $badge): self
    {
        if ($this->badges->contains($badge)) {
            $this->badges->removeElement($badge);
            $badge->removeTraveler($this);
        }
        return $this;
    }


}