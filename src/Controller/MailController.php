<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MailController extends AbstractController
{

    /**
     * @Route("/preview-mail/{template}", name="preview-mail")
     */
    public function previewMailAction($template)
    {

        $template = 'mailings/' . $template . '/' . $template . '.html.twig';
        return $this->render($template, [
            'preview' => true,
            'mail_id' => 1,
            'theme' => 'Тестовая тема'
        ]);

    }

}