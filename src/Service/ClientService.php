<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Client;
use App\Entity\Email;
use App\Entity\Phone;
use App\Entity\Site;
use App\Entity\Social;
use App\Entity\ContactPerson;

class ClientService
{

    private $em;
    private $contact_person_service;
    private $client;

    public function __construct(EntityManagerInterface $em, ContactPersonService $contact_person_service)
    {
        $this->em = $em;
        $this->contact_person_service = $contact_person_service;
    }

    public function setClient(?Client $client)
    {
        $this->client = $client;
        return true;
    }

    private function addItems(?array $items, $func)
    {

        if (!count($items)) return false;
        foreach ($items as $item) $func($item);
        return true;

    }

    public function removeItems($items)
    {

        if (!count($items)) return true;
        foreach ($items as $item) $this->em->remove($item);
        return true;

    }

    private function updateItems(?array $new_items, ?array $old_items, ?string $type, $update_func)
    {

        if (!count($new_items)) return false;

        if (!count($old_items)) {

            switch ($type) {
                case 'emails':
                    $this->addEmails($new_items);
                    break;
                case 'phones':
                    $this->addPhones($new_items);
                    break;
                case 'sites':
                    $this->addSites($new_items);
                    break;
                case 'socials':
                    $this->addSocials($new_items);
                    break;
                case 'contact_persons':
                    $this->addContactPersons($new_items);
                    break;
            }

        } else {

            $add_items = [];
            $update_items = [];
            $remove_items = [];

            foreach ($new_items as $new_item) {

                $add_match = false;
                $update_match = false;

                if (isset($new_item->id)) {
                    $update_match = true;
                } else {
                    $add_match = true;
                }

                if ($add_match) $add_items[] = $new_item;
                if ($update_match) $update_items[] = $new_item;

            }

            foreach ($old_items as $old_item) {

                $remove_match = true;

                foreach ($new_items as $new_item) {
                    if (isset($new_item->id) && $new_item->id == $old_item->getId()) $remove_match = false;
                }

                if ($remove_match) $remove_items[] = $old_item;

            }

            if (count($add_items)) {

                switch ($type) {
                    case 'emails':
                        $this->addEmails($add_items);
                        break;
                    case 'phones':
                        $this->addPhones($add_items);
                        break;
                    case 'sites':
                        $this->addSites($add_items);
                        break;
                    case 'socials':
                        $this->addSocials($add_items);
                        break;
                    case 'contact_persons':
                        $this->addContactPersons($add_items);
                        break;
                }

            }

            if (count($update_items)) {

                foreach ($update_items as $update_item) {
                    foreach ($old_items as $old_item) {
                        if ($update_item->id == $old_item->getId()) {
                            $update_func($old_item, $update_item);
                        };
                    }
                }

            }

            if (count($remove_items)) {

                switch ($type) {
                    case 'contact_persons':
                        $this->removeContactPersons($remove_items);
                        break;
                    default:
                        $this->removeItems($remove_items);
                        break;
                }

            }

        }

        return true;

    }

    public function addEmails(?array $emails)
    {

        $this->addItems($emails, function($item) {

            if (!$item->email) return false;

            $new_email = new Email();
            $new_email->setEmail(trim($item->email));
            $new_email->setOrderIndex($item->orderIndex);

            if ($item->name) $new_email->setName(trim($item->name));

            $new_email->setClient($this->client);
            $this->em->persist($new_email);

            return true;

        });

    }

    public function updateEmails(?array $emails)
    {

        $this->updateItems($emails, $this->client->getEmails()->toArray(), 'emails', function($email, $data) {

            if (!$data->email) return false;

            $email->setEmail(trim($data->email));
            $email->setOrderIndex($data->orderIndex);

            if ($data->name) $email->setName(trim($data->name));

            return true;

        });

        return true;

    }

    public function addPhones(?array $phones)
    {

        $this->addItems($phones, function ($item) {

            if (!$item->phone) return false;

            $new_phone = new Phone();
            $new_phone->setPhone(trim($item->phone));
            $new_phone->setOrderIndex($item->orderIndex);

            if ($item->name) $new_phone->setName(trim($item->name));

            $new_phone->setClient($this->client);
            $this->em->persist($new_phone);

            return true;

        });

        return true;

    }

