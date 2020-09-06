<?php
// src/Controller/ArticleController.php
namespace App\Controller;

use App\Entity\Article;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpClient\HttpClient;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

use App\Manager\CacheManager;


class ArticleController extends AbstractController
{

    private $em;
    private $cm;

    public function __construct( CacheManager $cacheManager, EntityManagerInterface $entityManager)
    {
        $this->cm = $cacheManager;
        $this->em = $entityManager;
    }

    /**
     * @param Request $request
     * @Route("/article/new", name="article_new")
     * @Method("POST")
     * @return JsonResponse
     */
    public function newArticle(Request $request, $response = true)
    {
        # get doctrine manager
        $em = $this->em;

        # get cache manager
        $cm = $this->cm;


        $data = $request->getContent();
        $data = json_decode($data, 1);

        if(!isset($data['url']) || !isset($data['url'])){
            return new JsonResponse('url not submitted!', 400); #bad request
        }

        if(!filter_var($data['url'], FILTER_VALIDATE_URL)){
            return new JsonResponse('invalid url format! ', 400); #bad request
        }

        $urlAlreadyExists = $em->getRepository(Article::class)
            ->findArticleByUrl($data['url']);

        if($urlAlreadyExists){
            return new JsonResponse('url already submitted', 200); #bad request
        }

        $client = HttpClient::create();

        $response = $client->request('GET', $data['url']);

        if(!$response){
            return new JsonResponse('could not fetch article!', 400); #bad request
        }

        $statusCode = $response->getStatusCode();

        if($statusCode != 200){
            return new JsonResponse('could not fetch article!', 400); #bad request
        }

        $content = $response->getContent();

        $meta = $this->getMetaTags($content); //gets all meta tags, including those without name attribute


        //$meta = get_meta_tags( $data['url']); //gets only the meta tags with name attribute

        $data['author'] = '';
        $data['source'] = $data['url'];
        $ogData = false;

        if(
            isset($meta['og:title']) &&
            isset($meta['og:url']) &&
            isset($meta['og:description'])  &&
            isset($meta['og:image'])
        ){
            $ogData = true;
        }

        if(!$ogData){
            return new JsonResponse('could not fetch required OG data!', 400); #bad request
        }



        $data['title'] = $meta['og:title'];
        $data['url'] = $meta['og:url'];
        $data['intro'] = substr($meta['og:description'], 0, 255);

        if(isset($meta['og:image'])){
            $data['thumbnail'] = $cm->storyImageFromUrl('thumbnails', $meta['og:image']);
        }else{
            $data['thumbnail'] = "";
        }

        if(isset($meta['og:author'])) {
            $data['author'] = $meta['og:author'];
        }elseif(isset($meta['author'])){
            $data['author'] = $meta['author'];
        }elseif(isset($meta['article:author'])){
            $data['author'] = $meta['article:author'];
        }

        if(isset($meta['og:site_name'])){
            $data['source'] = $meta['og:site_name'];
        }

        //get author name from LinkedIn
        if($data['author']  == "" && strpos($content, 'View profile for') !== false){

            $parseAuthor = explode("View profile for", $content);

            if(isset($parseAuthor[1])){
                $parseAuthor2 = explode(">", $parseAuthor[1]);
                $data['author'] = trim(substr($parseAuthor2[0],0, -1));
            }
        }

        //get author name from Scrum.org
        if($data['author']  == "" && strpos($content, 'fa-user') !== false){

            $parseAuthor = explode("fa-user\"></i> ", $content);

            if(isset($parseAuthor[1])){
                $parseAuthor2 = explode("<", $parseAuthor[1]);
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

        if($this->isGranted('ROLE_EDITOR')){
            $article->setIsApproved(true);
            if(isset($data['option'])){
                if($data['option'] == 'isCurated') {
                    $article->setIsCurated(true);
                }
            }
        }

        $em->persist($article);

        $em->flush();

        return new JsonResponse($data);

    }

    /**
     * @param Request $request
     * @Route("/article/review", name="article_review")
     * @Method("POST")
     * @IsGranted("ROLE_EDITOR")
     * @return JsonResponse
     */
    public function reviewArticle(Request $request, $response = true)
    {
        #
        # get doctrine manager
        $em = $this->em;

        $data = $request->getContent();
        $data = json_decode($data, 1);

        if(!isset($data['id']) || !isset($data['category']) || !isset($data['option'])){
            return new JsonResponse('did not receive required formdata!', 400); #bad request
        }

        $article = $em->getRepository(Article::class)
            ->find($data['id']);

        if(!$article){
            return new JsonResponse('could not find article to review!', 400); #bad request
        }

        if($data['option'] == 'isRejected'){
            $em->remove($article);
            $em->flush();
            return new JsonResponse($data);
        }

        $category = $em->getRepository(Category::class)
            ->findOneBy([
                'id' => $data['category'],
            ]);

        $article->setCategory($category);

        if($data['option'] == 'isApproved' || $data['option'] == 'isCurated'){
            $article->setIsApproved(true);
        }

        if($data['option'] == 'isCurated'){
            $article->setIsCurated(true);
        }

        $em->persist($article);

        $em->flush();

        return new JsonResponse($data);

    }

    /**
     * @param Request $request
     * @Route("/articles/reload", name="reload_articles")
     * @Method("GET")
     * * @return JsonResponse
     */
    public function reloadArticles(){
        $articles = $this->getArticles(false, false);
        return new JsonResponse($articles, 200);
    }

    /**
     * @param Request $request
     * @Route("/articles", name="articles")
     * @Method("GET")
     * * @return JsonResponse
     */
    public function getArticles($jsonResponse = true, $cache = false)
    {
        # get cache manager
        $cm = $this->cm;

        $articles = [];

        if($cache){
            if($this->isGranted('ROLE_EDITOR')){
                $articles = $cm->getCache('articles', 'all');
            }else{
                $articles = $cm->getCache('articles', 'active');
            }

            $articles = json_decode($articles,1);

            if($jsonResponse){
                return new JsonResponse($articles, 200);
            }

            return($articles);
        }

        # get doctrine manager
        $em = $this->em;

        //if the service will return all articles for role editor, or if it will return only active articles for guests and general users
        $returnType = 'active';

        if($this->isGranted('ROLE_EDITOR')){
            $articles = $em->getRepository(Article::class)
                ->findAll();
            $returnType = 'all';
        }else{
            $articles = $em->getRepository(Article::class)
                ->findApproved();
        }

        $data = [];

        foreach($articles as $article){
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
                'submittedAt' => $article->getSubmittedAt()
            ];
        }

        //reverse the array so latest show first
        $data = array_reverse($data);

        # reset the keys (so that React can properly load them in)
        $data = array_values($data);

        $cm->writeCache('articles', $returnType, json_encode($data));

        if($jsonResponse){
            return new JsonResponse($data, 200);
        }

        return($data);

    }

    public function reloadActive(){

        # get cache manager
        $cm = $this->cm;

        # get doctrine manager
        $em = $this->em;


        $articles = $em->getRepository(Article::class)
            ->findApproved();


        $data = [];

        foreach($articles as $article){
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
            'submittedAt' => $article->getSubmittedAt()
            ];
        }

        //reverse the array so latest show first
        $data = array_reverse($data);

        # reset the keys (so that React can properly load them in)
        $data = array_values($data);

        $cm->writeCache('articles', 'active', json_encode($data), 'public/');

        return true;
    }

    /**
     * @param Request $request
     * @Route("/articles/images", name="article_images")
     * @Method("POST")
     * @IsGranted("ROLE_ADMIN")
     * @return JsonResponse
     */
    public function replaceImages(Request $request, $jsonResponse = true)
    {

        # get managers
        $em = $this->em;
        $cm = $this->cm;

        $articles = $em->getRepository(Article::class)
            ->findAll();

        foreach($articles as $article){
           $thumbnail = $article->getThumbnail();
            if(substr($thumbnail, 0,4) != "http"){
                continue;
           }

           $thumbnail = $cm->storyImageFromUrl('thumbnails', $thumbnail);
           if(!$thumbnail) {
            continue;
           }

           $article->setThumbnail($thumbnail);
           $em->persist($article);
        }
        $em->flush();

        if($jsonResponse){
            return new JsonResponse(true, 200);
        }

        return(true);


    }

    function getMetaTags($str)
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

        if(preg_match_all($pattern, $str, $out))
            return array_combine($out[1], $out[2]);
        return array();
    }




}