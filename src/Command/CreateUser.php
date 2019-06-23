<?php

namespace App\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;

class CreateUser extends ContainerAwareCommand
{

    private $em;
    private $encoder;

    public function __construct(EntityManagerInterface $em, UserPasswordEncoderInterface $encoder)
    {
        $this->em = $em;
        $this->encoder = $encoder;
        parent::__construct();
    }

    public function configure()
    {
        $this->setName('create_user')
            ->addArgument('login', InputArgument::REQUIRED)
            ->addArgument('password', InputArgument::REQUIRED);
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {

//        $login = $input->getArgument('login');
//        $password = $input->getArgument('password');
//        $new_user = new User();
//        $encoded_password = $this->encoder->encodePassword($new_user, $password);
//        $new_user->setLogin($login)->setPassword($encoded_password)->setName('Михаил')->setLastName('Максимов')->setPatronymic('Юрьевич')->setPosition('Менеджер по продажам');
//        $this->em->persist($new_user);
//        $this->em->flush();

    }

}