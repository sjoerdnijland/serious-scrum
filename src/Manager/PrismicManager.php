<?php
/**
 * Created by PhpStorm.
 * User: nijland
 * Date: 06/09/2020
 * Time: 12:09
 */

namespace App\Manager;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use App\Entity\Page;
use Doctrine\ORM\EntityManagerInterface;

class PrismicManager
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

    public function getPrismicPages()//gets last 20 Prismic Pages
    {

        $em = $this->em;

        $pagination = 1;
        $totalPages = 1;

        while($pagination <= $totalPages) {

            $response = $this->client->request(
                'GET',
                'https://roadtomastery.prismic.io/api/v1/documents/search?ref=X1XYYxAAACUAX6ld&page=' . $pagination . '#format=json'
            );
            $pagination++;

            $statusCode = $response->getStatusCode();
            // $statusCode = 200

            if (!$statusCode) {
                print('no OK 200 response...');
                return (false);
            }

            $jsonContent = $response->getContent();
            $content = json_decode($jsonContent, 1);

            if (!isset($content['results'])) {
                print('no results...');
                return (false);
            }

            $totalPages = $content['total_pages'];

            foreach ($content['results'] as $result) {

                //check if new or existing
                $prismicId = $result['id'];
                $slug = $result['slugs'][0];
                $labels = json_encode($result['tags']);
                $data = json_encode($result['data']);
                $author = "";

                if (isset($result['data']['chapter']['author']['value'][0]['text'])) {
                    $author = $result['data']['chapter']['author']['value'][0]['text'];
                }

                $page = $em->getRepository('App:Page')
                    ->findOneBy([
                        'prismicId' => $prismicId,
                    ]);

                if (!$page) {
                    print('added: ');
                    $page = new Page();
                    $page->setPrismicId($prismicId);
                } else {
                    print('updated: ');
                }
                print($prismicId . "\n");
                $page->setSlug($slug);
                $page->setLabels($labels);
                $page->setData($data);
                $page->setAuthor($author);

                $em->persist($page);

                $em->flush();

            }
        }

        return 1;
    }
}
