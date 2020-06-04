<?php
// src/Controller/ArticleController.php
namespace App\Controller;

use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpClient\HttpClient;

use App\Manager\CacheManager;


class CategoryController extends AbstractController
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
     * @Route("/categories/reload", name="reload_categories")
     * @Method("GET")
     * * @return JsonResponse
     */
    public function reloadCategories(){
        $categories = $this->reloadCategories(false, true);
        return new JsonResponse($categories, 200);
    }

    /**
     * @param Request $request
     * @Route("/categories", name="categories")
     * @Method("GET")
     * * @return JsonResponse
     */
    public function getCategories($jsonResponse = true, $cache = false)
    {

        # get doctrine manager
        $em = $this->em;
        # get cache manager
        $cm = $this->cm;

        if($cache){
            $categories = $cm->getCache('categories', 'all');

            $categories = json_decode($categories,1);

            if($jsonResponse){
                return new JsonResponse($categories, 200);
            }
            return($categories);
        }

        $categories = $em->getRepository(Category::class)
            ->findAll();

        foreach($categories as $category){
            $parent = $category->getParent();

            if(is_null($parent)){
                $data[$category->getId()] = [
                    'id' => $category->getId(),
                    'name' => $category->getName(),
                    'subCategories' => []
                ];
                continue;
            }

            $data[$parent->getId()]['subCategories'][] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
                'parentId' => $parent->getId()
            ];
        }

        # reset the keys (so that React can properly load them in)
        $data = array_values($data);

        $cm->writeCache('categories', 'all', json_encode($data));

        if($jsonResponse){
            return new JsonResponse($data, 200);
        }

        return($data);

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