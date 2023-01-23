<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass:"App\Repository\TestimonialRepository")]
class Testimonial
{
    #[ORM\Id()]
    #[ORM\GeneratedValue()]
    #[ORM\Column()]
    private ?int $id = null;

    #[ORM\Column()]
    private string $name;

    #[ORM\Column(length:512)]
    private string $testimonial;

    #[ORM\Column()]
    private string $icon;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    public function setId(mixed $id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    public function setName(mixed $name): void
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getTestimonial()
    {
        return $this->testimonial;
    }

    public function setTestimonial(mixed $testimonial): void
    {
        $this->testimonial = $testimonial;
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
