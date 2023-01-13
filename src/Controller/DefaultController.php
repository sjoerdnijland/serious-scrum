<?php

// src/Controller/DefaultController.php

namespace App\Controller;

use App\Manager\CacheManager;
use App\Manager\PrismicManager;
use App\Manager\RssManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Squid\Patreon\Patreon;
use Symfony\Bundle\SecurityBundle\Security;

/**
 * Class DefaultController.
 */
class DefaultController extends AbstractController
{
    private $articleController;
    private $travelerController;
    private $travelGroupController;
    private $adventureController;
    private $formatController;
    private $testimonialController;
    private $pageController;
    private $categoryController;
    private $jiraController;
    private $prismicManager;
    private $rssManager;
    private $session;
    private $cm;

    public function __construct(EntityManagerInterface $entityManager,
                                ArticleController $articleController,
                                TravelerController $travelerController,
                                TravelgroupController $travelGroupController,
                                AdventureController $adventureController,
                                PageController $pageController,
                                CategoryController $categoryController,
                                FormatController $formatController,
                                TestimonialController $testimonialController,
                                JiraController $jiraController,
                                SessionInterface $session,
                                PrismicManager $prismicManager,
                                RssManager $rssManager,
                                CacheManager $cacheManager)
    {
        $this->em = $entityManager;
        $this->articleController = $articleController;
        $this->travelerController = $travelerController;
        $this->travelGroupController = $travelGroupController;
        $this->adventureController = $adventureController;
        $this->categoryController = $categoryController;
        $this->formatController = $formatController;
        $this->testimonialController = $testimonialController;
        $this->pageController = $pageController;
        $this->jiraController = $jiraController;
        $this->session = $session;
        $this->prismicManager = $prismicManager;
        $this->rssManager = $rssManager;
        $this->cm = $cacheManager;
    }

