<?php
/**
 * Created by PhpStorm.
 * User: nijland
 * Date: 18/05/2020
 * Time: 19:40
 */

namespace App\Tests\Entity;

use PHPUnit\Framework\TestCase;
use App\Entity\Article;

class ArticleTest extends TestCase
{

    public function testSettingUrl(){
        $article = new Article();

        $url = 'https://medium.com/serious-scrum/technical-debt-8af8a255597';

        $article->setUrl($url);

        $this->assertEquals($url, $article->getUrl());
    }

    public function testSettingThumbnail(){
        $article = new Article();

        $thumbnail = 'https://miro.medium.com/max/500/1*l_hTm3WlDEhgSO1bKk1KEQ.jpeg';

        $article->setThumbnail('https://miro.medium.com/max/500/1*l_hTm3WlDEhgSO1bKk1KEQ.jpeg');

        $this->assertEquals($thumbnail, $article->getThumbnail());
    }

    public function testSettingThubmnailAsNull(){
        $article = new Article();

        $article->setThumbnail(null);

        $this->assertNull($article->getThumbnail());
    }

    public function testSettingTitle(){
        $article = new Article();

        $title = 'Technical Debt';

        $article->setTitle($title);

        $this->assertEquals($title, $article->getTitle());
    }

    public function testSettingIntro(){
        $article = new Article();

        $intro = 'Time to talk about the big evil monster in our Product Development universe. Is it our Cthulhu, Morgoth, Chimera, Frankenstein? Or is it the Grim Reaper that will one day come knocking on the doors of every product made.';

        $article->setIntro($intro);

        $this->assertEquals($intro, $article->getIntro());
    }

    public function testSettingIntroAsEmpty(){
        $article = new Article();

        $article->setIntro('');

        $this->assertEmpty($article->getIntro());
    }

    public function testSettingAuthor(){
        $article = new Article();

        $author = 'Sjoerd Nijland';

        $article->setAuthor($author);

        $this->assertEquals($author, $article->getAuthor());
    }

    public function testSettingAuthorAsNull(){
        $article = new Article();

        $article->setAuthor(null);

        $this->assertNull($article->getAuthor());
    }

    public function testVerifyingDefaultCuratedIsFalse(){
        $article = new Article();

        $this->assertFalse($article->getIsCurated());
    }

    public function testSettingIsCurated(){
        $article = new Article();

        $article->setIsCurated(true);

        $this->assertTrue($article->getIsCurated());
    }

    public function testVerifyingDefaultApprovedIsFalse(){
        $article = new Article();

        $this->assertFalse($article->getIsApproved());
    }

    public function testSettingIsApproved(){
        $article = new Article();

        $article->setIsApproved(true);

        $this->assertTrue($article->getIsApproved());
    }

    public function testSubmittedAtDateIsNow(){
        $article = new Article();

        $submittedAt = new \DateTime('now');

        //check if submitted datetimestamp is now with a 5 second difference allowance
        $this->assertEqualsWithDelta($submittedAt, $article->getSubmittedAt(), 5);
    }
}
