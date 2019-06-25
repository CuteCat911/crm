<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class EmailController extends AbstractController
{

    /**
     * @Route("/email/unsubscribe", name="unsubscribe-email")
     */
    public function unsubscribeEmailAction(Request $request)
    {

        $error = $request->get('error');

        return $this->render('pages/unsubscribe.html.twig', [
            'error' => $error
        ]);
    }

}