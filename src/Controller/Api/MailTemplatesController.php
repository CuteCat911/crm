<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\View\AjaxResponse;
use App\Entity\MailTemplate;

/**
 * @Route("/api/mail-templates/")
 */
class MailTemplatesController extends AbstractController
{

    /**
     * @Route("get", name="get_mail-templates_api")
     */
    public function getMailTemplatesApiAction(Request $request, AjaxResponse $response)
    {

        $em = $this->getDoctrine()->getManager();
        $response->setLogged();
        $templates = $em->getRepository(MailTemplate::class)->findAll();
        $templates_data = [];

        foreach ($templates as $template) $templates_data[] = $template->json();

        $response->setData(['templates' => $templates_data]);

        return $response->setSuccess()->json();

    }

}