<?php
/**
 * Created by PhpStorm.
 * User: nijland
 * Date: 06/09/2020
 * Time: 12:09.
 */

namespace App\Manager;

use App\Entity\Article;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

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

    public function getRSS($url, $source)
    {
        $em = $this->em;
        $cm = $this->cm;

        $xml = simplexml_load_file($url, null, LIBXML_NOCDATA);

        $loaded = [];

        foreach ($xml->channel->item as $item) {
            $title = $item->title;
            $url = explode('?source', $item->link)[0];

            $parseIntro = explode('medium-feed-snippet">', $item->description);
            if (isset($parseIntro[1])) {
                $parseIntro = explode('</p>', $parseIntro[1]);
                $intro = $parseIntro[0];
            } else {
                $intro = '';
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

            if ($urlAlreadyExists) {
                continue;
            }

            $parseImage = explode('src="', $item->description);

            if (!isset($parseImage[1])) {
                $parseImage = explode('src="', $item->children('content', true));
            }

            if (isset($parseImage[1])) {
                echo 'parsing...';
                $parseImage = explode('"', $parseImage[1]);
                $thumbnail = $parseImage[0];

                $defaultDir = '';
                if ($source == 'command') {
                    $defaultDir = 'public/';
                }

                $thumbnail = $cm->storyImageFromUrl('thumbnails', $thumbnail, $defaultDir);
                if ($source == 'command') {
                    $thumbnail = substr($thumbnail, 7);
                }
            } else {
                echo $item->description;
                $thumbnail = '';
            }

            $article->setThumbnail($thumbnail);

            $loaded[] = $title;

            $em->persist($article);

            $em->flush();

            echo $title."\n";
        }

        return $loaded;
    }
}
