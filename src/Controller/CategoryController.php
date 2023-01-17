<?php

// src/Controller/ArticleController.php

namespace App\Controller;

use App\Entity\Category;
use App\Manager\CacheManager;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends AbstractController
{
    public function __construct(private CacheManager $cm, private EntityManagerInterface $em)
    {
    }

    /**
     * @param Request $request
     *
     * @Route("/categories", name="categories")
     * @Method("GET")
     *
     * * @return JsonResponse
     */
    public function getCategories($jsonResponse = true, $cache = false)
    {
        $data = [];
        // get doctrine manager
        $em = $this->em;
        // get cache manager
        $cm = $this->cm;

        if ($cache) {
            $categories = $cm->getCache('categories', 'all');

            $categories = json_decode($categories, 1, 512, JSON_THROW_ON_ERROR);

            if ($jsonResponse) {
                return new JsonResponse($categories, Response::HTTP_OK);
            }

            return $categories;
        }

        $categories = $em->getRepository(Category::class)
            ->findAll();

        foreach ($categories as $category) {
            $parent = $category->getParent();

            if (is_null($parent)) {
                $data[$category->getId()] = [
                    'id' => $category->getId(),
                    'name' => $category->getName(),
                    'title' => $category->getTitle(),
                    'isSeries' => $category->getIsSeries(),
                    'subCategories' => [],
                ];
                continue;
            }

            $data[$parent->getId()]['subCategories'][] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
                'title' => $category->getTitle(),
                'isSeries' => $category->getIsSeries(),
                'parentId' => $parent->getId(),
            ];
        }

        // reset the keys (so that React can properly load them in)
        $data = array_values($data);

        $cm->writeCache('categories', 'all', json_encode($data, JSON_THROW_ON_ERROR));

        if ($jsonResponse) {
            return new JsonResponse($data, Response::HTTP_OK);
        }

        return $data;
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
}
