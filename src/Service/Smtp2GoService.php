<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;

class Smtp2GoService
{

    const API = [
        'search' => '/email/search'
    ];

    private $em;
    private $curl;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->curl = curl_init();
        curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($this->curl, CURLOPT_POST, 1);
        curl_setopt($this->curl, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
    }

    public function getSendedMailsData(?string $time_modilfy)
    {

        $start_date = new \DateTime('now', new \DateTimeZone('UTC'));
        $start_date = $start_date->modify($time_modilfy);
        $start_date = $start_date->format(\DateTime::ATOM);
        $end_date = new \DateTime('now', new \DateTimeZone('UTC'));
        $end_date = $end_date->format(\DateTime::ATOM);
        curl_setopt($this->curl, CURLOPT_URL, $_ENV['SMTP2GO_API_URL'] . self::API['search']);
        curl_setopt($this->curl, CURLOPT_POSTFIELDS, json_encode([
            'api_key' => $_ENV['SMTP2GO_API_KEY'],
            'start_date' => $start_date,
            'end_date' => $end_date
        ]));

        return $result = curl_exec($this->curl);
    }

}