<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass:"App\Repository\FormatRepository")]
class Format
{
    #[ORM\Id()]
    #[ORM\GeneratedValue()]
    #[ORM\Column(type:"integer")]
    private $id;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private ?string $name = null;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $description;

    #[ORM\Column(type:"string", length:100, nullable:true)]
    private $icon;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $type;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $c;

    #[ORM\Column(type:"string", length:255, nullable:true)]
    private $activity;

    #[ORM\ManyToOne(targetEntity:"Page", inversedBy:"formats")]
    #[ORM\JoinColumn(name:"page", referencedColumnName:"id")]
    private $page;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
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
    public function getType()
    {
        return $this->type;
    }

    public function setType(mixed $type): void
    {
        $this->type = $type;
    }

    /**
     * @return mixed
     */
    public function getC()
    {
        return $this->c;
    }

    public function setC(mixed $c): void
    {
        $this->c = $c;
    }

    /**
     * @return mixed
     */
    public function getActivity()
    {
        return $this->activity;
    }

    public function setActivity(mixed $activity): void
    {
        $this->activity = $activity;
    }

    public function getPage()
    {
        return $this->page;
    }

    public function setPage($page)
    {
        $this->page = $page;
    }

    /**
     * @return mixed
     */
    public function getIcon()
    {
        return $this->icon;
    }

    public function setIcon(mixed $icon): void
    {
        $this->icon = $icon;
    }
}
