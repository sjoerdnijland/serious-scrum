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

    public function __construct(HttpClientInterface $client, EntityManagerInterface $entityManager)
    {
        $this->client = $client;
        $this->em = $entityManager;

    }

    public function getRSS($url)
    {

        $em = $this->em;

        $xml = simplexml_load_file($url,null
            , LIBXML_NOCDATA);

        $loaded = array();

        foreach($xml->channel->item as $item){
            $title = $item->title;
            $url = explode("?source",$item->link)[0];

            $parseImage = explode("src=\"", $item->description);
            if(isset($parseImage[1])){
                $parseImage = explode("\"", $parseImage[1]);
                $thumbnail = $parseImage[0];
            }else{
                $thumbnail = "";
            }

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
            $article->setThumbnail($thumbnail);
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
                continue;
            }

            $loaded[] = $title;

            $em->persist($article);

            $em->flush();

        }

        return $loaded;
    }
}
