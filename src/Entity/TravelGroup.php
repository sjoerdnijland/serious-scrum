<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;


/**
 * @ORM\Entity(repositoryClass="App\Repository\TravelgroupRepository")
 */
class TravelGroup
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
    private $groupname;


    /**
     * @ORM\Column(type="boolean")
     */
    private $isActive = false;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isWaitingList = false;


    /**
     * @ORM\Column(type="datetime", options={"default": "CURRENT_TIMESTAMP"})
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $launch_at;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $conferenceLink;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Traveler", inversedBy="travelgroups")
     * @var Collection
     */
    private $travelers;

    /**
     * @ORM\Column(type="integer", length=8)
     */
    private $priceTotal;

    /**
     * @ORM\Column(type="integer", length=8)
     */
    private $pricePerMonth;

    public function __construct()
    {
        $this->travelers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getGroupname(): ?string
    {
        return $this->groupname;
    }

    public function setGroupname(string $groupname): self
    {
        $this->groupname = $groupname;

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

    public function getLaunchAt(): ?\DateTimeInterface
    {
        return $this->launch_at;
    }

    public function setLaunchAt(\DateTimeInterface $launch_at): self
    {
        $this->launch_at = $launch_at;

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

    public function getConferenceLink(): ?string
    {
        return $this->conferenceLink;
    }

    public function setConferenceLink(string $conferenceLink): self
    {
        $this->conferenceLink = $conferenceLink;

        return $this;
    }


    /**
     * @return Collection|Traveler[]
     */
    public function getTravelers(): Collection
    {
        return $this->travelers;
    }
    public function addTraveler(Traveler $traveler): self
    {
        if (!$this->travelers->contains($traveler)) {
            $this->travelers[] = $traveler;
            $traveler->addTravelGroup($this);
        }
        return $this;
    }
    public function removeTraveler(Traveler $traveler): self
    {
        if ($this->travelers->contains($traveler)) {
            $this->travelers->removeElement($traveler);
            $traveler->removeAdventure($this);
        }
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPriceTotal()
    {
        return $this->priceTotal;
    }

    /**
     * @param mixed $priceTotal
     */
    public function setPriceTotal($priceTotal): void
    {
        $this->priceTotal = $priceTotal;
    }

    /**
     * @return mixed
     */
    public function getPricePerMonth()
    {
        return $this->pricePerMonth;
    }

    /**
     * @param mixed $pricePerMonth
     */
    public function setPricePerMonth($pricePerMonth): void
    {
        $this->pricePerMonth = $pricePerMonth;
    }

    /**
     * @return mixed
     */
    public function getIsWaitingList()
    {
        return $this->isWaitingList;
    }

    /**
     * @param mixed $isWaitingList
     */
    public function setIsWaitingList($isWaitingList): void
    {
        $this->isWaitingList = $isWaitingList;
    }





}