    public function updatePhones(?array $phones)
    {

        $this->updateItems($phones, $this->client->getPhones()->toArray(), 'phones', function($phone, $data) {

            if (!$data->phone) return false;

            $phone->setPhone(trim($data->phone));
            $phone->setOrderIndex($data->orderIndex);

            if ($data->name) $phone->setName(trim($data->name));

            return true;

        });

        return true;

    }

    public function addSites(?array $sites)
    {

        $this->addItems($sites, function ($item) {

            if (!$item->url) return false;

            $new_site = new Site();
            $new_site->setUrl(trim($item->url));
            $new_site->setOrderIndex($item->orderIndex);

            if ($item->name) $new_site->setName(trim($item->name));

            $new_site->setClient($this->client);
            $this->em->persist($new_site);

            return true;

        });

        return true;

    }

    public function updateSites(?array $sites)
    {

        $this->updateItems($sites, $this->client->getSites()->toArray(), 'sites', function($site, $data) {

            if (!$data->url) return false;

            $site->setUrl(trim($data->url));
            $site->setOrderIndex($data->orderIndex);

            if ($data->name) $site->setName(trim($data->name));

            return true;

        });

        return true;

    }

    public function addSocials(?array $socials)
    {

        $this->addItems($socials, function ($item) {

            if (!$item->link) return false;

            $new_social = new Social();
            $new_social->setLink(trim($item->link));
            $new_social->setOrderIndex($item->orderIndex);

            if ($item->name) $new_social->setName(trim($item->name));

            $new_social->setClient($this->client);
            $this->em->persist($new_social);

            return true;

        });

        return true;

    }

    public function updateSocials(?array $socials)
    {

        $this->updateItems($socials, $this->client->getSocials()->toArray(), 'socials', function($social, $data) {

            if (!$data->link) return false;

            $social->setLink(trim($data->link));
            $social->setOrderIndex($data->orderIndex);

            if ($data->name) $social->setName(trim($data->name));

            return true;

        });

        return true;

    }

    public function addContactPersons(?array $persons)
    {

        $this->addItems($persons, function($item) {

            if (!$item->name && !$item->position) return true;

            $new_person = new ContactPerson();
            $new_person->setOrderIndex($item->orderIndex);
            $emails = json_decode($item->emails);
            $phones = json_decode($item->phones);
            $socials = json_decode($item->socials);

            if ($item->name) $new_person->setName(trim($item->name));
            if ($item->lastName) $new_person->setLastName(trim($item->lastName));
            if ($item->patronymic) $new_person->setPatronymic(trim($item->patronymic));
            if ($item->position) $new_person->setPosition(trim($item->position));
            if ($item->description) $new_person->setDescription(trim($item->description));

            $this->contact_person_service->setContactPerson($new_person);
            $this->contact_person_service->addEmails($emails);
            $this->contact_person_service->addPhones($phones);
            $this->contact_person_service->addSocials($socials);
            $new_person->setClient($this->client);
            $this->em->persist($new_person);

            return true;

        });

        return true;

    }

    public function removeContactPersons($persons)
    {

        if (!count($persons)) return true;

        foreach ($persons as $person) {

            $this->contact_person_service->removeItems($person->getEmails());
            $this->contact_person_service->removeItems($person->getPhones());
            $this->contact_person_service->removeItems($person->getSocials());
            $this->em->remove($person);

        }

        return true;

    }

    public function updateContactPersons(?array $persons)
    {

        $this->updateItems($persons, $this->client->getContactPersons()->toArray(), 'contact_persons', function($person, $data) {

            if (!$data->name && !$data->position) return false;

            $person->setOrderIndex($data->orderIndex);
            $emails = json_decode($data->emails);
            $phones = json_decode($data->phones);
            $socials = json_decode($data->socials);

            if ($data->name) $person->setName(trim($data->name));
            if ($data->lastName) $person->setLastName(trim($data->lastName));
            if ($data->patronymic) $person->setPatronymic(trim($data->patronymic));
            if ($data->position) $person->setPosition(trim($data->position));
            if ($data->description) $person->setDEscription(trim($data->description));

            $this->contact_person_service->setContactPerson($person);
            $this->contact_person_service->updateEmails($emails);
            $this->contact_person_service->updatePhones($phones);
            $this->contact_person_service->updateSocials($socials);

            return true;

        });

        return true;

    }

}