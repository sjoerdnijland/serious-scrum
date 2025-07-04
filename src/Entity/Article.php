<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass:"App\Repository\ArticleRepository")]
class Article
{
    #[ORM\Id()]
    #[ORM\GeneratedValue()]
    #[ORM\Column()]
    private ?int $id = null;

    #[ORM\Column()]
    #[Assert\Url(message: "The url '{{ value }}' is not a valid url")]
    private ?string $url = null;

    #[ORM\Column(nullable:true)]
    #[Assert\Url(message: "The thumbnail url '{{ value }}' is not a valid url")]
    private ?string $thumbnail = null;

    #[ORM\Column(nullable:true)]
    private ?string $title = null;

    #[ORM\Column(nullable:true)]
    private ?string $intro = null;

    #[ORM\Column(nullable:true)]
    private ?string $author = null;

    #[ORM\Column()]
    private bool $isCurated = false;

    #[ORM\Column()]
    private bool $isApproved = false;

    #[ORM\ManyToOne(inversedBy:"articles")]
    #[ORM\JoinColumn(name:"category", referencedColumnName:"id")]
    private ?Category $category = null;

    #[ORM\Column(name:"submittedAt", options: ["default" => "CURRENT_TIMESTAMP"])]
    private \DateTime $submittedAt;

    public function __construct()
    {
        $this->submittedAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(?string $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getIntro(): ?string
    {
        return $this->intro;
    }

    public function setIntro(string $intro): self
    {
        $this->intro = $intro;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(?string $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getCategory()
    {
        return $this->category;
    }

    public function setCategory($category)
    {
        $this->category = $category;
    }

    public function getIsCurated()
    {
        return $this->isCurated;
    }

    public function setIsCurated($isCurated)
    {
        $this->isCurated = $isCurated;
    }

    public function getIsApproved()
    {
        return $this->isApproved;
    }

    public function setIsApproved($isApproved)
    {
        $this->isApproved = $isApproved;
    }

    /**
     * @return mixed
     */
    public function getSubmittedAt()
    {
        return $this->submittedAt;
    }

    public function setSubmittedAt(mixed $submittedAt)
    {
        $this->submittedAt = $submittedAt;
    }
}
