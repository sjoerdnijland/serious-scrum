<?php
// src/Controller/ArticleController.php
namespace App\Controller;

use App\Entity\Testimonial;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\HttpClientInterface;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

use App\Manager\CacheManager;


class TestimonialController extends AbstractController
{
    /**
     * @var ClientInterface
     */
    private $client;

    private $em;
    private $cm;

    public function __construct(HttpClientInterface $client, CacheManager $cacheManager, EntityManagerInterface $entityManager)
    {
        $this->client = $client;
        $this->cm = $cacheManager;
        $this->em = $entityManager;
    }

    /**
     * @param Request $request
     * @Route("api/testimonials", name="testimonials")
     * @Method("GET")
     * * @return JsonResponse
     */
    public function getTestimonials($jsonResponse = true)
    {

       # get doctrine manager
        $em = $this->em;

        $testimonials = $em->getRepository(Testimonial::class)
            ->findAll();

        $data = [];

        foreach($testimonials as $testimonial){

            $data[] = [
                'id' => $testimonial->getId(),
                'name' => $testimonial->getName(),
                'testimonial' => $testimonial->getTestimonial(),
                'icon' => $testimonial->getIcon(),
            ];

        }

        # reset the keys (so that React can properly load them in)
        $data = array_values($data);

        if($jsonResponse){
            return new JsonResponse($data, 200);
        }

        return($data);

    }


}