<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CategoryRepository")
 */
class Category
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity="Category", inversedBy="subCategories")
     * @ORM\JoinColumn(name="parent", referencedColumnName="id")
     */
    private $parent;

    /**
     * @ORM\OneToMany(
     *     targetEntity="Category",
     *     mappedBy="parent",
     *     fetch="EXTRA_LAZY",
     *     orphanRemoval=true,
     *     cascade={"persist"}
     * )
     * @Assert\Valid()
     */
    private $subCategories;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isSeries = false;

    /**
     * @ORM\OneToMany(
     *     targetEntity="Article",
     *     mappedBy="category",
     *     fetch="EXTRA_LAZY",
     *     orphanRemoval=true,
     *     cascade={"persist"}
     * )
     * @Assert\Valid()
     */
    private $articles;


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

    public function getParent()
    {
        return $this->parent;
    }

    public function setParent($parent)
    {
        $this->parent = $parent;
    }

    /**
     * @return ArrayCollection|$subCategory[]
     */
    public function getSubCategories()
    {
        return $this->subCategories;
    }

    public function addSubCategory(Category $subCategory)
    {
        if ($this->subCategories->contains($subCategory)) {
            return;
        }

        $this->subCategories[] = $subCategory;
        // needed to update the owning side of the relationship!
        $subCategory->setParent($this);
    }

    public function removeSubCategory(Category $subCategory)
    {
        if (!$this->subCategories->contains($subCategory)) {
            return;
        }

        $this->subCategories->removeElement($subCategory);
        // needed to update the owning side of the relationship!
        $subCategory->setParent(null);
    }

    /**
     * @return ArrayCollection|$articles[]
     */
    public function getArticles()
    {
        return $this->articles;
    }


    public function addArticle(Article $article)
    {
        if ($this->articles->contains($article)) {
            return;
        }

        $this->articles[] = $article;
        // needed to update the owning side of the relationship!
        $article->setCategory($this);
    }

    public function removeArticle(Article $article)
    {
        if (!$this->articles->contains($article)) {
            return;
        }

        $this->articles->removeElement($article);
        // needed to update the owning side of the relationship!
        $article->setCategory(null);
    }

    public function getIsSeries()
    {
        return $this->isSeries;
    }

    public function setIsSeries($isSeries)
    {
        $this->isSeries = $isSeries;
    }

}
