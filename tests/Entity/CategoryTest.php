<?php
/**
 * Created by PhpStorm.
 * User: nijland
 * Date: 18/05/2020
 * Time: 19:40
 */

namespace App\Tests\Entity;

use PHPUnit\Framework\TestCase;
use App\Entity\Category;
use App\Entity\Article;

class CategoryTest extends TestCase
{
    public function testSettingName(){
        $category = new Category();

        $name = 'Scrum & TDD';

        $category->setName($name);

        $this->assertEquals($name, $category->getName());
    }

    public function testSettingParentAsNull(){
        $category = new Category();

        $category->setParent(null);

        $this->assertNull($category->getParent());
    }

    public function testSettingParent(){
        $category = new Category();

        $category->setParent(1);

        $this->assertEquals(1, $category->getParent());
    }

    public function testItHasNoArticlesByDefault(){
        $category = new Category();

        $this->assertEmpty( $category->getArticles());
    }

    /*
    public function testAddArticle(){
        $category = new Category();

        $category->addArticle(new Article());
        $category->addArticle(new Article());

        $this->assertCount( 2, $category->getArticles());
    }*/

}