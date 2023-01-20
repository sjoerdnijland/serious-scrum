<?php

// src/Controller/ArticleController.php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Category;
use App\Manager\CacheManager;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ArticleController extends AbstractController
{
    /**
     * @var ClientInterface
     */
    private $client;

    public function __construct(HttpClientInterface $client, private CacheManager $cm, private EntityManagerInterface $em)
    {
        $this->client = $client;
    }

    /**
     * @Route("/article/new", name="article_new")
     * @Method("POST")
     *
     * @return JsonResponse
     */
    public function newArticle(Request $request, $response = true)
    {
        // get doctrine manager test
        $em = $this->em;

        // get cache manager
        $cm = $this->cm;

        $data = $request->getContent();
        $data = json_decode($data, 1, 512, JSON_THROW_ON_ERROR);

        if (!isset($data['url']) || !isset($data['url'])) {
            return new JsonResponse('url not submitted!', Response::HTTP_BAD_REQUEST); // bad request
        }

        if (!filter_var($data['url'], FILTER_VALIDATE_URL)) {
            return new JsonResponse('invalid url format! ', Response::HTTP_BAD_REQUEST); // bad request
        }

        $urlAlreadyExists = $em->getRepository(Article::class)
            ->findArticleByUrl($data['url']);

        if ($urlAlreadyExists) {
            return new JsonResponse('url already submitted', Response::HTTP_OK); // bad request
        }

        $client = HttpClient::create();

        $response = $client->request('GET', $data['url']);

        if (!$response) {
            return new JsonResponse('could not fetch article!', Response::HTTP_BAD_REQUEST); // bad request
        }

        $statusCode = $response->getStatusCode();

        if ($statusCode != 200) {
            return new JsonResponse('could not fetch article!', Response::HTTP_BAD_REQUEST); // bad request
        }

        $content = $response->getContent();

        $meta = $this->getMetaTags($content); // gets all meta tags, including those without name attribute

        // $meta = get_meta_tags( $data['url']); //gets only the meta tags with name attribute

        $data['author'] = '';
        $data['source'] = $data['url'];
        $ogData = false;

        if (
            isset($meta['og:title']) &&
            isset($meta['og:url']) &&
            isset($meta['og:description']) &&
            isset($meta['og:image'])
        ) {
            $ogData = true;
        }

        if (!$ogData) {
            return new JsonResponse('could not fetch required OG data!', Response::HTTP_BAD_REQUEST); // bad request
        }

        $data['title'] = $meta['og:title'];
        $data['url'] = $meta['og:url'];
        $data['intro'] = substr($meta['og:description'], 0, 255);

        if (isset($meta['og:image'])) {
            $data['thumbnail'] = $cm->storyImageFromUrl('thumbnails', $meta['og:image']);
        } else {
            $data['thumbnail'] = '';
        }

        if (isset($meta['og:author'])) {
            $data['author'] = $meta['og:author'];
        } elseif (isset($meta['author'])) {
            $data['author'] = $meta['author'];
        } elseif (isset($meta['article:author'])) {
            $data['author'] = $meta['article:author'];
        }

        if (isset($meta['og:site_name'])) {
            $data['source'] = $meta['og:site_name'];
        }

        // get author name from LinkedIn
        if ($data['author'] == '' && str_contains($content, 'View profile for')) {
            $parseAuthor = explode('View profile for', $content);

            if (isset($parseAuthor[1])) {
                $parseAuthor2 = explode('>', $parseAuthor[1]);
                $data['author'] = trim(substr($parseAuthor2[0], 0, -1));
            }
        }

        // get author name from Scrum.org
        if ($data['author'] == '' && str_contains($content, 'fa-user')) {
            $parseAuthor = explode('fa-user"></i> ', $content);

            if (isset($parseAuthor[1])) {
                $parseAuthor2 = explode('<', $parseAuthor[1]);
                $data['author'] = $parseAuthor2[0];
            }
        }

        $article = new Article();

        $article->setUrl($data['url']);
        $article->setTitle($data['title']);
        $article->setThumbnail($data['thumbnail']);
        $article->setIntro($data['intro']);
        $article->setAuthor($data['author']);

        $category = $em->getRepository(Category::class)
            ->findOneBy([
                'id' => $data['category'],
            ]);

        $article->setCategory($category);

        if ($this->isGranted('ROLE_EDITOR')) {
            $article->setIsApproved(true);
            if (isset($data['option'])) {
                if ($data['option'] == 'isCurated') {
                    $article->setIsCurated(true);
                }
            }
        }

        $em->persist($article);

        $em->flush();

        return new JsonResponse($data);
    }

    /**
     * @Route("/article/review", name="article_review")
     * @Method("POST")
     *
     * @return JsonResponse
     */
    #[IsGranted('ROLE_EDITOR')]
    public function reviewArticle(Request $request, $response = true)
    {
        //
        // get doctrine manager
        $em = $this->em;

        $data = $request->getContent();
        $data = json_decode($data, 1, 512, JSON_THROW_ON_ERROR);

        if (!isset($data['id']) || !isset($data['category']) || !isset($data['option'])) {
            return new JsonResponse('did not receive required formdata!', Response::HTTP_BAD_REQUEST); // bad request
        }

        $article = $em->getRepository(Article::class)
            ->find($data['id']);

        if (!$article) {
            return new JsonResponse('could not find article to review!', Response::HTTP_BAD_REQUEST); // bad request
        }

        if ($data['option'] == 'isRejected') {
            $em->remove($article);
            $em->flush();

            return new JsonResponse($data);
        }

        $category = $em->getRepository(Category::class)
            ->findOneBy([
                'id' => $data['category'],
            ]);

        $article->setCategory($category);

        if ($data['option'] == 'isApproved' || $data['option'] == 'isCurated') {
            $article->setIsApproved(true);
        }

        if ($data['option'] == 'isCurated') {
            $article->setIsCurated(true);
        }

        $em->persist($article);

        $em->flush();

        return new JsonResponse($data);
    }

    /**
     * @param Request $request
     *
     * @Route("/articles/reload", name="reload_articles")
     * @Method("GET")
     *
     * * @return JsonResponse
     */
    public function reloadArticles()
    {
        $articles = $this->getArticles(false, false);

        return new JsonResponse($articles, Response::HTTP_OK);
    }

    /**
     * @param Request $request
     *
     * @Route("/articles", name="articles")
     * @Method("GET")
     *
     * * @return JsonResponse
     */
    public function getArticles($jsonResponse = true, $cache = false)
    {
        // get cache manager
        $cm = $this->cm;

        $articles = [];

        if ($cache) {
            if ($this->isGranted('ROLE_EDITOR')) {
                $articles = $cm->getCache('articles', 'all');
            } else {
                $articles = $cm->getCache('articles', 'active');
            }

            $articles = json_decode($articles, 1, 512, JSON_THROW_ON_ERROR);

            if ($jsonResponse) {
                return new JsonResponse($articles, Response::HTTP_OK);
            }

            return $articles;
        }

        // get doctrine manager
        $em = $this->em;

        // if the service will return all articles for role editor, or if it will return only active articles for guests and general users
        $returnType = 'active';

        if ($this->isGranted('ROLE_EDITOR')) {
            $articles = $em->getRepository(Article::class)
                ->findAll();
            $returnType = 'all';
        } else {
            $articles = $em->getRepository(Article::class)
                ->findApproved();
        }

        $data = [];

        foreach ($articles as $article) {
            $src = '';
            $url = $article->getUrl();
            if (str_contains($url, 'www.scrum.org')) {
                $src = 'scrumorg';
            }
            if (str_contains($url, 'seriousscrum.com')) {
                $src = 'seriousscrum';
            }
            if (str_contains($url, 'medium.com')) {
                $src = 'medium';
            }
            if (str_contains($url, 'www.linkedin.com')) {
                $src = 'linkedin';
            }

            $data[] = [
                'id' => $article->getId(),
                'url' => $url,
                'src' => $src,
                'thumbnail' => $article->getThumbnail(),
                'title' => html_entity_decode($article->getTitle()),
                'intro' => html_entity_decode($article->getIntro()),
                'author' => $article->getAuthor(),
                'category' => $article->getCategory()->getId(),
                'isCurated' => $article->getIsCurated(),
                'isApproved' => $article->getIsApproved(),
                'submittedAt' => $article->getSubmittedAt(),
            ];
        }

        // reverse the array so latest show first
        $data = array_reverse($data);

        // reset the keys (so that React can properly load them in)
        $data = array_values($data);

        $cm->writeCache('articles', $returnType, json_encode($data, JSON_THROW_ON_ERROR));

        if ($jsonResponse) {
            return new JsonResponse($data, Response::HTTP_OK);
        }

        return $data;
    }

    public function reloadActive()
    {
        // get cache manager
        $cm = $this->cm;

        // get doctrine manager
        $em = $this->em;

        $articles = $em->getRepository(Article::class)
            ->findApproved();

        $data = [];

        foreach ($articles as $article) {
            $data[] = [
            'id' => $article->getId(),
            'url' => $article->getUrl(),
            'thumbnail' => $article->getThumbnail(),
            'title' => html_entity_decode($article->getTitle()),
            'intro' => html_entity_decode($article->getIntro()),
            'author' => $article->getAuthor(),
            'category' => $article->getCategory()->getId(),
            'isCurated' => $article->getIsCurated(),
            'isApproved' => $article->getIsApproved(),
            'submittedAt' => $article->getSubmittedAt(),
            ];
        }

        // reverse the array so latest show first
        $data = array_reverse($data);

        // reset the keys (so that React can properly load them in)
        $data = array_values($data);

        $cm->writeCache('articles', 'active', json_encode($data, JSON_THROW_ON_ERROR), 'public/');

        return true;
    }

    /**
     * @param Request $request
     *
     * @Route("/articles/images", name="article_images")
     * @Method("POST")
     *
     * @return JsonResponse
     */
    #[IsGranted('ROLE_ADMIN')]
    public function replaceImages($jsonResponse = true)
    {
        // get managers
        $em = $this->em;
        $cm = $this->cm;

        $articles = $em->getRepository(Article::class)
            ->findAll();

        foreach ($articles as $article) {
            $thumbnail = $article->getThumbnail();
            if (substr($thumbnail, 0, 4) != 'http') {
                continue;
            }

            $thumbnail = $cm->storyImageFromUrl('thumbnails', $thumbnail);
            if (!$thumbnail) {
                continue;
            }

            $article->setThumbnail($thumbnail);
            $em->persist($article);
        }
        $em->flush();

        if ($jsonResponse) {
            return new JsonResponse(true, Response::HTTP_OK);
        }

        return true;
    }

    public function getMetaTags($str)
    {
        $pattern = '
                      ~<\s*meta\s
                    
                      # using lookahead to capture type to $1
                        (?=[^>]*?
                        \b(?:name|property|http-equiv)\s*=\s*
                        (?|"\s*([^"]*?)\s*"|\'\s*([^\']*?)\s*\'|
                        ([^"\'>]*?)(?=\s*/?\s*>|\s\w+\s*=))
                      )
                    
                      # capture content to $2
                      [^>]*?\bcontent\s*=\s*
                        (?|"\s*([^"]*?)\s*"|\'\s*([^\']*?)\s*\'|
                        ([^"\'>]*?)(?=\s*/?\s*>|\s\w+\s*=))
                      [^>]*>
                    
                      ~ix';

        if (preg_match_all($pattern, $str, $out)) {
            return array_combine($out[1], $out[2]);
        }

        return [];
    }

    /**
     * @param Request $request
     *
     * @Route("/reloadThumbnails/{startAt}", name="reloadThumbnails")
     * @Method("GET")
     *
     * @return JsonResponse
     */
    public function reloadThumbnails($startAt)
    {
        // get cache manager
        $cm = $this->cm;

        $articles = [];

        // get doctrine manager
        $em = $this->em;

        $articles = $em->getRepository(Article::class)
            ->findAll();
        $returnType = 'all';

        $data = [];

        $i = 0;
        foreach ($articles as $article) {
            ++$i;
            if ($i < $startAt) {
                continue;
            }

            if ($i > ($startAt + 50)) {
                break;
            }

            // $article->getId(),
            $response = $this->client->request('GET', $article->getUrl());

            if(!$response){
                continue;
            }

            try {
                $statusCode = $response->getStatusCode();
            }
            catch (\Exception $e) {
                continue;
            }
            if ($statusCode != 200) {
                continue;
            }

            $content = $response->getContent();

            $meta = $this->getMetaTags($content); // gets all meta tags, including those without name attribute

            if (!isset($meta['og:image'])) {
                continue;
            }

            $thumbnail = $cm->storyImageFromUrl('thumbnails', $meta['og:image']);

            $article->setThumbnail($thumbnail);

            $em->persist($article);

            $em->flush();
        }

        $data = ['done'];

        return new JsonResponse($data);
    }
}
