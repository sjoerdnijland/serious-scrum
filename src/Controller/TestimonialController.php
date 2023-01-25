<?php

// src/Controller/ArticleController.php

namespace App\Controller;

use App\Entity\Testimonial;
use App\Manager\CacheManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\Routing\Annotation\Route;

class TestimonialController extends AbstractController
{
    /**
     * @var ClientInterface
     */
    private $client;

    public function __construct(HttpClientInterface $client, private CacheManager $cm, private EntityManagerInterface $em)
    {
        $this->client = $client;
    }


    #[Route(path: 'api/testimonials', name: 'testimonials', methods: ["GET"])]
    public function getTestimonials($jsonResponse = true): JsonResponse
    {
        // get doctrine manager
        $em = $this->em;

        $testimonials = $em->getRepository(Testimonial::class)
            ->findAll();

        $data = [];

        foreach ($testimonials as $testimonial) {
            $data[] = [
                'id' => $testimonial->getId(),
                'name' => $testimonial->getName(),
                'testimonial' => $testimonial->getTestimonial(),
                'icon' => $testimonial->getIcon(),
            ];
        }

        // reset the keys (so that React can properly load them in)
        $data = array_values($data);

        if ($jsonResponse) {
            return new JsonResponse($data, Response::HTTP_OK);
        }

        return $data;
    }
}
