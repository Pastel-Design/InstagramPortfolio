<?php


namespace app\controllers;

use app\models\AlbumManager;
/**
 * Class AlbumController
 *
 * @package app\controllers
 */
class AlbumController extends Controller
{
    public AlbumManager $albumManager;
    public function __construct()
    {
        $this->albumManager = new AlbumManager;
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
        $this->head['page_title'] = "";
        $this->head['page_keywords'] = "";
        $this->head['page_description'] = "";
        $this->setView('default');
        var_dump($this->albumManager->getAlumsHighlits());
    }
}