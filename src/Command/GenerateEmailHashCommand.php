<?php

namespace App\Command;

use App\Entity\Email;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;

class GenerateEmailHashCommand extends ContainerAwareCommand
{

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setName('generateEmailsHash');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $emails = $this->em->getRepository(Email::class)->findAll();
        foreach ($emails as $email) $email->setHash();
        $this->em->flush();

    }

}