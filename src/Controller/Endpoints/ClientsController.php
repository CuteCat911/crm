<?php

namespace App\Controller\Endpoints;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\View\AjaxResponse;
use App\Entity\Client;

class ClientsController extends AbstractController
{

    /**
     * @Route("/endpoint/clients", name="clients_endpoint")
     */
    public function clientsEndpointAction(Request $request, AjaxResponse $response)
    {

        $em = $this->getDoctrine()->getManager();
        $response->setLogged();
        $page = $request->request->get('page');
        $count_on_page = $request->request->get('countOnPage');
        $search = $request->request->get('search');

        if (!$page || !$count_on_page) {

            $errors = [];

            if (!$page) $errors['page'] = 'empty';
            if (!$count_on_page) $errors['countOnPage'] = 'empty';

            return $response->setErrors($errors)->json();

        }

        $clients_data = $em->getRepository(Client::class)->getClientsOnPage(+$page, +$count_on_page, $search);
        $clients = $clients_data['clients'];
        $clients_ids = [];
        $clients_json = [];

        foreach ($clients as $client) {
            $clients_ids[] = ['id' => $client->getId()];
            $clients_json[] = $client->json();
        }

        $response->setData([
            'clients' => $clients_ids,
            'clientsData' => $clients_json,
            'totalPages' => $clients_data['pages']
        ]);

        return $response->setSuccess()->json();

    }

}