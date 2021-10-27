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

use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\Validator\Constraints as Assert;

use App\Manager\CacheManager;


class TravelerController extends AbstractController
{
    /**
     * @var ClientInterface
     */
    private $client;

    private $em;
    private $cm;

    /**
     * @Assert\DateTime
     * @var string A "Y-m-d H:i:s" formatted value
     */
    private $createdAt;

    public function __construct(HttpClientInterface $client, CacheManager $cacheManager, EntityManagerInterface $entityManager)
    {
        $this->client = $client;
        $this->cm = $cacheManager;
        $this->em = $entityManager;
    }

    /**
     * @param Request $request
     * @Route("/traveler/new", name="traveler_new")
     * @Method("POST")
     * @return JsonResponse
     */
    public function newTraveler(Request $request, $response = true)
    {
        # get doctrine manager test
        $em = $this->em;

        $data = $request->getContent();
        $data = json_decode($data, 1);

        if(!$data['firstname']){
            return new JsonResponse('firstname is required', 400); #bad request
        }
        if(!$data['lastname']){
            return new JsonResponse('lastname is required', 400); #bad request
        }
        if(!$data['email']){
            return new JsonResponse('email is required', 400); #bad request
        }

        if(!$data['terms']){
            return new JsonResponse('Please agree to the terms of service', 400); #bad request
        }

        $emailAlreadyExists = $em->getRepository(Traveler::class)
            ->findOneByEmail($data['email']);

        if($emailAlreadyExists){
            return new JsonResponse('email already submitted', 400); #bad request
        }

        $traveler = new Traveler();

        $traveler->setEmail($data['email']);
        $traveler->setFirstname($data['firstname']);
        $traveler->setLastname($data['lastname']);
        $traveler->setFullname($data['firstname'].' '.$data['lastname']);
        $traveler->setLink($data['linkedIn']);
        $traveler->setIsActive(0);
        $traveler->setIsGuide(0);
        $traveler->setCreatedAt(new \DateTime());

        if($data['travelgroup']){
            $travelgroup = $em->getRepository(Travelgroup::class)
                ->findOneBy([
                    'id' => $data['travelgroup'],
                ]);

            $traveler->addTravelgroup($travelgroup);
        }

        $em->persist($traveler);

        $em->flush();

        return new JsonResponse($data);

    }


    /**
     * @param Request $request
     * @Method("GET")
     * * @return JsonResponse
     */
    #* @Route("/travelers", name="travelers")
    public function getTravelers($jsonResponse = true)
    {

        $travelers = [];

        # get doctrine manager
        $em = $this->em;

        $travelers = $em->getRepository(Traveler::class)
            ->findAll();

        $data = [];

        foreach($travelers as $traveler){

            $adventures = [];
            foreach($traveler->getAdventures() as $adventure){
                $adventures[] = [
                    'id' => $adventure->getId(),
                    'name' => $adventure->getName(),
                    'description' => $adventure->getDescription(),
                    'price' => $adventure->getPrice(),
                    'created_at' => $adventure->getCreatedAt(),
                    'isActive' => $adventure->getIsActive(),
                    'link' => $adventure->getLink(),
                    'paymentLink' => $adventure->getPaymentLink()
                ];
            }

            $travelgroups = [];
            foreach($traveler->getTravelGroups() as $travelgroup){
                $travelgroups[] = [
                    'id' => $travelgroup->getId(),
                    'groupname' => $travelgroup->getGroupname(),
                    'conferenceLink' => $travelgroup->getConferenceLink(),
                    'launch_at' => $travelgroup->getLaunchAt(),
                    'created_at' => $travelgroup->getCreatedAt(),
                    'isActive' => $travelgroup->getIsActive()
                ];
            }

            $badges = [];
            foreach($traveler->getBadges() as $badge){
                $badges[] = [
                    'id' => $badge->getId(),
                    'name' => $badge->getName(),
                    'image' => $badge->getImage()
                ];
            }

            $data[] = [
                'id' => $traveler->getId(),
                'fullname' => $traveler->getFullname(),
                'firstname' => $traveler->getFirstname(),
                'lastname' => $traveler->getLastname(),
                'link' => $traveler->getLink(),
                'isActive' => $traveler->getIsActive(),
                'isGuide' => $traveler->getIsGuide(),
                'travelgroups' => $travelgroups,
                'adventures' => $adventures,
                'badges' => $badges
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