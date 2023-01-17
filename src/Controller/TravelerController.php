<?php

namespace App\Controller;

use App\Entity\Traveler;
use App\Entity\TravelGroup;
use App\Manager\CacheManager;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class TravelerController extends AbstractController
{
    /**
     * @var ClientInterface
     */
    private $client;

    /**
     * @var string A "Y-m-d H:i:s" formatted value
     */
    #[Assert\DateTime]
    private $createdAt;

    public function __construct(HttpClientInterface $client, private CacheManager $cm, private EntityManagerInterface $em)
    {
        $this->client = $client;
    }

    /**
     * @Route("/traveler/new", name="traveler_new")
     * @Method("POST")
     *
     * @return JsonResponse
     */
    public function newTraveler(Request $request, $response = true)
    {
        // get doctrine manager test
        $em = $this->em;

        $data = $request->getContent();

        $data = json_decode($data, 1, 512, JSON_THROW_ON_ERROR);

        if (!$data['firstname']) {
            return new JsonResponse('firstname is required', Response::HTTP_BAD_REQUEST); // bad request
        }
        if (!$data['lastname']) {
            return new JsonResponse('lastname is required', Response::HTTP_BAD_REQUEST); // bad request
        }
        if (!$data['email']) {
            return new JsonResponse('email is required', Response::HTTP_BAD_REQUEST); // bad request
        }

        if (!$data['terms']) {
            return new JsonResponse('Please agree to the terms of service', Response::HTTP_BAD_REQUEST); // bad request
        }

        $emailAlreadyExists = $em->getRepository(Traveler::class)
            ->findOneByEmail($data['email']);

        if ($emailAlreadyExists) {
            return new JsonResponse('email already submitted', Response::HTTP_BAD_REQUEST); // bad request
        }

        $traveler = new Traveler();

        $traveler->setEmail($data['email']);
        $traveler->setFirstname($data['firstname']);
        $traveler->setLastname($data['lastname']);
        $traveler->setFullname($data['firstname'].' '.$data['lastname']);
        $traveler->setLink($data['linkedIn']);
        $traveler->setIsActive(0);
        $traveler->setIsGuide(0);
        $traveler->setIsContacted(0);
        $traveler->setCreatedAt(new \DateTime());

        if ($data['travelgroup']) {
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
     *
     * @Method("GET")
     *
     * * @return JsonResponse
     */
    // * @Route("/travelers", name="travelers")
    public function getTravelers($jsonResponse = true)
    {
        $travelers = [];

        // get doctrine manager
        $em = $this->em;

        $travelers = $em->getRepository(Traveler::class)
            ->findBy([], ['lastname' => 'ASC']);

        $data = [];

        foreach ($travelers as $traveler) {

            $travelgroups = [];
            foreach ($traveler->getTravelGroups() as $travelgroup) {
                $travelgroups[] = [
                    'id' => $travelgroup->getId(),
                    'groupname' => $travelgroup->getGroupname(),
                    'conferenceLink' => $travelgroup->getConferenceLink(),
                    'launch_at' => $travelgroup->getLaunchAt(),
                    'created_at' => $travelgroup->getCreatedAt(),
                    'isActive' => $travelgroup->getIsActive(),
                ];
            }

            $data[] = [
                'id' => $traveler->getId(),
                'fullname' => $traveler->getFullname(),
                'firstname' => $traveler->getFirstname(),
                'lastname' => $traveler->getLastname(),
                'email' => $traveler->getEmail(),
                'program' => $traveler->getProgram(),
                'link' => $traveler->getLink(),
                'isActive' => $traveler->getIsActive(),
                'isGuide' => $traveler->getIsGuide(),
                'isContacted' => $traveler->getIsContacted(),
                'created' => $traveler->getCreatedAt(),
                'travelgroups' => $travelgroups
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
