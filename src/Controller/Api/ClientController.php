<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\View\AjaxResponse;
use App\Entity\Client;
use App\Service\ClientService;

/**
 * @Route("/api/client/")
 */
class ClientController extends AbstractController
{

    /**
     * @Route("new", name="new_client_api")
     */
    public function newClientApiAction(Request $request, AjaxResponse $response, ClientService $client_service)
    {

        $em = $this->getDoctrine()->getManager();
        $name = $request->request->get('name');
        $description = $request->request->get('description');
        $priority = $request->request->get('priority');
        $source = $request->request->get('source');
        $group = $request->request->get('group');
        $city = $request->request->get('city');
        $postIndex = $request->request->get('postIndex');
        $address = $request->request->get('address');
        $emails = json_decode($request->request->get('emails'));
        $phones = json_decode($request->request->get('phones'));
        $sites = json_decode($request->request->get('sites'));
        $socials = json_decode($request->request->get('socials'));
        $contact_persons = json_decode($request->request->get('contactPersons'));

        $response->setLogged();

        if (!$name) return $response->setErrors(['name' => 'empty'])->json();

        $new_client = new Client();
        $new_client->setName(trim($name));

        if ($description) $new_client->setDescription(trim($description));
        if ($priority) $new_client->setPriority(trim($priority));
        if ($source) $new_client->setSource(trim($source));
        if ($group) $new_client->setGroupType(trim($group));
        if ($city) $new_client->setCity(trim($city));
        if ($postIndex) $new_client->setPostIndex(trim($postIndex));
        if ($address) $new_client->setAddress(trim($address));

        $client_service->setClient($new_client);
        $client_service->addEmails($emails);
        $client_service->addPhones($phones);
        $client_service->addSites($sites);
        $client_service->addSocials($socials);
        $client_service->addContactPersons($contact_persons);
        $em->persist($new_client);
        $em->flush();

        return $response->setSuccess()->json();

    }

    /**
     * @Route("{id}/remove", name="remove_client_api")
     */
    public function removeClientApiAction(AjaxResponse $response, $id, ClientService $client_service)
    {

        $em = $this->getDoctrine()->getManager();
        $response->setLogged();

        if (!$id) return $response->setMessage('client id not found')->json();

        $client = $em->getRepository(Client::class)->find($id);

        if (!$client) return $response->setMessage('client not found')->json();

        $client_service->removeItems($client->getEmails());
        $client_service->removeItems($client->getPhones());
        $client_service->removeItems($client->getSites());
        $client_service->removeItems($client->getSocials());
        $client_service->removeContactPersons($client->getContactPersons());
        $em->remove($client);
        $em->flush();

        return $response->setSuccess()->json();

    }

    /**
     * @Route("{id}/update", name="update_client_api")
     */
    public function updateClientApiAction(Request $request, $id, AjaxResponse $response, ClientService $client_service)
    {

        $em = $this->getDoctrine()->getManager();
        $response->setLogged();

        if (!$id) return $response->setMessage('client id not found')->json();

        $client = $em->getRepository(Client::class)->find($id);

        if (!$client) return $response->setMessage('client not found')->json();

        $name = $request->request->get('name');
        $description = $request->request->get('description');
        $priority = $request->request->get('priority');
        $source = $request->request->get('source');
        $group = $request->request->get('group');
        $city = $request->request->get('city');
        $postIndex = $request->request->get('postIndex');
        $address = $request->request->get('address');
        $emails = json_decode($request->request->get('emails'));
        $phones = json_decode($request->request->get('phones'));
        $sites = json_decode($request->request->get('sites'));
        $socials = json_decode($request->request->get('socials'));
        $contact_persons = json_decode($request->request->get('contactPersons'));

        if (!$name) return $response->setErrors(['name' => 'empty'])->json();

        $client->setName(trim($name));

        if ($description) $client->setDescription(trim($description));
        if ($priority) $client->setPriority(trim($priority));
        if ($source) $client->setSource(trim($source));
        if ($group) $client->setGroupType(trim($group));
        if ($city) $client->setCity(trim($city));
        if ($postIndex) $client->setPostIndex(trim($postIndex));
        if ($address) $client->setAddress(trim($address));

        $client_service->setClient($client);
        $client_service->updateEmails($emails);
        $client_service->updatePhones($phones);
        $client_service->updateSites($sites);
        $client_service->updateSocials($socials);
        $client_service->updateContactPersons($contact_persons);
        $em->flush();

        return $response->setSuccess()->json();

    }

}