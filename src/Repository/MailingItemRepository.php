<?php

namespace App\Repository;

use App\Entity\MailingItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method MailingItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method MailingItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method MailingItem[]    findAll()
 * @method MailingItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MailingItemRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, MailingItem::class);
    }

    public function getMailingsItemsOnPage(?int $page, ?int $count)
    {

        $result = $this->createQueryBuilder('m')
            ->orderBy('m.updatedTime', 'DESC')
            ->getQuery()
            ->getResult();

        if ($page == 1) {
            return array_slice($result, $page - 1, $count);
        } else {
            return array_slice($result, $count + ($count * ($page - 2)), $count);
        }

    }

    // /**
    //  * @return MailingItem[] Returns an array of MailingItem objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MailingItem
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
