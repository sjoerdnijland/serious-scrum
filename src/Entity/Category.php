<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass:"App\Repository\CategoryRepository")]
class Category
{
    #[ORM\Id()]
    #[ORM\GeneratedValue()]
    #[ORM\Column()]
    private ?int $id = null;

    #[ORM\Column(nullable:true)]
    private ?string $name = null;

    #[ORM\Column(nullable:true)]
    private ?string $title = null;

    #[ORM\ManyToOne(inversedBy:"subCategories")]
    #[ORM\JoinColumn(name:"parent", referencedColumnName:"id")]
    private ?Category $parent = null;

    #[ORM\OneToMany(targetEntity:"Category", mappedBy:"parent", fetch:"EXTRA_LAZY", orphanRemoval:true, cascade:["persist"])]
    #[Assert\Valid]
    private Collection $subCategories;

    #[ORM\Column()]
    private bool $isSeries = false;

    #[ORM\OneToMany(targetEntity:"Article", mappedBy:"parent", fetch:"EXTRA_LAZY", orphanRemoval:true, cascade:["persist"])]
    #[Assert\Valid]
    private Collection $articles;

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
     * @return $subCategory[]
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
     * @return $articles[]
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

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle(mixed $title): void
    {
        $this->title = $title;
    }
}
