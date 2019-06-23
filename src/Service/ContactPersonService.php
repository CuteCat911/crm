<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\ContactPerson;
use App\Entity\Email;
use App\Entity\Phone;
use App\Entity\Social;

class ContactPersonService
{

    private $em;
    private $contact_person;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function setContactPerson(?ContactPerson $person)
    {
        $this->contact_person = $person;
        return true;
    }

    private function addItems(?array $items, $func)
    {

        if (!count($items)) return false;

        foreach ($items as $item) {
            $func($item);
        }

        return true;

    }

    public function removeItems($items)
    {

        if (!count($items)) return true;

        foreach ($items as $item) {
            $this->em->remove($item);
        }

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
                case 'socials':
                    $this->addSocials($new_items);
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
                    case 'socials':
                        $this->addSocials($add_items);
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

            if (count($remove_items)) $this->removeItems($remove_items);

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

            $new_email->setContactPerson($this->contact_person);
            $this->em->persist($new_email);

            return true;

        });

    }

    public function updateEmails(?array $emails)
    {

        $this->updateItems($emails, $this->contact_person->getEmails()->toArray(), 'emails', function($email, $data) {

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

            $new_phone->setContactPerson($this->contact_person);
            $this->em->persist($new_phone);

            return true;

        });

        return true;

    }

    public function updatePhones(?array $phones)
    {

        $this->updateItems($phones, $this->contact_person->getPhones()->toArray(), 'phones', function($phone, $data) {

            if (!$data->phone) return false;

            $phone->setPhone(trim($data->phone));
            $phone->setOrderIndex($data->orderIndex);

            if ($data->name) $phone->setName(trim($data->name));

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

            $new_social->setContactPerson($this->contact_person);
            $this->em->persist($new_social);

            return true;

        });

        return true;

    }

    public function updateSocials(?array $socials)
    {

        $this->updateItems($socials, $this->contact_person->getSocials()->toArray(), 'socials', function($social, $data) {

            if (!$data->link) return false;

            $social->setLink(trim($data->link));
            $social->setOrderIndex($data->orderIndex);

            if ($data->name) $social->setName(trim($data->name));

            return true;

        });

        return true;

    }

}