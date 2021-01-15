<?php


namespace app\controllers;

use app\models\AlbumManager;
use app\models\DbManager;
use app\router\Router;

/**
 * Class AlbumController
 *
 * @package app\controllers
 */
class AlbumController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Sets album page
     *
     * @param array $params
     * @param array|null $gets
     */
    function process(array $params, array $gets = null)
    {
        $this->head['page_title'] = $this->head["page_title"] . " | Album";


        if(isset($params[0])){
            if(is_numeric($params[0])){
                $this->processSingleAlbum($params[0]);
            }
        }else{
            $this->processDefault();
        }

    }

    private function processSingleAlbum(int $albumId){
        var_dump($albumId);
        $this->setView('singleAlbum');
        var_dump($this->albumManager->getAlbumImages($albumId));
    }

    private function processDefault(){
        $this->setView('default');
        $this->data["albums"] = $this->albumManager->getAlbums();
    }
}