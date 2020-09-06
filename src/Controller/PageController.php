<?php
// src/Controller/PageController.php
namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;


class PageController extends AbstractController
{

    /**
     * @param Request
     * @param Config
     * @Route("/page/{pageId}", name="page")
     * @return Response
     */
    public function page(Request $request, $pageId){

        $user['username'] = '';
        $user['fullname'] = '';
        $user['avatar'] = '';
        $user['roles'] = ['ROLE_GUEST'];

        if ($this->isGranted('ROLE_USER')) {
            $user['username'] = $this->getUser()->getUsername();
            $user['fullname'] = $this->getUser()->getFullname();
            $user['avatar'] = $this->getUser()->getAvatar();
            $user['roles'] = $this->getUser()->getRoles();
        }

        # sets everything we want to output to the UX
        $output['data'] = [
            'user' => $user,
            'page' => $pageId

        ];

        //return new JsonResponse($output);
        return $this->render('page.html.twig', $output);
    }

}