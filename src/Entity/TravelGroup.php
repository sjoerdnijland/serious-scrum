<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass:"App\Repository\TravelgroupRepository")]
class TravelGroup
{
    #[ORM\Id()]
    #[ORM\GeneratedValue()]
    #[ORM\Column(type:"integer")]
    private $id;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private ?string $groupname = null;

    #[ORM\Column(type:"boolean")]
    private bool $isActive = false;

    #[ORM\Column(type:"boolean")]
    private $isSoldOut = false;

    #[ORM\Column(type:"boolean")]
    private bool $isWaitingList = false;

    #[ORM\Column(type:"datetime", options: ["default" => "CURRENT_TIMESTAMP"])]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(type:"datetime", nullable:true)]
    private ?\DateTimeInterface $launch_at = null;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private ?string $conferenceLink = null;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $registrationLink;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $code;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $description;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $sessions;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $duration;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $host;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $interval;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $overwriteTravelerCount;

    #[ORM\ManyToMany(targetEntity:"App\Entity\Traveler", inversedBy:"travelgroups")]
    /**
     * @var Collection
     */
    private $travelers;

    #[ORM\Column(type:"integer", length:8)]
    private $priceTotal;

    #[ORM\Column(type:"integer", length:8)]
    private $pricePerMonth;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $region;

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

    public function setIsActive(mixed $isActive): void
    {
        $this->isActive = $isActive;
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

    public function setPriceTotal(mixed $priceTotal): void
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

    public function setPricePerMonth(mixed $pricePerMonth): void
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

    public function setIsWaitingList(mixed $isWaitingList): void
    {
        $this->isWaitingList = $isWaitingList;
    }

    /**
     * @return mixed
     */
    public function getIsSoldOut()
    {
        return $this->isSoldOut;
    }

    /**
     * @param mixed $soldOut
     */
    public function setIsSoldOut($isSoldOut): void
    {
        $this->isSoldOut = $isSoldOut;
    }

    /**
     * @return mixed
     */
    public function getRegion()
    {
        return $this->region;
    }

    public function setRegion(mixed $region): void
    {
        $this->region = $region;
    }

    /**
     * @return mixed
     */
    public function getRegistrationLink()
    {
        return $this->registrationLink;
    }

    public function setRegistrationLink(mixed $registrationLink): void
    {
        $this->registrationLink = $registrationLink;
    }

    /**
     * @return mixed
     */
    public function getCode()
    {
        return $this->code;
    }

    public function setCode(mixed $code): void
    {
        $this->code = $code;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription(mixed $description): void
    {
        $this->description = $description;
    }

    /**
     * @return mixed
     */
    public function getSessions()
    {
        return $this->sessions;
    }

    public function setSessions(mixed $sessions): void
    {
        $this->sessions = $sessions;
    }

    /**
     * @return mixed
     */
    public function getDuration()
    {
        return $this->duration;
    }

    public function setDuration(mixed $duration): void
    {
        $this->duration = $duration;
    }

    /**
     * @return mixed
     */
    public function getInterval()
    {
        return $this->interval;
    }

    public function setInterval(mixed $interval): void
    {
        $this->interval = $interval;
    }

    /**
     * @return mixed
     */
    public function getHost()
    {
        return $this->host;
    }

    public function setHost(mixed $host): void
    {
        $this->host = $host;
    }

    /**
     * @return mixed
     */
    public function getOverwriteTravelerCount()
    {
        return $this->overwriteTravelerCount;
    }

    public function setOverwriteTravelerCount(mixed $overwriteTravelerCount): void
    {
        $this->overwriteTravelerCount = $overwriteTravelerCount;
    }
}
