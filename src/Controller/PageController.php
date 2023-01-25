<?php

// src/Controller/PageController.php

namespace App\Controller;

use App\Entity\Page;
use App\Manager\CacheManager;
use App\Manager\PrismicManager;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PageController extends AbstractController
{
    public function __construct(private CacheManager $cm, private EntityManagerInterface $em, private PrismicManager $pm, private CategoryController $categoryController)
    {
    }

    #[Route(path: '/page/{slug}', name: 'page', methods: ["GET"])]
    public function getPage(Request $request, $slug): Response
    {
        $user = [];
        $output = [];
        // get doctrine manager
        $em = $this->em;

        // get cache manager
        $cm = $this->cm;

        $pages = [];

        $request->getSession()->set('page', $slug);

        $user['username'] = '';
        $user['fullname'] = '';
        $user['avatar'] = '';
        $user['roles'] = ['ROLE_GUEST'];

        if ($this->isGranted('ROLE_USER')) {
            $user['username'] = $this->getUser()->getUserIdentifier();
            $user['fullname'] = $this->getUser()->getFullname();
            $user['avatar'] = $this->getUser()->getAvatar();
            $user['roles'] = $this->getUser()->getRoles();
        }

        $page = new Page();

        $page->getLabels();
        $page->getData();

        $page = $em->getRepository(Page::class)
            ->findOneBy([
                'slug' => $slug,
            ]);

        if (!$page) {
            throw $this->createNotFoundException('The page does not exist');
        }

        // sets everything we want to output to the UX

        $data = json_decode($page->getData(), 1, 512, JSON_THROW_ON_ERROR);

        // resolving a link issue bug with Prismic #todo to a function
        foreach ($data['chapter']['content'] as $i => $contentBlocks) {
            if (!is_array($contentBlocks)) {
                continue;
            }

            foreach ($contentBlocks as $j => $contentBlock) {
                if (!isset($contentBlock['spans'])) {
                    continue;
                }
                foreach ($contentBlock['spans'] as $k => $span) {
                    if (!isset($span['data'])) {
                        continue;
                    }

                    $spandata['link_type'] = ucfirst(str_replace('Link.', '', $span['data']['type']));

                    $spandata['target'] = '_blank'; // always load links in new window

                    if (isset($span['data']['value']['url'])) {
                        $spandata['url'] = $span['data']['value']['url'];
                    } elseif (isset($span['data']['value']['document']['slug'])) {
                        $spandata['slug'] = $span['data']['value']['document']['slug'];
                        $spandata['id'] = $span['data']['value']['document']['slug'];
                        $spandata['isBroken'] = false;
                        $spandata['lang'] = 'en-us';
                        $spandata['tags'] = [];
                        $spandata['type'] = 'chapter';
                    }

                    $data['chapter']['content'][$i][$j]['spans'][$k]['data'] = $spandata;
                }
            }
        }

        $pages = $cm->getCache('pages', 'all');
        $pages = json_decode($pages, 1, 512, JSON_THROW_ON_ERROR);

        $labels = json_decode($page->getLabels(), 1, 512, JSON_THROW_ON_ERROR);

        $pageMenu = [];

        foreach ($pages as $pageId => $pagex) {
            foreach ($pagex['labels'] as $label) {
                if ($label != 'road-to-mastery' && in_array($label, $labels)) {
                    $pageMenu[$pagex['id']]['title'] = $pagex['title'];
                    $pageMenu[$pagex['id']]['slug'] = $pagex['slug'];
                }
            }
        }

        $series = '';
        $seriesSlug = '';

        foreach ($labels as $label) {
            if ($label == 'road-to-mastery') {
                continue;
            }
            $series = ucwords(str_replace('-', ' ', $label));
            $seriesSlug = $label;
            break;
        }

        $categories = $this->categoryController->getCategories(false, true);

        $output['data'] = [
            'user' => $user,
            'pageMenu' => $pageMenu,
            'page' => $page->getPrismicId(),
            'slug' => $slug,
            'series' => $series,
            'seriesslug' => $seriesSlug,
            'isSubscriberOnly' => $page->getIsSubscribersOnly(),
            'author' => $page->getAuthor(),
            'labels' => $labels,
            'thumbnail' => $page->getThumbnail(),
            'data' => $data['chapter'],
            'categories' => $categories,
            'title' => $data['chapter']['title']['value'][0]['text'],
        ];

        $output['title'] = $output['data']['title'];
        $output['image'] = $page->getThumbnail();
        $output['author'] = $output['data']['author'];
        $output['description'] = $output['data']['data']['introduction']['value'][0]['text'];
        $output['url'] = 'https://www.seriousscrum.com/page/'.$slug;
        $output['app'] = 'page';

        if (in_array('road-to-mastery', $labels)) {
            return $this->render('r2m_page.html.twig', $output);
        }

        return $this->render('page.html.twig', $output);
    }

    public function getPages($jsonResponse = true, $cache = false)
    {
        // get cache manager
        $cm = $this->cm;

        if ($cache) {
            $pages = $cm->getCache('pages', 'all');

            $pages = json_decode($pages, 1, 512, JSON_THROW_ON_ERROR);

            if ($jsonResponse) {
                return new JsonResponse($pages, Response::HTTP_OK);
            }

            return $pages;
        }

        // get doctrine manager
        $em = $this->em;

        $pages = $em->getRepository(Page::class)
            ->findAll();

        $data = [];

        foreach ($pages as $page) {
            $pageData = json_decode($page->getData(), 1, 512, JSON_THROW_ON_ERROR);

            $hero = '';

            $data[] = [
                'id' => $page->getId(),
                'prismicId' => $page->getPrismicId(),
                'slug' => $page->getSlug(),
                'labels' => json_decode($page->getLabels(), 1, 512, JSON_THROW_ON_ERROR),
                'author' => $page->getAuthor(),
                'title' => $pageData['chapter']['title']['value'][0]['text'],
                'intro' => $pageData['chapter']['introduction']['value'][0]['text'],
                'thumbnail' => $page->getThumbnail(),
            ];
        }

        // reverse the array so latest show first
        // $data = array_reverse($data);

        // reset the keys (so that React can properly load them in)
        $data = array_values($data);

        $cm->writeCache('pages', 'all', json_encode($data, JSON_THROW_ON_ERROR));

        if ($jsonResponse) {
            return new JsonResponse($data, Response::HTTP_OK);
        }

        return $data;
    }
}
