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
        SELECT album.*,i.filename as cover_photo FROM album JOIN image i on album.cover_photo = i.id
        ');
        return $albums;
    }

    public function getAlumsHighlits(): array
    {
        $albums = DbManager::requestMultiple('
        SELECT album.id,album.title,i.filename as cover_photo FROM album JOIN image i on album.cover_photo = i.id
        ');
        return $albums;
    }

    public function getAlbumImages($albumId)
    {
        $albumGroup = DbManager::requestUnit("SELECT album_group_id FROM album WHERE id=?", [$albumId]);
        $images = [];
        if (is_null($albumGroup)) {
            $images[0] = DbManager::requestMultiple("SELECT * FROM image WHERE album_id = ?", [$albumId]);
        } else {
            $albums = DbManager::requestMultiple("SELECT id,title FROM album WHERE album_group_id = ?", [$albumGroup]);
            foreach ($albums as $album) {
                $imagesArray = DbManager::requestMultiple("SELECT * FROM image WHERE album_id = ?", [$album["id"]]);
                $images[$album["title"]] = $imagesArray;
            }
        }
        return $images;
    }

    public function getAllImages()
    {
        $images = DbManager::requestMultiple("SELECT * FROM image");
        return $images;
    }

    public function getImage($imageId)
    {
        $imageInfo = DbManager::requestSingle("SELECT * FROM image WHERE id = ?"[$imageId]);
        return $imageInfo;
    }
}
