<?php

namespace App\Controller\Endpoints;

use App\Entity\MailingItem;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\View\AjaxResponse;

class EditMailingItemController extends AbstractController
{

    /**
     * @Route("/endpoint/mailing-item/{id}/edit", name="mailing-item_edit_endpoint")
     */
    public function mailingItemEditEndpointAction(Request $request, AjaxResponse $response, $id)
    {

        $em = $this->getDoctrine()->getManager();
        $response->setLogged();

        if (!$id) return $response->setMessage('mailing-item id not found')->json();

        $mailing_item = $em->getRepository(MailingItem::class)->find($id);

        if (!$mailing_item) return $response->setMessage('mailing-item not found')->json();

        $response->setData(['mailingItem' => $mailing_item->json()]);

        return $response->setSuccess()->json();

    }

}