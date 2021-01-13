<?php


namespace app\forms;


use Nette\Forms\Form;
use Nette\Forms\Controls\Checkbox as Checkbox;

class ContactForm extends FormFactory
{
    private Form $form;

    public function __construct()
    {
        $this->form = parent::getForm("contactForm");
    }

    function create(callable $onSuccess): Form
    {
        $this->form->addText("name", "Name")
            ->setRequired();

        $this->form->addText("email", "E-mail")
            ->setRequired();

        $this->form->addTextArea("message", "Message")
            ->setRequired();
        $this->form->addSubmit("submit", "Send");


        //if($this->form->isSubmitted()){ //This if statement is optional
        if ($this->form->isSuccess()) {
            // TODO: implement on success behavior
        }
        //}

        return $this->form;
    }
}