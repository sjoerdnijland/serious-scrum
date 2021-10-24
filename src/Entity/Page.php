<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PageRepository")
 */
class Page
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
    private $prismicId;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $slug;

    /**
     * @ORM\Column(type="json")
     */
    private $labels = [];

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $author;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Url(
     *    message = "The thumbnail url '{{ value }}' is not a valid url",
     * )
     */
    private $thumbnail;


    /**
     * @ORM\Column(type="json")
     */
    private $data = [];


    /**
     * @ORM\Column(type="boolean")
     */
    private $isSubscribersOnly = false;

    /**
     * @ORM\OneToMany(
     *     targetEntity="Format",
     *     mappedBy="page",
     *     fetch="EXTRA_LAZY",
     *     orphanRemoval=true,
     *     cascade={"persist"}
     * )
     * @Assert\Valid()
     */
    private $formats;


    public function __construct()
    {
        $this->submittedAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrismicId(): ?string
    {
        return $this->prismicId;
    }

    public function setPrismicId(string $prismicId): self
    {
        $this->prismicId = $prismicId;

        return $this;
    }


    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLabels()
    {
        return $this->labels;
    }

    /**
     * @param mixed $labels
     */
    public function setLabels($labels): void
    {
        $this->labels = $labels;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param mixed $data
     */
    public function setData($data): void
    {
        $this->data = $data;
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



    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(?string $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }

    public function getIsSubscribersOnly()
    {
        return $this->isSubscribersOnly;
    }

    public function setIsSubscribersOnly($isSubscribersOnly): void
    {
        $this->isSubscribersOnly = $isSubscribersOnly;
    }

    /**
     * @return ArrayCollection|$formats[]
     */
    public function getFormats()
    {
        return $this->formats;
    }


    public function addFormat(Format $format)
    {
        if ($this->formats->contains($format)) {
            return;
        }

        $this->formats[] = $format;
        // needed to update the owning side of the relationship!
        $format->setPage($this);
    }

    public function removeFormat(Format $format)
    {
        if (!$this->formats->contains($format)) {
            return;
        }

        $this->formats->removeElement($format);
        // needed to update the owning side of the relationship!
        $format->setPage(null);
    }





}