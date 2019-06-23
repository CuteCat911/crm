<?php

namespace App\Controller\Endpoints;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\View\AjaxResponse;
use App\Entity\MailingItem;

class MailingsItemsController extends AbstractController
{

    /**
     * @Route("/endpoint/mailings-items", name="mailings-items_endpoint")
     */
    public function mailingsItemsEndpointAction(Request $request, AjaxResponse $response)
    {

        $em = $this->getDoctrine()->getManager();
        $response->setLogged();
        $page = $request->request->get('page');
        $count_on_page = $request->request->get('countOnPage');

        if (!$page || !$count_on_page) {

            $errors = [];

            if (!$page) $errors['page'] = 'empty';
            if (!$count_on_page) $errors['countOnPage'] = 'empty';

            return $response->setErrors($errors)->json();

        }

        $mailings_items = $em->getRepository(MailingItem::class)->getMailingsItemsOnPage(+$page, +$count_on_page);
        $mailings_items_ids = [];
        $mailings_items_json = [];

        foreach ($mailings_items as $mailing_item) {
            $mailings_items_ids[] = ['id' => $mailing_item->getId()];
            $mailings_items_json[] = $mailing_item->json();
        }

        $response->setData([
            'mailingsItems' => $mailings_items_ids,
            'mailingsItemsData' => $mailings_items_json
        ]);

        return $response->setSuccess()->json();

    }

}