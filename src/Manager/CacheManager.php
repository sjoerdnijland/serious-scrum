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

    public function writeCache($service, $file, $data = null, $defaultDir = ""){
            $fs = $this->fs;

            if(is_array($data)){
                $data = json_encode($data);
            }

            $cacheDir = $defaultDir.$this->cacheDir.$service;

            if (!$fs->exists($cacheDir)) {
                $fs->mkdir($cacheDir);
            }

            $cacheLocation = $cacheDir.'/'.$file.'.json';

            $fs->dumpFile( $cacheLocation, $data );

            return true;

    }

    public function getCache($service, $file, $defaultDir = ""){

        $cacheLocation = $defaultDir.$this->cacheDir.$service.'/'.$file.'.json';
        if($data = @file_get_contents($cacheLocation, true)){
            return($data);
        }else{
            $output['error']['message'] = 'failed get data from '.$cacheLocation.' in getCache';
            $output['error']['code'] = '500';
            return($output);
        }

    }

    public function storyImageFromUrl($service, $url, $defaultDir = "")
    {

        $fs = $this->fs;

        $imgDir = $defaultDir . $this->imgDir . $service;
        echo("-".$imgDir);

        if (!$fs->exists($imgDir)) {
            $fs->mkdir($imgDir);
        }

        $file = file_get_contents($url); // to get file
        $fileName = uniqid() . '_' . basename($url); // to get file name

        $fileName = explode('?', $fileName);

        $fileName = $fileName[0];

        $fileName = explode('.', $fileName);

        $ext = '';

        if (isset($fileName[1])){
            $ext = '.'.$fileName[1];
        }

        $fileName = str_replace(' ', '-', $fileName[0]); // Replaces all spaces with hyphens.

        $fileName =  preg_replace('/[^A-Za-z0-9\-]/', '', $fileName); // Removes special chars.

        $fileLocation = $imgDir.'/'.$fileName.$ext;

        $fs->dumpFile( $fileLocation, $file );

        return $fileLocation;
    }


}