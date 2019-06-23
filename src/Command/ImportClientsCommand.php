<?php

namespace App\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Client;
use App\Service\ClientService;

class ImportClientsCommand extends ContainerAwareCommand
{

    private $em;
    private $clientService;

    public function __construct(EntityManagerInterface $em, ClientService $client_service)
    {
        $this->em = $em;
        $this->clientService = $client_service;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setName('import_clients')
            ->addArgument('file', InputArgument::REQUIRED)
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $file_name = $input->getArgument('file');
        $file = fopen($file_name, 'r');

        while ($line = fgetcsv($file, 0, ',')) {

            $name = $line[0];
            $post_index = $line[1];
            $city = $line[2];
            $address = $line[3];
            $description = $line[4];
            $emails = explode('; ', $line[5]);
            $phones = explode('; ', $line[6]);
            $sites = explode(';', $line[7]);
            $emails_data = [];
            $phones_data = [];
            $sites_data = [];

            foreach ($emails as $key=>$value) {
                if (!$value) continue;
                $data = [
                    'name' => '',
                    'email' => $value,
                    'orderIndex' => $key
                ];
                $emails_data[] = (object)$data;
            }

            foreach ($phones as $key=>$value) {
                if (!$value) continue;
                $data = [
                    'name' => '',
                    'phone' => '+' . $value,
                    'orderIndex' => $key
                ];
                $phones_data[] = (object)$data;
            }

            foreach ($sites as $key=>$value) {
                if (!$value) continue;
                $data = [
                    'name' => '',
                    'url' => $value,
                    'orderIndex' => $key
                ];
                $sites_data[] = (object)$data;
            }

            $new_client = new Client();
            $new_client->setName($name)->setSource('Собранная база')->setGroupType('Производственные компании');

            if ($description) $new_client->setDescription(trim($description));
            if ($city) $new_client->setCity(trim($city));
            if ($post_index) $new_client->setPostIndex(trim($post_index));
            if ($address) $new_client->setAddress(trim($address));

            $this->clientService->setClient($new_client);
            $this->clientService->addEmails($emails_data);
            $this->clientService->addPhones($phones_data);
            $this->clientService->addSites($sites_data);
            $this->em->persist($new_client);

        }

        $this->em->flush();

    }

}