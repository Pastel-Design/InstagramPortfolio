<?php


namespace app\forms;


use app\models\MailManager;
use Exception;
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


        if ($this->form->isSuccess()) {
            $values = $this->form->getValues("array");
            MailManager::sendMail($values["message"],$values["email"],$values["name"]);
            try {
                $onSuccess($values);
            } catch (Exception $exception) {
                //$this->form->addError($exception->getMessage());
            }
        }

        return $this->form;
    }
}