    /**
     * @Route("/", name="index")
     *
     * @return Response
     */
    public function index($label = null)
    {
        $user['username'] = '';
        $user['fullname'] = '';
        $user['avatar'] = '';
        $user['roles'] = ['ROLE_GUEST'];
        $user['patreon'] = false;

        if ($this->session->get('patreonToken')) {
            $user['patreon'] = 'member';
        }

        if ($this->isGranted('ROLE_USER')) {
            $user['username'] = $this->getUser()->getUsername();
            $user['fullname'] = $this->getUser()->getFullname();
            $user['avatar'] = $this->getUser()->getAvatar();
            $user['roles'] = $this->getUser()->getRoles();
            if ($this->getUser()->getIsPatreon()) {
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

        $contentPages = 'hidden';
        $library = null;

        if ($label) {
            $contentPages = null;
            $library = 'hidden';
        }

        $output = $this->getIndexMetaData($label);

        // sets everything we want to output to the UX
        $output['data'] = [
            'user' => $user,
            'articles' => $articles,
            'pages' => $pages,
            'label' => $label,
            'contentPages' => $contentPages,
            'library' => $library,
            'categories' => $categories,
        ];

        $output['app'] = 'app';

        return $this->render('home.html.twig', $output);
    }

    private function getIndexMetaData($label){
        $meta['title'] = 'Serious Scrum';
        $meta['image'] = 'images/serious-scrum.png';

        if ($label) {
            $meta[ 'title']= 'Serious Scrum: '.ucwords(str_replace('-', ' ', $label));
            $meta['image'] = 'images/'.$label.'.jpg';
        }

        $meta['url'] = 'https://www.seriousscrum.com';
        $meta['author'] = 'Sjoerd Nijland';
        $meta['description'] = 'We are an open global Scrum Community of 5K Scrum Professionals';
        return($meta);
    }

    /**
     * @Route("/patreon", name="patreon")
     *
     * @return Response
     */
    public function patreon()
    {
        $user['username'] = '';
        $user['fullname'] = '';
        $user['avatar'] = '';
        $user['roles'] = ['ROLE_GUEST'];
        $user['patreon'] = false;
        if ($this->session->get('patreonToken')) {
            $user['patreon'] = 'member';
        }
        if ($this->isGranted('ROLE_USER')) {
            $user['username'] = $this->getUser()->getUsername();
            $user['fullname'] = $this->getUser()->getFullname();
            $user['avatar'] = $this->getUser()->getAvatar();
            $user['roles'] = $this->getUser()->getRoles();
            if ($this->getUser()->getIsPatreon()) {
                $user['patreon'] = 'supporter';
            }
        } else {
            $this->session->set('patreonLogin', true);
        }
        $output['data'] = [
            'user' => $user,
            'slug' => 'patreon',
            'description' => 'support Serious Scrum on Patreon',
            'author' => 'Sjoerd Nijland',
            'url' => 'www.seriousscrum.com/patreon',
        ];
        $output['title'] = 'Our Patreon Program';
        $output['image'] = '';
        $output['app'] = 'patreon';

        return $this->render('patreon.html.twig', $output);
    }

    /**
     *
     * @Route("/success", name="successCallback")
     *
     * @return Response
     */
    public function successCallback(Request $request)
    {
        $response = $this->forward('App\Controller\PageController::getPage', [
            'request' => $request,
            'slug' => 'success',
        ]);

        return $response;
    }

    /**
     *
     * @Route("/error", name="errorCallback")
     *
     * @return Response
     */
    public function errorCallback(Request $request)
    {
        $response = $this->forward('App\Controller\PageController::getPage', [
            'request' => $request,
            'slug' => 'error',
        ]);

        return $response;
    }

    /**
     *
     * @Route("/editorial", name="editorial")
     *
     * @return Response
     */
    public function editorial(Request $request)
    {
        return $this->index($request, 'editorial');
    }

    /**
     *
     * @Route("/r2m/reload", name="road-to-mastery-reload")
     *
     * @return Response
     */
    public function masteryReload(Request $request, $label = false, $module = false)
    {
        $user['username'] = '';
        $user['fullname'] = '';
        $user['avatar'] = '';
        $user['roles'] = ['ROLE_GUEST'];
        $user['patreon'] = false;

        if ($this->session->get('patreonToken')) {
            $user['patreon'] = 'member';
        }

        if ($this->isGranted('ROLE_USER')) {
            $user['username'] = $this->getUser()->getUsername();
            $user['fullname'] = $this->getUser()->getFullname();
            $user['avatar'] = $this->getUser()->getAvatar();
            $user['roles'] = $this->getUser()->getRoles();
            if ($this->getUser()->getIsPatreon()) {
                $user['patreon'] = 'supporter';
            }
        }

        // get cache manager
        $cm = $this->cm;

        $pages = $this->pageController->getPages(false, false);

        $categories = $this->categoryController->getCategories(false, true);

        $travelers = $this->travelerController->getTravelers(false);

        $formats = $this->formatController->getFormats(false);

        $testimonials = $this->testimonialController->getTestimonials(false);

        $guides = [];

        foreach ($travelers as $traveler) {
            if ($traveler['isGuide']) {
                unset($traveler['e-mail']);
                $guides[] = $traveler;
            }
        }

        $travelgroups = $this->travelGroupController->getTravelgroups(false);

        foreach ($travelgroups as $i => $travelgroup) {
            unset($travelgroups[$i]['travelers']);
            unset($travelgroups[$i]['conferenceLink']);
        }

        $adventures = $this->adventureController->getAdventures(false);

        foreach ($adventures as $i => $adventure) {
            $adventures[$i]['travelerCount'] = count($adventure['travelers']);
            unset($adventures[$i]['travelers']);
        }

        $contentPages = 'hidden';
        $library = 'hidden';

        if ($label) {
            $contentPages = '';
            $library = 'hidden';
        }

        $title = 'Join the Road to Mastery!';
        $image = 'images/r2mhome.jpg';

        if ($label) {
            $title = 'Serious Scrum: '.ucwords(str_replace('-', ' ', $label));
            $image = 'images/'.$label.'.jpg';
        }

        // sets everything we want to output to the UX
        $data = [
            'pages' => $pages,
            'categories' => $categories,
            'travelers' => [],
            'travelgroups' => $travelgroups,
            'formats' => $formats,
            'testimonials' => $testimonials,
            'adventures' => $adventures,
            'guides' => $guides,
        ];

        $cm->writeCache('r2m', 'all', json_encode($data));

        $data['user'] = $user;
        $data['label'] = $label;
        $data['module'] = $module;
        $data['contentPages'] = $contentPages;
        $data['library'] = $library;

        $output['data'] = $data;
        $output['title'] = $title;
        $output['url'] = 'https://www.road2mastery.com';
        $output['image'] = $image;
        $output['author'] = 'Sjoerd Nijland';
        $output['description'] = 'Join the Road to Mastery!';
        $output['app'] = 'app';

        // return new JsonResponse($output);
        return $this->render('r2m.html.twig', $output);
    }

    /**
     *
     * @Route("/r2m/play", name="road-to-mastery-play")
     * @Route("/r2m/play/{play}", name="road-to-mastery-play-module")
     * @Route("/r2m/play/{play}/{playId}", name="road-to-mastery-play-module-id")
     *
     * @return Response
     */
    public function play(Request $request, $play = false, $playId = false)
    {

        $title = "Let's PLay!";

        $data['play'] = $play;
        $data['playId'] = $playId;

        $output['data'] = $data;
        $output['title'] = $title;
        $output['url'] = 'https://www.seriousscrum.com/r2m/play';
        $output['author'] = 'Sjoerd Nijland';
        $output['app'] = 'app';

        // return new JsonResponse($output);
        return $this->render('r2m_play.html.twig', $output);
    }

    /**
     * @Route("/r2m", name="road-to-mastery")
     * @Route("/r2m/{module}", name="road-to-mastery-module")
     *
     * @return Response
     */
    public function mastery($label = null, $module = null)
    {
        $user['username'] = null;
        $user['fullname'] = null;
        $user['avatar'] = null;
        $user['roles'] = ['ROLE_GUEST'];
        $user['patreon'] = false;

        if ($this->session->get('patreonToken')) {
            $user['patreon'] = 'member';
        }

        if ($this->isGranted('ROLE_USER')) {
            $user['username'] = $this->getUser()->getUsername();
            $user['fullname'] = $this->getUser()->getFullname();
            $user['avatar'] = $this->getUser()->getAvatar();
            $user['roles'] = $this->getUser()->getRoles();
            if ($this->getUser()->getIsPatreon()) {
                $user['patreon'] = 'supporter';
            }
        }

        $data = $this->cm->getCache('r2m', 'all');

        $data = json_decode($data, 1);

        if ($this->isGranted('ROLE_ADMIN')) {
            $travelers = $this->travelerController->getTravelers(false);
            $data['travelers'] = $travelers;
        }

        $contentPages = 'hidden';
        $library = 'hidden';

        if ($label) {
            $contentPages = '';
            $library = 'hidden';
        }

        if ($module) {
            $library = '';
        }

        $title = 'Join the Road to Mastery!';
        $image = 'images/r2mhome.jpg';

        if ($label) {
            $title = 'Serious Scrum: '.ucwords(str_replace('-', ' ', $label));
            $image = 'images/'.$label.'.jpg';
        }

        $data['user'] = $user;
        $data['label'] = $label;
        $data['module'] = $module;
        $data['contentPages'] = $contentPages;
        $data['library'] = $library;

        $output['data'] = $data;
        $output['title'] = $title;
        $output['url'] = 'https://www.road2mastery.com';
        $output['image'] = $image;
        $output['author'] = 'Sjoerd Nijland';
        $output['description'] = 'Join the Road to Mastery!';
        $output['app'] = 'app';

        // return new JsonResponse($output);
        return $this->render('r2m.html.twig', $output);
    }

    /**
     *
     * @Route("/r2m/chapter/{label}", name="r2m")
     *
     * @return Response
     */
    public function r2m(Request $request, $label)
    {
        return $this->mastery($request, $label);
    }

    /**
     *
     * @Route("/prismic/sync", name="prismicSync")
     *
     * @return JsonResponse
     */
    public function prismicSync()
    {
        $this->prismicManager->getPrismicPages('prismicSync');
        $data = ['sync completed'];

        return new JsonResponse($data);
    }

    /**
     *
     * @Route("/rss/sync", name="rss_sync")
     *
     * @return JsonResponse
     */
    public function rssSync()
    {
        $this->rssManager->getRSS('https://medium.com/feed/serious-scrum', 'rssSync');
        $data = ['sync completed'];

        return new JsonResponse($data);
    }
}
