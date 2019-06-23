<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DefaultController extends AbstractController
{

    /**
     * @Route("/{path}", name="crm", requirements={"path"="^((?!api|endpoint|preview-mail|storage).)*"})
     */
    public function crmAction()
    {
        return $this->render('pages/index.html.twig');
    }

}