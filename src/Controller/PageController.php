<?php
// src/Controller/PageController.php
namespace App\Controller;


use App\Entity\Page;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


class PageController extends AbstractController
{

    private $em;

    public function __construct( EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }

    /**
     * @param Request
     * @param Config
     * @Route("/page/{slug}", name="page")
     * @return Response
     */
    public function page(Request $request, $slug){

        # get doctrine manager
        $em = $this->em;

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

        $page = new Page();

        $page->getLabels();
        $page->getData();

        $page = $em->getRepository('App:Page')
            ->findOneBy([
                'slug' => $slug,
            ]);

        if(!$page){
            throw $this->createNotFoundException('The page does not exist');
        }

        # sets everything we want to output to the UX

        $data = json_decode($page->getData() , 1);


        $output['data'] = [
            'user' => $user,
            'page' => $page->getPrismicId(),
            'slug' => $slug,
            'author' => $page->getAuthor(),
            'labels' => json_decode($page->getLabels(),1),
            'data' => json_decode(json_encode($data['chapter']),1)
        ];

        //return new JsonResponse($output);
        return $this->render('page.html.twig', $output);
    }

}