<?php

namespace App\Controller\Endpoints;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\View\AjaxResponse;
use App\Entity\Client;

class ViewClientController extends AbstractController
{

    /**
     * @Route("/endpoint/client/{id}/view", name="client_view_endpoint")
     */
    public function clientViewEndpointAction(AjaxResponse $response, $id)
    {

        $em = $this->getDoctrine()->getManager();
        $response->setLogged();

        if (!$id) return $response->setMessage('client id not found')->json();

        $client = $em->getRepository(Client::class)->find($id);

        if (!$client) return $response->setMessage('client not found')->json();

        $response->setData(['client' => $client->json()]);

        return $response->setSuccess()->json();

    }

}