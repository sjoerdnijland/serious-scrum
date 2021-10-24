<?php
// src/Controller/ArticleController.php
namespace App\Controller;

use App\Entity\Traveler;
use App\Entity\TravelGroup;
use App\Entity\Adventure;
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


class AdventureController extends AbstractController
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
     * @Route("/adventure/new", name="adventure_new")
     * @Method("POST")
     * @return JsonResponse
     */
    public function newAdventure(Request $request, $response = true)
    {
        # get doctrine manager test
        $em = $this->em;

        $data = $request->getContent();
        $data = json_decode($data, 1);

        if(!$data['name']){
            return new JsonResponse('name is required', 400); #bad request
        }

        $client = HttpClient::create();

        $response = $client->request('GET', $data['name']);

        if(!$response){
            return new JsonResponse('could not fetch adventure data!', 400); #bad request
        }

        $statusCode = $response->getStatusCode();

        if($statusCode != 200){
            return new JsonResponse('could not fetch adventure data!', $statusCode); #bad request
        }


        if(!$data['launch_at']){
            return new JsonResponse('launch_at date is required', 400); #bad request
        }

        if(!$data['price']){
            return new JsonResponse('price is required', 400); #bad request
        }

        if(!$data['paymentLink']){
            return new JsonResponse('paymentLink is required', 400); #bad request
        }

        if(!$data['link']){
            return new JsonResponse('link is required', 400); #bad request
        }


        $adventure = new Travelgroup();

        $adventure->setName($data['name']);
        $adventure->setPrice($data['price']);
        $adventure->setPaymentLink($data['paymentLink']);
        $adventure->setLink($data['link']);
        $adventure->setIsActive(1);

        $em->persist($adventure);

        $em->flush();

        return new JsonResponse($data);

    }


    /**
     * @param Request $request
     * @Route("/adventures", name="adventures")
     * @Method("GET")
     * * @return JsonResponse
     */
    public function getAdventures($jsonResponse = true)
    {

       # get doctrine manager
        $em = $this->em;

        $adventures = $em->getRepository(Adventure::class)
            ->findAll();

        $data = [];

        foreach($adventures as $adventure){

            $travelers = [];
            $guides = [];
            foreach($adventure->getTravelers() as $traveler){
                $travelers[] = [
                    'id' => $traveler->getId(),
                    'fullname' => $traveler->getFullname(),
                    'link' => $traveler->getLink(),
                    'isActive' => $traveler->getIsActive(),
                    'isGuide' => $traveler->getIsGuide()
                ];
                if($traveler->getIsGuide()){
                    $guides[] = $traveler->getFullname();
                }
            }

            $launchDate = $adventure->getLaunchAt();
            $launchDate = $launchDate->format("l j F Y H:i"). ' UTC';

            $data[] = [
                'id' => $adventure->getId(),
                'name' => $adventure->getName(),
                'paymentLink' => $adventure->getPaymentLink(),
                'link' => $adventure->getLink(),
                'description' => $adventure->getDescription(),
                'price' => $adventure->getPrice(),
                'duration' => $adventure->getDuration(),
                'created_at' => $adventure->getCreatedAt(),
                'launch_at' => $launchDate,
                'isActive' => $adventure->getIsActive(),
                'travelers' => $travelers,
                'guides' => $guides
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