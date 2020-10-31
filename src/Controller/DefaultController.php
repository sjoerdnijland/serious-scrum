<?php
// src/Controller/DefaultController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Doctrine\ORM\EntityManagerInterface;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

use Symfony\Component\HttpFoundation\JsonResponse;

use App\Controller\ArticleController;
use App\Controller\CategoryController;
use App\Controller\PageController;
use App\Controller\JiraController;

use Squid\Patreon\Patreon;

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
    private $jiraController;
    private $session;

    public function __construct(EntityManagerInterface $entityManager,
                                ArticleController $articleController,
                                PageController $pageController,
                                CategoryController $categoryController,
                                JiraController $jiraController,
                                SessionInterface $session)
    {
        $this->em = $entityManager;
        $this->articleController = $articleController;
        $this->categoryController = $categoryController;
        $this->pageController = $pageController;
        $this->jiraController = $jiraController;
        $this->session = $session;
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
        $user['patreon'] = false;

        if($this->session->get('patreonToken')){
            $user['patreon'] = 'member';
        }

        if ($this->isGranted('ROLE_USER')) {
            $user['username'] = $this->getUser()->getUsername();
            $user['fullname'] = $this->getUser()->getFullname();
            $user['avatar'] = $this->getUser()->getAvatar();
            $user['roles'] = $this->getUser()->getRoles();
            if($this->getUser()->getIsPatreon()){
                $user['patreon'] = 'supporter';
            }
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
        $image = 'images/serious-scrum.png';

        if($label){
            $title = 'Serious Scrum: '. ucwords(str_replace('-',' ',$label));
            $image = 'images/'.$label.'.jpg';
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
     * @Route("/forecast", name="forecast")
     * @return Response
     */
    public function forecast(Request $request){



        $mode = 'value';
        #$mode = 'complexity';
        #$mode = 'stories';

        #team = 'Triggerhappy';
        $team = 'Beta';

        if($request->query->get('team')){
            $team = $request->query->get('team');
        }

        if($request->query->get('mode')){
            $mode = $request->query->get('mode');
        }

        echo("Team ".$team."<br>");

        echo("forecast op basis van ".$mode."<br>");
        $issues = $this->jiraController->getIssuesFromJira($team);
        $WK = 1;
        $i = 0;
        $avg = 20;
        $totalBV = 0;
        $totalSP = 0;
        $maxBV = 120;
        echo('<br><b>');
        echo($WK.'***********************************');
        echo('</b><br><br>');
        foreach($issues as $issue){
            $i++;
            $totalBV += $issue['bv'];
            $totalSP += $issue['sp'];
            if(($totalBV >= $maxBV && $mode == 'value') || ($i == $avg+1 && $mode == 'stories') || ($totalSP >= $avg*3 && $mode == 'complexity') ){
                $WK++;
                echo('<br>'.($i -1) .'/'.$avg.' - €'.(($totalBV-$issue['bv'])*100).'/€'.($maxBV*100).' - '.($totalSP-$issue['sp']).' SP/'.($avg*3).' SP<br>');
                echo('<br><b>');
                echo($WK.'***********************************');
                echo('</b><br><br>');
                $i=0;
                $totalBV = 0;
                $totalSP = 0;
            }
            echo($issue['key'].': '.$issue['summary'].' - '.$issue['value'].' - '.$issue['size']);
            echo('<br>');
            echo('------------------------------------------------------------------------------------------------');
            echo('<br>');
        }

        echo('<br>'.$i.'/'.$avg.' - €'.($totalBV*100).'/€'.($maxBV*100).' - '.$totalSP.' SP/'.($avg*3).' SP<br>');

        die();

        return $this->render('template.html.twig', $output);

    }

    /**
     * @param Request
     * @param Config
     * @Route("/delivery", name="delivery")
     * @return Response
     */
    public function delivery(Request $request){

        #$team = 'Triggerhappy';
        $team = 'Beta';

        if($request->query->get('team')){
            $team = $request->query->get('team');
        }

        echo('<br>'.$team);

        $totalBV = 0;

        $issues = $this->jiraController->getDoneIssuesFromJira($team);

        $week = 0;

        foreach($issues as $issue) {
            if ($issue['week'] != $week) {
                if($week){
                    echo('<br><br>€ '.$totalBV*100);
                }
                $week = $issue['week'];
                echo('<br><br>week ' . $week . '  ------------------------------------------------------------------------------------------------<br><br>');
                $totalBV= 0;
            }
            echo($issue['key'] . ': ' . $issue['summary'] . ' - ' . $issue['value'] . ' - ' . $issue['size'] . '<br>');
            $totalBV += $issue['bv'];
        }


        die();

        return $this->render('template.html.twig', $output);

    }


    /**
     * @param Request
     * @param Config
     * @Route("/patreon", name="patreon")
     * @return Response
     */
    public function patreon(Request $request){

        $user['username'] = '';
        $user['fullname'] = '';
        $user['avatar'] = '';
        $user['roles'] = ['ROLE_GUEST'];
        $user['patreon'] = false;

        if($this->session->get('patreonToken')){
            $user['patreon'] = 'member';
        }

        if ($this->isGranted('ROLE_USER')) {
            $user['username'] = $this->getUser()->getUsername();
            $user['fullname'] = $this->getUser()->getFullname();
            $user['avatar'] = $this->getUser()->getAvatar();
            $user['roles'] = $this->getUser()->getRoles();
            if($this->getUser()->getIsPatreon()){
                $user['patreon'] = 'supporter';
            }
        }else{
            $this->session->set('patreonLogin', true);
        }


        $output['data'] = [
            'user' => $user,
            'slug' => 'patreon'
        ];


        $output['title'] = 'Our Patreon Program';
        $output['image'] = "";
        $output['app'] = 'patreon';


        return $this->render('patreon.html.twig', $output);

    }


    /**
     * @param Request
     * @param Config
     * @Route("/editorial", name="editorial")
     * @return Response
     */
    public function editorial(Request $request){

        return $this->index( $request, 'editorial');

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

