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

    }
}