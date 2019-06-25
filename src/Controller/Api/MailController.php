<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Mail;

/**
 * @Route("/api/mail/")
 */
class MailController extends AbstractController
{

    /**
     * @Route("{id}/check-open", name="check-open_mail_api")
     */
    public function checkOpenMailApiAction($id)
    {

        $em = $this->getDoctrine()->getManager();
        $mail = $em->getRepository(Mail::class)->find($id);

        if (!$mail) return false;

        $mail->setStatus(3);
        $em->flush();

        return true;

    }

}