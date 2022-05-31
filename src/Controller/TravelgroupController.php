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


use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\HttpClientInterface;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

use App\Manager\CacheManager;


class TravelgroupController extends AbstractController
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
     * @Route("/travelgroup/new", name="travelgroup_new")
     * @Method("POST")
     * @return JsonResponse
     */
    public function newTravelgroup(Request $request, $response = true)
    {
        # get doctrine manager test
        $em = $this->em;

        $data = $request->getContent();
        $data = json_decode($data, 1);

        if(!$data['groupname']){
            return new JsonResponse('groupname is required', 400); #bad request
        }

        $client = HttpClient::create();

        $response = $client->request('GET', $data['groupname']);

        if(!$response){
            return new JsonResponse('could not fetch travelgroup data!', 400); #bad request
        }

        $statusCode = $response->getStatusCode();

        if($statusCode != 200){
            return new JsonResponse('could not fetch travelgroup data!', $statusCode); #bad request
        }


        if(!$data['launch_at']){
            return new JsonResponse('launch_at date is required', 400); #bad request
        }


        $travelgroup = new Travelgroup();

        $travelgroup->setGroupname($data['groupname']);
        $travelgroup->setPricePerMonth($data['price_total']);
        $travelgroup->setPriceTotal($data['price_per_month']);
        $travelgroup->setLaunchAt($data['launch_at']);
        $travelgroup->setIsActive(1);

        $em->persist($travelgroup);

        $em->flush();

        return new JsonResponse($data);

    }


    /**
     * @param Request $request
     * @Method("GET")
     * * @return JsonResponse
     */
    #* @Route("/travelgroups", name="travelgroups")
    public function getTravelgroups($jsonResponse = true)
    {

       # get doctrine manager
        $em = $this->em;

        $travelgroups = $em->getRepository(TravelGroup::class)
            ->findBy([],['launch_at' => 'ASC']);

        $data = [];

        foreach($travelgroups as $travelgroup){

            $travelers = [];
            foreach($travelgroup->getTravelers() as $traveler){
                $travelers[] = [
                    'id' => $traveler->getId(),
                    'fullname' => $traveler->getFullname(),
                    'link' => $traveler->getLink(),
                    'isActive' => $traveler->getIsActive(),
                    'isGuide' => $traveler->getIsGuide()
                ];
            }

            $data[] = [
                'id' => $travelgroup->getId(),
                'groupname' => $travelgroup->getGroupname(),
                'region' => $travelgroup->getRegion(),
                'conferenceLink' => $travelgroup->getConferenceLink(),
                'price_total' => $travelgroup->getPriceTotal(),
                'price_per_month' => $travelgroup->getPricePerMonth(),
                'launch_at' => $travelgroup->getLaunchAt(),
                'created_at' => $travelgroup->getCreatedAt(),
                'isActive' => $travelgroup->getIsActive(),
                'isWaitingList' => $travelgroup->getIsWaitingList(),
                'isSoldOut' => $travelgroup->getIsSoldOut(),
                'description' => $travelgroup->getDescription(),
                'code' => $travelgroup->getCode(),
                'sessions' => $travelgroup->getSessions(),
                'overwriteTravelerCount' => $travelgroup->getOverwriteTravelerCount(),
                'duration' => $travelgroup->getDuration(),
                'interval' => $travelgroup->getInterval(),
                'host' => $travelgroup->getHost(),
                'registrationLink' => $travelgroup->getRegistrationLink(),
                'travelers' => $travelers
            ];

        }

        $current_date = new \DateTime();

        foreach($data as $i => $travelgroup){

            $data[$i]['travelerCount'] =  count($travelgroup['travelers']);
            $data[$i]['guides'] = [];
            $data[$i]['isFuture'] = false;

            foreach($travelgroup['travelers'] as $traveler){
                if($traveler['isGuide']){
                    $data[$i]['travelerCount']--;
                    $data[$i]['guides'][] = $traveler['fullname'];
                }
            }

            $data[$i]['registration'] = 'open';

            $launchDate = $data[$i]['launch_at'];

            if(!$data[$i]['launch_at']){
                $data[$i]['launch_at'] = 'Mark your interest in the journey. We will contact you when we reach 15 registrations to form a travelgroup. Joining a waitinglist is free. Prices for travelgroups may vary.';
                $data[$i]['launch_at_short'] = '';
                $data[$i]['isFuture'] = true;
            }elseif(!$data[$i]['isActive']){
                $data[$i]['launch_at'] = 'concluded';
                $data[$i]['launch_at_short'] = 'concluded';
            }elseif($current_date < $data[$i]['launch_at']){ //launching in the future
                $data[$i]['launch_at'] = 'Departing: '.$launchDate->format("l j F Y H:i"). ' UTC';
                $data[$i]['launch_at_short'] = $launchDate->format("D j M Y H:i"). ' UTC';
                if($data[$i]['region'] == "Americas"){
                    $data[$i]['launch_at'] = 'Departing: '.$launchDate->format("l j F Y H:i"). ' Eastern Time';
                    $data[$i]['launch_at_short'] = $launchDate->format("D j M Y H:i"). ' Eastern Time';
                }
                $data[$i]['isFuture'] = true;
            }else{//launched in the past
                $data[$i]['launch_at'] = 'Traveling every '.$launchDate->format("l H:i"). ' UTC';
                $data[$i]['launch_at_short'] = $launchDate->format("D j M Y H:i"). ' UTC';
                if($data[$i]['region'] == "Americas"){
                    $data[$i]['launch_at'] = 'Traveling every '.$launchDate->format("l H:i"). ' Eastern Time';
                    $data[$i]['launch_at_short'] = $launchDate->format("D j M Y H:i"). ' Eastern Time';
                }
                $data[$i]['registration'] = 'closed';
            }
        }

        # reset the keys (so that React can properly load them in)
        $data = array_values($data);

        if($jsonResponse){
            return new JsonResponse($data, 200);
        }

        return($data);

    }


}