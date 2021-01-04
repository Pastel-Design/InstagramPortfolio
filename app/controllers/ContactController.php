<?php


namespace app\controllers;

/**
 * Class ContactController
 * @package app\controllers
 */
class ContactController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Sets contact page
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