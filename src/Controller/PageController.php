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

use Symfony\Component\HttpFoundation\Session\SessionInterface;


use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use App\Manager\CacheManager;


class PageController extends AbstractController
{

    private $em;
    private $cm;
    private $session;

    public function __construct( CacheManager $cacheManager, EntityManagerInterface $entityManager, SessionInterface $session)
    {
        $this->cm = $cacheManager;
        $this->em = $entityManager;
        $this->session = $session;
    }

    /**
     * @param Request
     * @param Config
     * @Route("{slug}", name="page")
     * @return Response
     */
    public function getPage(Request $request, $slug){

        # get doctrine manager
        $em = $this->em;

        $this->session->set('page', $slug);

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

        //resolving a link issue bug with Prismic #todo to a function
        foreach($data['chapter']['content'] as $i => $contentBlocks){
            if(!is_array($contentBlocks)){
                continue;
            }

            foreach($contentBlocks as $j =>  $contentBlock){
                if(!isset($contentBlock['spans'])){
                    continue;
                }
                foreach($contentBlock['spans'] as $k =>  $span) {
                    if(!isset($span['data'])){
                        continue;
                    }

                    $spandata['link_type'] = ucfirst(str_replace("Link.", "", $span['data']['type']));

                    $spandata['target'] = '_blank';//always load links in new window


                    if(isset($span['data']['value']['url'])) {
                        $spandata['url'] = $span['data']['value']['url'];
                    }elseif(isset($span['data']['value']['document']['slug'])){
                        $spandata['slug'] = $span['data']['value']['document']['slug'];
                        $spandata['id'] = $span['data']['value']['document']['slug'];
                        $spandata['isBroken'] = false;
                        $spandata['lang'] = "en-us";
                        $spandata['tags'] = [];
                        $spandata['type'] = 'chapter';

                    }

                    $data['chapter']['content'][$i][$j]['spans'][$k]['data'] = $spandata;

                }
            }

        }


        $output['data'] = [
            'user' => $user,
            'page' => $page->getPrismicId(),
            'slug' => $slug,
            'isSubscriberOnly' => $page->getIsSubscribersOnly(),
            'author' => $page->getAuthor(),
            'labels' => json_decode($page->getLabels(),1),
            'thumbnail' => $page->getThumbnail(),
            'data' => $data['chapter'],
            'title' => $data['chapter']['title']['value'][0]['text'],

        ];


        if($page->getIsSubscribersOnly() && $user['patreon'] != "supporter") {
            $unauthorizedPage = $em->getRepository('App:Page')
                ->findOneBy([
                    'slug' => '401-unauthorized',
                ]);

            $output['data']['data'] = json_decode($unauthorizedPage->getData() , 1)['chapter'];
        }

        $output['title'] = $output['data']['title'];
        $output['image'] = $page->getThumbnail();
        $output['app'] = 'page';


        return $this->render('page.html.twig', $output);
    }


    public function getPages($jsonResponse = true, $cache = false)
    {
        # get cache manager
        $cm = $this->cm;

        $pages = [];

        if($cache){

            $pages = $cm->getCache('pages', 'active');

            $pages = json_decode($pages,1);

            if($jsonResponse){
                return new JsonResponse($pages, 200);
            }

            return($pages);
        }

        # get doctrine manager
        $em = $this->em;


        $pages = $em->getRepository(Page::class)
            ->findAll();


        $data = [];

        foreach($pages as $page){

            $pageData = json_decode($page->getData(),1);

            $hero = "";

            $data[] = [
                'id' => $page->getId(),
                'prismicId' => $page->getPrismicId(),
                'slug' => $page->getSlug(),
                'labels' => json_decode($page->getLabels(),1),
                'author' => $page->getAuthor(),
                'title' => $pageData['chapter']['title']['value'][0]['text'],
                'intro' => $pageData['chapter']['introduction']['value'][0]['text'],
                'thumbnail' => $page->getThumbnail()

            ];
        }

        //reverse the array so latest show first
        //$data = array_reverse($data);

        # reset the keys (so that React can properly load them in)
        $data = array_values($data);

        $cm->writeCache('pages', 'all', json_encode($data));

        if($jsonResponse){
            return new JsonResponse($data, 200);
        }

        return($data);

    }

}