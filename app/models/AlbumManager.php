<?php

namespace app\models;

/**
 * Manager AlbumManager
 *
 * @package app\models
 */
class AlbumManager
{
    /**
     *
     */
    public function getAlbums(): array
    {
        $albums = DbManager::requestMultiple('
        SELECT * FROM album
        ');
        $newAlbums=array();
        foreach ($albums as $album){
            $coverPhoto = DbManager::requestSingle('SELECT filename FROM image WHERE id = ?',[$album["cover_photo"]]);
            $album["cover_photo"]=$coverPhoto["filename"];
            array_push($newAlbums,$album);
        }
        var_dump($newAlbums);
        return  $newAlbums;
    }
}
