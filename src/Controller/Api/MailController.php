<?php

namespace App\Controller\Api;

use App\Entity\Mail;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\View\AjaxResponse;

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

        if (!$id) return false;

        $mail = $em->getRepository(Mail::class)->find($id);

        if (!$mail) return false;

        $mail->setStatus(3);
        $em->flush();

        return true;

    }

}