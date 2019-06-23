<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\View\AjaxResponse;
use App\Entity\Mailing;

/**
 * @Route("/api/mailings/")
 */
class MailingsController extends AbstractController
{

    /**
     * @Route("get", name="get_mailings_api")
     */
    public function getMailingsApi(AjaxResponse $response)
    {

        $em = $this->getDoctrine()->getManager();
        $mailings = $em->getRepository(Mailing::class)->findAll();
        $mailings_data = [];

        foreach ($mailings as $mailing) $mailings_data[] = $mailing->json();

        $response->setData(['mailings' => $mailings_data]);

        return $response->setSuccess()->json();

    }

}