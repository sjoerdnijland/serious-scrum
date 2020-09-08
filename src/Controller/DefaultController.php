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
use App\Controller\PageController;

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
    private $pageController;
    private $categoryController;

    public function __construct(EntityManagerInterface $entityManager,
                                ArticleController $articleController,
                                PageController $pageController,
                                CategoryController $categoryController)
    {
        $this->em = $entityManager;
        $this->articleController = $articleController;
        $this->categoryController = $categoryController;
        $this->pageController = $pageController;
    }


    /**
     * @param Request
     * @param Config
     * @Route("/", name="index")
     * @return Response
     */
    public function index(Request $request, $label = false){

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

        $pages = $this->pageController->getPages(false, false);

        $categories = $this->categoryController->getCategories(false, true);

        $contentPages = "hidden";
        $library = " ";

        if($label){
            $contentPages = "";
            $library = "hidden";
        }

        $title = 'Serious Scrum';
        $image = 'serious-scrum.png';

        if($label){
            $title = 'Serious Scrum: '. ucwords(str_replace('-',' ',$label));
            $image = $label.'.jpg';
        }

        # sets everything we want to output to the UX
        $output['data'] = [
            'user' => $user,
            'articles' => $articles,
            'pages' => $pages,
            'label' => $label,
            'contentPages' => $contentPages,
            'library' => $library,
            'categories' => $categories
        ];

        $output['title'] = $title;
        $output['image'] = $image;
        $output['app'] = 'app';

        //return new JsonResponse($output);
        return $this->render('home.html.twig', $output);
    }

    /**
     * @param Request
     * @param Config
     * @Route("/r2m/{label}", name="r2m")
     * @return Response
     */
    public function r2m(Request $request, $label){

        return $this->index( $request, $label);

    }

}

