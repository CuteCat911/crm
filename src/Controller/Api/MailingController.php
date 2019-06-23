<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\View\AjaxResponse;
use App\Entity\MailTemplate;
use App\Entity\Mailing;

/**
 * @Route("/api/mailing/")
 */
class MailingController extends AbstractController
{

    /**
     * @Route("new", name="new_mailing_api")
     */
    public function newMailingApiAction(Request $request, AjaxResponse $response)
    {

        $em = $this->getDoctrine()->getManager();
        $name = $request->request->get('name');
        $description = $request->request->get('description');
        $archive = $request->request->get('archive');
        $template_id = $request->request->get('template');
        $response->setLogged();

        if (!$name || !$template_id) {

            $errors = [];

            if (!$name) $errors['name'] = 'empty';
            if (!$template_id) $errors['template'] = 'empty';

            return $response->setErrors($errors)->json();

        }

        $template = $em->getRepository(MailTemplate::class)->find($template_id);

        if (!$template) return $response->setMessage('')->json();

        $new_mailing = new Mailing();
        $new_mailing->setName($name);
        $new_mailing->setTemplate($template);

        if ($description) $new_mailing->setDescription($description);
        if ($archive) $new_mailing->setArchive($archive);

        $em->persist($new_mailing);
        $em->flush();

        return $response->setSuccess()->json();

    }

}