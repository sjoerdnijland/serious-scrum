<?php
/**
 * Created by PhpStorm.
 * User: nijland
 * Date: 06/09/2020
 * Time: 12:09.
 */

namespace App\Manager;

use App\Entity\Page;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class PrismicManager
{
    /**
     * @var ClientInterface
     */
    private $client;

    public function __construct(HttpClientInterface $client, private CacheManager $cm, private EntityManagerInterface $em)
    {
        $this->client = $client;
    }

    public function getPrismicPages($source)// gets last 20 Prismic Pages
    {
        $em = $this->em;
        $cm = $this->cm;

        // get the master refId
        $response = $this->client->request(
            'GET',
            'https://roadtomastery.cdn.prismic.io/api/v2'
        );

        $statusCode = $response->getStatusCode();

        if (!$statusCode) {
            echo 'no OK 200 response...';

            return false;
        }

        $jsonContent = $response->getContent();
        $content = json_decode($jsonContent, 1, 512, JSON_THROW_ON_ERROR);

        $ref = false;

        foreach ($content['refs'] as $ref) {
            $ref = $ref['ref'];
        }

        if (!$ref) {
            echo 'could not get the master ref from prismic...';

            return false;
        }

        $pagination = 1;
        $totalPages = 1;

        while ($pagination <= $totalPages) {
            $response = $this->client->request(
                'GET',
                'https://roadtomastery.prismic.io/api/v1/documents/search?ref='.$ref.'&page='.$pagination.'#format=json'
            );
            ++$pagination;

            $statusCode = $response->getStatusCode();
            // $statusCode = 200

            if (!$statusCode) {
                echo 'no OK 200 response...';

                return false;
            }

            $jsonContent = $response->getContent();
            $content = json_decode($jsonContent, 1, 512, JSON_THROW_ON_ERROR);

            if (!isset($content['results'])) {
                echo 'no results...';

                return false;
            }

            $totalPages = $content['total_pages'];

            foreach ($content['results'] as $result) {
                // check if new or existing
                $prismicId = $result['id'];
                $slug = $result['slugs'][0];
                $labels = json_encode($result['tags'], JSON_THROW_ON_ERROR);
                $data = json_encode($result['data'], JSON_THROW_ON_ERROR);
                $author = '';

                if (isset($result['data']['chapter']['author']['value'][0]['text'])) {
                    $author = $result['data']['chapter']['author']['value'][0]['text'];
                }

                $thumbnail = null;
                if (isset($result['data']['chapter']['hero']['value']['main']['url'])) {
                    $thumbnail = $result['data']['chapter']['hero']['value']['main']['url'];
                    $defaultDir = '';
                    if ($source == 'command') {
                        $defaultDir = 'public/';
                    }

                    $thumbnail = $cm->storyImageFromUrl('prismic', $thumbnail, $defaultDir, $prismicId);
                    if ($source == 'command') {
                        $thumbnail = substr($thumbnail, 7);
                    }
                }

                $page = $em->getRepository(Page::class)

                    ->findOneBy([
                        'prismicId' => $prismicId,
                    ]);

                if (!$page) {
                    echo 'added: ';
                    $page = new Page();
                    $page->setPrismicId($prismicId);
                } else {
                    echo 'updated: ';
                }
                echo $prismicId."\n";
                $page->setSlug($slug);
                $page->setLabels($labels);
                $page->setData($data);
                $page->setAuthor($author);
                $page->setThumbnail($thumbnail);

                $em->persist($page);

                $em->flush();
            }
        }

        return 1;
    }
}
