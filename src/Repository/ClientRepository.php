<?php

namespace App\Repository;

use App\Entity\Client;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Client|null find($id, $lockMode = null, $lockVersion = null)
 * @method Client|null findOneBy(array $criteria, array $orderBy = null)
 * @method Client[]    findAll()
 * @method Client[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClientRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Client::class);
    }

    public function getClientsOnPage(?int $page, ?int $count, ?string $search = '')
    {

        $result = $this->createQueryBuilder('c')
            ->orderBy('c.updatedTime', 'DESC')
            ->orWhere('c.name LIKE :search')
            ->orWhere('c.postIndex LIKE :search')
            ->orWhere('c.address LIKE :search')
            ->leftJoin('c.emails', 'emails')
            ->orWhere('emails.email LIKE :search')
            ->leftJoin('c.phones', 'phones')
            ->orWhere('phones.phone LIKE :search')
            ->leftJoin('c.contactPersons', 'persons')
            ->orWhere('persons.name LIKE :search')
            ->orWhere('persons.lastName LIKE :search')
            ->orWhere('persons.patronymic LIKE :search')
            ->orWhere('persons.position LIKE :search')
            ->leftJoin('persons.emails', 'personsEmails')
            ->orWhere('personsEmails.email LIKE :search')
            ->leftJoin('persons.phones', 'personsPhones')
            ->orWhere('personsPhones.phone LIKE :search')
            ->setParameter('search', '%' . $search . '%')
            ->getQuery()
            ->getResult();

        $data = [
            'pages' => ceil(count($result) / $count),
            'clients' => $page == 1 ? array_slice($result, $page - 1, $count) : array_slice($result, $count + ($count * ($page - 2)), $count)
        ];

        return $data;

    }

    public function getClientsEmails(?int $page, ?int $count, ?string $search = '', $filters = false)
    {

        $result = $this->createQueryBuilder('c')
            ->leftJoin('c.emails', 'emails')
            ->orHaving('COUNT(emails) > 0')
            ->leftJoin('c.contactPersons', 'persons')
            ->leftJoin('persons.emails', 'personsEmails')
            ->orHaving('COUNT(personsEmails) > 0')
            ->groupBy('c')
            ->orWhere('c.name LIKE :search')
            ->orWhere('emails.email LIKE :search')
            ->orWhere('persons.name LIKE :search')
            ->orWhere('persons.lastName LIKE :search')
            ->orWhere('persons.patronymic LIKE :search')
            ->orWhere('persons.position LIKE :search')
            ->orWhere('personsEmails.email LIKE :search')
            ->setParameter('search', '%' . $search . '%')
            ->getQuery()
            ->getResult();

        $data = [
            'pages' => ceil(count($result) / $count),
            'clients' => $page == 1 ? array_slice($result, $page - 1, $count) : array_slice($result, $count + ($count * ($page - 2)), $count)
        ];

        return $data;

    }

    // /**
    //  * @return Сlient[] Returns an array of Сlient objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('�')
            ->andWhere('�.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('�.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Сlient
    {
        return $this->createQueryBuilder('�')
            ->andWhere('�.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
