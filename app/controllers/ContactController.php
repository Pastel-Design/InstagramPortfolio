<?php


namespace app\controllers;

use app\forms\ContactForm;

/**
 * Class ContactController
 * @package app\controllers
 */
class ContactController extends Controller
{
    private $form;
    public function __construct()
    {
        parent::__construct();
        $this->form = new ContactForm();
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
        $this->data["form"] = $this->form->create(function (){echo "hello world! :)";});
        $this->setView('default');
    }
}