<?php
/**
 * Created by PhpStorm.
 * User: nijland
 * Date: 30/05/2020
 * Time: 08:27.
 */

namespace App\Manager;

use Symfony\Component\Filesystem\Filesystem;

class CacheManager
{
    private string $cacheDir = 'cache/';
    private string $imgDir = 'images/storage/';

    public function __construct(private Filesystem $fileSystem)
    {
    }

    public function writeCache($service, $file, $data = null, $defaultDir = '')
    {
        $this->fileSystem;

        if (is_array($data)) {
            $data = json_encode($data, JSON_THROW_ON_ERROR);
        }

        $cacheDir = $defaultDir.$this->cacheDir.$service;

        if (!$this->fileSystem->exists($cacheDir)) {
            $this->fileSystem->mkdir($cacheDir);
        }

        $cacheLocation = $cacheDir.'/'.$file.'.json';

        $this->fileSystem->dumpFile($cacheLocation, $data);

        return true;
    }

    public function getCache($service, $file, $defaultDir = '')
    {
        $output = [];
        $cacheLocation = $defaultDir.$this->cacheDir.$service.'/'.$file.'.json';
        if ($data = @file_get_contents($cacheLocation, true)) {
            return $data;
        }
        $output['error']['message'] = 'failed get data from '.$cacheLocation.' in getCache';
        $output['error']['code'] = '500';

        return $output;
    }

    public function storyImageFromUrl($service, $url, $defaultDir = '', $id = 'thumb')
    {
        $imgDir = $defaultDir.$this->imgDir.$service;

        if (!$this->fileSystem->exists($imgDir)) {
            $this->fileSystem->mkdir($imgDir);
        }

        $file = file_get_contents($url); // to get file

        $fileName = $id.'_'.basename($url); // to get file name

        $fileName = explode('?', $fileName);

        $fileName = $fileName[0];

        $fileName = explode('.', $fileName);

        $ext = '';

        if (isset($fileName[1])) {
            $ext = '.'.$fileName[1];
        }

        $fileName = str_replace(' ', '-', $fileName[0]); // Replaces all spaces with hyphens.

        $fileName = preg_replace('/[^A-Za-z0-9\-]/', '', $fileName); // Removes special chars.

        $fileLocation = $imgDir.'/'.$fileName.$ext;

        if (!$this->fileSystem->exists($fileLocation)) {
            $this->fileSystem->dumpFile($fileLocation, $file);
        }

        return $fileLocation;
    }
}
