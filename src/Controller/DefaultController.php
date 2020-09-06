<?php
// src/Controller/DefaultController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Doctrine\ORM\EntityManagerInterface;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\HttpFoundation\JsonResponse;

use App\Controller\ArticleController;
use App\Controller\CategoryController;

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
class DefaultController extends AbstractController
{
    private $articleController;
    private $categoryController;

    public function __construct(EntityManagerInterface $entityManager,
                                ArticleController $articleController,
                                CategoryController $categoryController)
    {
        $this->em = $entityManager;
        $this->articleController = $articleController;
        $this->categoryController = $categoryController;
    }


    /**
     * @param Request
     * @param Config
     * @Route("/", name="index")
     * @return Response
     */
    public function index(Request $request){

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

        $cache = true;
        if ($this->isGranted('ROLE_EDITOR')) {
            $cache = false;
        }

        $articles = $this->articleController->getArticles(false, $cache);

        $categories = $this->categoryController->getCategories(false, true);

        # sets everything we want to output to the UX
        $output['data'] = [
            'user' => $user,
            'articles' => $articles,
            'categories' => $categories
        ];

        //return new JsonResponse($output);
        return $this->render('app.html.twig', $output);
    }

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

