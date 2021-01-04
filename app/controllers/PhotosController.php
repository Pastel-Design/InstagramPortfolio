<?php


namespace app\controllers;

/**
 * Class PhotosController
 * @package app\controllers
 */
class PhotosController extends Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Sets photos page
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
    }
}