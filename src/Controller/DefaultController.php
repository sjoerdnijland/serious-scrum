<?php
// src/Controller/DefaultController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use GuzzleHttp\Client;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Improvements
 * - add exception handlers
 * - distinct null from 0 SP (story points not set vs set as 0)
 * - decrease cyclomatic complexity of mapping and story point summing
 * - get backlog data
 * - get refinement data
 */

/**
 * Class DefaultController
 * @package App\Controller
 */
class DefaultController extends Controller
{
    /**
     * @param Request
     * @param Config
     * @Route("/", name="index")
     * @return Response
     */
    public function index(Request $request){

        $output['data'] = [1=>1];

        //return new JsonResponse($output);
        return $this->render('app.html.twig', $output);
    }

}

