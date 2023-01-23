<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass:"App\Repository\FormatRepository")]
class Format
{
    #[ORM\Id()]
    #[ORM\GeneratedValue()]
    #[ORM\Column()]
    private ?int $id = null;

    #[ORM\Column(nullable:true)]
    private ?string $name = null;

    #[ORM\Column(nullable:true)]
    private ?string $description = null;

    #[ORM\Column(length:100, nullable:true)]
    private ?string $icon = null;

    #[ORM\Column(nullable:true)]
    private ?string $type = null;

    #[ORM\Column(nullable:true)]
    private ?string $c = null;

    #[ORM\Column(nullable:true)]
    private ?string $activity = null;

    #[ORM\ManyToOne(inversedBy:"formats")]
    #[ORM\JoinColumn(name:"page", referencedColumnName:"id")]
    private ?Page $page = null;

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
