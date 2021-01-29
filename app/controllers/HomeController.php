<?php

namespace app\controllers;

/**
 * Controller DefaultController
 *
 * @package app\controllers
 */
class HomeController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Sets default homepage
     *
     * @param array      $params
     * @param array|null $gets
     *
     * @return void
     */
    public function process(array $params, array $gets = null)
    {
        $this->data["landingImage"] = $this->albumManager->getLandingImage();
        $this->head['page_title'] =$this->head['page_title'] . " | Home";
        $this->setView('default');
    }
}
