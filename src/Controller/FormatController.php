<?php

// src/Controller/ArticleController.php

namespace App\Controller;

use App\Entity\Format;
use App\Manager\CacheManager;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\Routing\Annotation\Route;

class FormatController extends AbstractController
{
    /**
     * @var ClientInterface
     */
    private $client;

    public function __construct(HttpClientInterface $client, private CacheManager $cm, private EntityManagerInterface $em)
    {
        $this->client = $client;
    }


    #[Route(path: '/formats', name: 'formats', methods: ["GET"])]
    public function getFormats($jsonResponse = true): JsonResponse
    {
        $formats = [];

        // get doctrine manager
        $em = $this->em;

        $formats = $em->getRepository(Format::class)
            ->findBy([], ['name' => 'ASC']);

        $data = [];

        foreach ($formats as $format) {
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

        // reset the keys (so that React can properly load them in)
        $data = array_values($data);

        if ($jsonResponse) {
            return new JsonResponse($data, Response::HTTP_OK);
        }

        return $data;
    }
}
