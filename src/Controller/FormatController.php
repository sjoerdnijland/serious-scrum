<?php
// src/Controller/ArticleController.php
namespace App\Controller;

use App\Entity\Format;
use App\Entity\Page;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\HttpClientInterface;

use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\Validator\Constraints as Assert;

use App\Manager\CacheManager;


class FormatController extends AbstractController
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
     * @Route("/formats", name="formats")
     * @Method("GET")
     * * @return JsonResponse
     */
    public function getFormats($jsonResponse = true)
    {

        $formats = [];

        # get doctrine manager
        $em = $this->em;

        $formats = $em->getRepository(Format::class)
            ->findBy(array(),array('name' => 'ASC'));

        $data = [];

        foreach($formats as $format){


            $data[] = [
                'id' => $format->getId(),
                'name' => $format->getName(),
                'description' => $format->getDescription(),
                'type' => $format->getType(),
                'c' => $format->getC(),
                'activity' => $format->getActivity(),
                'page' => $format->getPage()->getSlug(),
                'icon' => $format->getIcon(),
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