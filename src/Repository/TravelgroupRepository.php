<?php

namespace App\Repository;

use App\Entity\Travelgroup;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Travelgroup|null find($id, $lockMode = null, $lockVersion = null)
 * @method Travelgroup|null findOneBy(array $criteria, array $orderBy = null)
 * @method Travelgroup[]    findAll()
 * @method Travelgroup[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TravelgroupRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Travelgroup::class);
    }

    public function findActive()
    {
        return $this->createQueryBuilder('t')
            ->where('t.isActive = 1')
            ->getQuery()
            ->getResult();
    }

    public function findOneByGroupname($groupname)
    {
        return $this->createQueryBuilder('t')
            ->where('t.groupname = :groupname')
            ->setParameter('groupname', $groupname)
            ->getQuery()
            ->getOneOrNullResult();
    }

}
