<?php
/**
 * Created by PhpStorm.
 * User: nijland
 * Date: 30/05/2020
 * Time: 08:27
 */

namespace App\Manager;

use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Filesystem\Filesystem;

class CacheManager
{

    private $fs;
    private $cacheDir = 'cache/';
    private $imgDir = 'images/storage/';

    public function __construct( Filesystem $filesystem)
    {
        $this->fs = $filesystem;
    }

    public function writeCache($service, $file, $data = null){
            $fs = $this->fs;

            if(is_array($data)){
                $data = json_encode($data);
            }

            $cacheDir = $this->cacheDir.$service;

            if (!$fs->exists($cacheDir)) {
                $fs->mkdir($cacheDir);
            }

            $cacheLocation = $cacheDir.'/'.$file.'.json';

            $fs->dumpFile( $cacheLocation, $data );

            return true;

    }

    public function getCache($service, $file){

        $cacheLocation = $this->cacheDir.$service.'/'.$file.'.json';
        if($data = @file_get_contents($cacheLocation, true)){
            return($data);
        }else{
            $output['error']['message'] = 'failed get data from '.$cacheLocation.' in getCache';
            $output['error']['code'] = '500';
            return($output);
        }

    }

    public function storyImageFromUrl($service, $url){

        $fs = $this->fs;

        $imgDir = $this->imgDir.$service;

        if (!$fs->exists($imgDir)) {
            $fs->mkdir($imgDir);
        }

        $file = file_get_contents($url); // to get file
        $fileName = uniqid().'_'.basename($url); // to get file name

        $fileLocation = $imgDir.'/'.$fileName;

        $fs->dumpFile( $fileLocation, $file );

        return $fileLocation;
    }


}