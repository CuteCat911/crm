<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Email;

/**
 * @Route("/api/email/")
 */
class EmailController extends AbstractController
{

    /**
     * @Route("{hash}/unsubscribe", name="unsubscribe_email_api")
     */
    public function unsubscribeEmailApiAction($hash)
    {

        $em = $this->getDoctrine()->getManager();
        $email = $em->getRepository(Email::class)->findOneBy(['hash' => $hash]);

        if (!$email) return $this->redirectToRoute('unsubscribe-email', ['error' => true]);

        $email->setSubscribe(false);
        $em->flush();

        return $this->redirectToRoute('unsubscribe-email');

    }

}