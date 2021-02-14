<?php
/**
 * Created by PhpStorm.
 * User: nijland
 * Date: 06/09/2020
 * Time: 12:09
 */

namespace App\Manager;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use App\Entity\Article;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use App\Manager\CacheManager;


class RssManager
{

    /**
     * @var ClientInterface
     */
    private $client;

    /**
     * @var EntityManagerInterface
     */
    private $em;

    private $cm;

    public function __construct(HttpClientInterface $client, CacheManager $cacheManager, EntityManagerInterface $entityManager)
    {
        $this->client = $client;
        $this->cm = $cacheManager;
        $this->em = $entityManager;

    }

    public function getRSS($url)
    {

        $em = $this->em;
        $cm = $this->cm;

        $xml = simplexml_load_file($url,null, LIBXML_NOCDATA);

        $loaded = array();

        foreach($xml->channel->item as $item){
            $title = $item->title;
            $url = explode("?source",$item->link)[0];

            $parseIntro = explode("medium-feed-snippet\">", $item->description);
            if(isset($parseIntro[1])){
                $parseIntro = explode("</p>", $parseIntro[1]);
                $intro = $parseIntro[0];
            }else{
                $intro = "";
            }

            $children = $item->children('http://purl.org/dc/elements/1.1/');
            $author = $children->creator;
            $author = $author[0];

            $article = new Article();

            $article->setUrl($url);
            $article->setTitle($title);

            $article->setIntro($intro);
            $article->setAuthor($author);

            $category = $em->getRepository(Category::class)
                ->findOneBy([
                    'id' => 1,
                ]);

            $article->setCategory($category);

            $urlAlreadyExists = $em->getRepository(Article::class)
                ->findArticleByUrl($url);

            if($urlAlreadyExists){
             //   continue;
            }

            $parseImage = explode("src=\"", $item->description);
            if(isset($parseImage[1])){
                $parseImage = explode("\"", $parseImage[1]);
                $thumbnail = $parseImage[0];
                $thumbnail = $cm->storyImageFromUrl('thumbnails', $thumbnail, 'public/');
                $thumbnail = substr($thumbnail, 7);

            }else{
                $thumbnail = "";
            }

            $article->setThumbnail($thumbnail);

            $loaded[] = $title;

            $em->persist($article);

            $em->flush();

            print($title . "\n");

        }

        return $loaded;
    }
}
