<?php

// src/Controller/ArticleController.php

namespace App\Controller;

use App\Entity\TravelGroup;
use App\Manager\CacheManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class TravelgroupController extends AbstractController
{
    /**
     * @var ClientInterface
     */
    private $client;

    public function __construct(HttpClientInterface $client, private CacheManager $cm, private EntityManagerInterface $em)
    {
        $this->client = $client;
    }

    #[Route(path: '/travelgroup/new', name: 'travelgroup_new', methods: ["POST"])]
    public function newTravelgroup(Request $request, $response = true): JsonResponse
    {
        // get doctrine manager test
        $em = $this->em;

        $data = $request->getContent();
        $data = json_decode($data, 1, 512, JSON_THROW_ON_ERROR);

        if (!$data['groupname']) {
            return new JsonResponse('groupname is required', Response::HTTP_BAD_REQUEST); // bad request
        }

        $client = HttpClient::create();

        $response = $client->request('GET', $data['groupname']);

        if (!$response) {
            return new JsonResponse('could not fetch travelgroup data!', Response::HTTP_BAD_REQUEST); // bad request
        }

        $statusCode = $response->getStatusCode();

        if ($statusCode != 200) {
            return new JsonResponse('could not fetch travelgroup data!', $statusCode); // bad request
        }

        if (!$data['launch_at']) {
            return new JsonResponse('launch_at date is required', Response::HTTP_BAD_REQUEST); // bad request
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


    public function getTravelgroups($jsonResponse = true)
    {
        // get doctrine manager
        $em = $this->em;

        $travelgroups = $em->getRepository(TravelGroup::class)
            ->findBy([], ['launch_at' => 'ASC']);

        $data = [];

        foreach ($travelgroups as $travelgroup) {
            $travelers = [];
            foreach ($travelgroup->getTravelers() as $traveler) {
                $travelers[] = [
                    'id' => $traveler->getId(),
                    'fullname' => $traveler->getFullname(),
                    'link' => $traveler->getLink(),
                    'isActive' => $traveler->getIsActive(),
                    'isGuide' => $traveler->getIsGuide(),
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
                'travelers' => $travelers,
            ];
        }

        $current_date = new \DateTime();

        foreach ($data as $i => $travelgroup) {
            $data[$i]['travelerCount'] = count($travelgroup['travelers']);
            $data[$i]['guides'] = [];
            $data[$i]['isFuture'] = false;

            foreach ($travelgroup['travelers'] as $traveler) {
                if ($traveler['isGuide']) {
                    --$data[$i]['travelerCount'];
                    $data[$i]['guides'][] = $traveler['fullname'];
                }
            }

            $data[$i]['registration'] = 'open';

            $launchDate = $data[$i]['launch_at'];

            if (!$data[$i]['launch_at']) {
                $data[$i]['launch_at'] = 'Traveldates are yet to be determined or confirmed';
                $data[$i]['launch_at_short'] = '';
                $data[$i]['isFuture'] = true;
            } elseif (!$data[$i]['isActive']) {
                $data[$i]['launch_at'] = 'concluded';
                $data[$i]['launch_at_short'] = 'concluded';
            } elseif ($current_date < $data[$i]['launch_at']) { // launching in the future
                $data[$i]['launch_at'] = 'Departing: '.$launchDate->format('l j F Y H:i').' UTC';
                $data[$i]['launch_at_short'] = $launchDate->format('D j M Y H:i').' UTC';

                if ($data[$i]['region'] == 'Americas') {
                    $data[$i]['launch_at'] = 'Departing: '.$launchDate->format('l j F Y H:i').' Eastern Time';
                    $data[$i]['launch_at_short'] = $launchDate->format('D j M Y H:i').' Eastern Time';
                }
                if ($data[$i]['region'] == 'Germany') {
                    $data[$i]['launch_at'] = 'Departing: '.$launchDate->format('l j F Y H:i').' Europe/Berlin';
                    $data[$i]['launch_at_short'] = $launchDate->format('D j M Y H:i').' Europe/Berlin';
                }
                if ($data[$i]['region'] == 'Asia/Pacific') {
                    $data[$i]['launch_at'] = 'Departing: '.$launchDate->format('l j F Y H:i').' Australia/Sydney';
                    $data[$i]['launch_at_short'] = $launchDate->format('D j M Y H:i').' Australia/Sydney';
                }

                if ($data[$i]['region'] == 'EU' || $data[$i]['region'] == 'NL') {
                    $data[$i]['launch_at'] = 'Departing: '.$launchDate->format('l j F Y H:i').' Europe/Amsterdam';
                    $data[$i]['launch_at_short'] = $launchDate->format('D j M Y H:i').' Europe/Amsterdam';
                }

                $data[$i]['isFuture'] = true;
            } else {// launched in the past
                $data[$i]['launch_at'] = 'Traveling every '.$launchDate->format('l H:i').' UTC';
                $data[$i]['launch_at_short'] = $launchDate->format('D j M Y H:i').' UTC';

                if ($data[$i]['region'] == 'Americas') {
                    $data[$i]['launch_at'] = 'Traveling every '.$launchDate->format('l H:i').' Europe/Berlin';
                    $data[$i]['launch_at_short'] = $launchDate->format('D j M Y H:i').' Europe/Berlin';
                }
                if ($data[$i]['region'] == 'Germany') {
                    $data[$i]['launch_at'] = 'Traveling every '.$launchDate->format('l H:i').' Europe/Berlin';
                    $data[$i]['launch_at_short'] = $launchDate->format('D j M Y H:i').' Europe/Berlin';
                }
                if ($data[$i]['region'] == 'Asia/Pacific') {
                    $data[$i]['launch_at'] = 'Traveling every '.$launchDate->format('l H:i').' Australia/Sydney';
                    $data[$i]['launch_at_short'] = $launchDate->format('D j M Y H:i').' Australia/Sydney';
                }
                if ($data[$i]['region'] == 'EU' || $data[$i]['region'] == 'NL') {
                    $data[$i]['launch_at'] = 'Traveling every '.$launchDate->format('l H:i').' Europe/Amsterdam';
                    $data[$i]['launch_at_short'] = $launchDate->format('D j M Y H:i').' Europe/Amsterdam';
                }

                $data[$i]['registration'] = 'closed';
            }
        }

        // reset the keys (so that React can properly load them in)
        $data = array_values($data);

        if ($jsonResponse) {
            return new JsonResponse($data, Response::HTTP_OK);
        }

        return $data;
    }
}
