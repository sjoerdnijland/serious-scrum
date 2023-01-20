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

/**
 * Class DefaultController.
 */
class DefaultController extends AbstractController
{
    public function __construct(EntityManagerInterface $entityManager,
                                private ArticleController $articleController,
                                private TravelerController $travelerController,
                                private TravelgroupController $travelGroupController,
                                private PageController $pageController,
                                private CategoryController $categoryController,
                                private FormatController $formatController,
                                private TestimonialController $testimonialController,
                                private SessionInterface $session,
                                private PrismicManager $prismicManager,
                                private RssManager $rssManager,
                                private CacheManager $cm)
    {
        $this->em = $entityManager;
    }

    /**
     * @return Response
     */
    #[Route(path: '/', name: 'index')]
    public function index($label = null)
    {
        $user = [];
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

    private function getIndexMetaData($label)
    {
        $meta = [];
        $meta['title'] = 'Serious Scrum';
        $meta['image'] = 'images/serious-scrum.png';

        if ($label) {
            $meta['title'] = 'Serious Scrum: '.ucwords(str_replace('-', ' ', $label));
            $meta['image'] = 'images/'.$label.'.jpg';
        }

        $meta['url'] = 'https://www.seriousscrum.com';
        $meta['author'] = 'Sjoerd Nijland';
        $meta['description'] = 'We are an open global Scrum Community of 5K Scrum Professionals';

        return $meta;
    }

    /**
     * @return Response
     */
    #[Route(path: '/success', name: 'successCallback')]
    public function successCallback(Request $request)
    {
        $response = $this->forward('App\Controller\PageController::getPage', [
            'request' => $request,
            'slug' => 'success',
        ]);

        return $response;
    }

    /**
     * @return Response
     */
    #[Route(path: '/error', name: 'errorCallback')]
    public function errorCallback(Request $request)
    {
        $response = $this->forward('App\Controller\PageController::getPage', [
            'request' => $request,
            'slug' => 'error',
        ]);

        return $response;
    }

    /**
     * @return Response
     */
    #[Route(path: '/editorial', name: 'editorial')]
    public function editorial(Request $request)
    {
        return $this->index($request);
    }

    /**
     * @return Response
     */
    #[Route(path: '/r2m/reload', name: 'road-to-mastery-reload')]
    public function masteryReload(Request $request, $label = false, $module = false)
    {
        $user = [];
        $output = [];
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
            'guides' => $guides,
        ];

        $cm->writeCache('r2m', 'all', json_encode($data, JSON_THROW_ON_ERROR));

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
     * @return Response
     */
    #[Route(path: '/r2m/play', name: 'road-to-mastery-play')]
    #[Route(path: '/r2m/play/{play}', name: 'road-to-mastery-play-module')]
    #[Route(path: '/r2m/play/{play}/{playId}', name: 'road-to-mastery-play-module-id')]
    public function play(Request $request, $play = false, $playId = false)
    {
        $data = [];
        $output = [];
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
     * @return Response
     */
    #[Route(path: '/r2m', name: 'road-to-mastery')]
    #[Route(path: '/r2m/{module}', name: 'road-to-mastery-module')]
    public function mastery($label = null, $module = null)
    {
        $user = [];
        $output = [];
        $user['username'] = null;
        $user['fullname'] = null;
        $user['avatar'] = null;
        $user['roles'] = ['ROLE_GUEST'];

        if ($this->isGranted('ROLE_USER')) {
            $user['username'] = $this->getUser()->getUsername();
            $user['fullname'] = $this->getUser()->getFullname();
            $user['avatar'] = $this->getUser()->getAvatar();
            $user['roles'] = $this->getUser()->getRoles();
        }

        $data = $this->cm->getCache('r2m', 'all');

        $data = json_decode($data, 1, 512, JSON_THROW_ON_ERROR);
        

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
     * @return Response
     */
    #[Route(path: '/r2m/chapter/{label}', name: 'r2m')]
    public function r2m($label)
    {
        return $this->mastery($label);
    }

    /**
     * @return JsonResponse
     */
    #[Route(path: '/prismic/sync', name: 'prismicSync')]
    public function prismicSync()
    {
        $this->prismicManager->getPrismicPages('prismicSync');
        $data = ['sync completed'];

        return new JsonResponse($data);
    }

    /**
     * @return JsonResponse
     */
    #[Route(path: '/rss/sync', name: 'rss_sync')]
    public function rssSync()
    {
        $this->rssManager->getRSS('https://medium.com/feed/serious-scrum', 'rssSync');
        $data = ['sync completed'];

        return new JsonResponse($data);
    }
}
